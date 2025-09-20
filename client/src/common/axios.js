// src/api/axiosInstance.js
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // npm i jwt-decode
import { baseURL } from "./summaryApi";

/**
 * plainAxios - used only for refresh token calls so we don't re-enter interceptors.
 * Axios - main instance used across the app (has interceptors).
 */

const plainAxios = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true, // if server uses cookies for refresh
  headers: {
    "Content-Type": "application/json",
  },
});

const Axios = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------------------------
   Token helpers (adapt if you store tokens differently)
   --------------------------- */
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken"); // only if you're storing it client-side
const setAccessToken = (token) => localStorage.setItem("accessToken", token);
const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

/* ---------------------------
   Refresh control variables
   - isRefreshing: prevents multiple concurrent refresh requests
   - refreshPromise: the single promise all waiting requests can await
   --------------------------- */
let isRefreshing = false;
let refreshPromise = null;

/* ---------------------------
   doRefreshToken()
   - Central function that requests a new access token using the refresh token.
   - Returns a promise that resolves to the new access token.
   - IMPORTANT: use plainAxios to avoid request/response interceptor recursion.
   - Adapt endpoint '/auth/refresh' to your backend API.
   --------------------------- */
async function doRefreshToken() {
  if (isRefreshing) return refreshPromise; // return existing promise to queue callers

  isRefreshing = true;
  // If your backend expects refresh token in body:
  // refreshPromise = plainAxios.post('/auth/refresh', { refreshToken: getRefreshToken() }, { withCredentials: true })
  // If your backend stores refreshToken in httpOnly cookie (recommended), call without body:
  refreshPromise = plainAxios
    .post("/api/v1/users/refresh", {
      // If your server expects no body and reads cookie, send null instead:
      // (plainAxios.post('/auth/refresh', null, { withCredentials: true }))
      refreshToken: getRefreshToken(),
    })
    .then((res) => {
      const newAccessToken = res.data?.accessToken;
      if (!newAccessToken) throw new Error("No access token in refresh response");
      setAccessToken(newAccessToken);
      return newAccessToken;
    })
    .catch((err) => {
      // refresh failed -> clear tokens and force logout
      clearTokens();
      // Optional: navigate to login page
      // window.location.href = '/login';
      throw err;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
}

/* ---------------------------
   Request interceptor
   - Attach Authorization header
   - Proactively refresh if access token is about to expire (threshold)
   --------------------------- */
Axios.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();
    if (!token) return config;

    try {
      // Proactive check: if token is expiring in the next THRESHOLD ms, refresh it
      const decoded = jwtDecode(token); // { exp: <seconds since epoch>, ... }
      const exp = decoded.exp * 1000; // convert to ms
      const now = Date.now();
      const THRESHOLD = 60 * 1000; // 1 minute: refresh if token expires within next 60s

      if (exp - now < THRESHOLD) {
        // token near expiry -> refresh before sending the request
        try {
          token = await doRefreshToken();
        } catch (err) {
          // refresh failed - allow request to continue without token (or you may throw)
          return config;
        }
      }
    } catch (e) {
      // If token is malformed / can't decode -> try refresh as a fallback
      try {
        token = await doRefreshToken();
      } catch (err) {
        return config;
      }
    }

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------------------
   Response interceptor
   - If server returns 401, attempt a refresh and retry original request once.
   - Use originalRequest._retry flag to avoid infinite loops.
   --------------------------- */
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If no response or it's not a 401, just reject
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Prevent infinite retry loops
    if (originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await doRefreshToken(); // will queue if another refresh is happening
        // attach new token and retry
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return Axios(originalRequest);
      } catch (refreshError) {
        // refresh failed -> tokens cleared in doRefreshToken()
        // Optional: redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Already retried once - just reject
    return Promise.reject(error);
  }
);

export { Axios };
