import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const useAuthCheck = (token, onExpire) => {
  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // seconds

      if (decoded.exp < currentTime) {
        // Token expired
        onExpire();
      } else {
        // Set a timer until expiry
        const timeout = (decoded.exp - currentTime) * 1000;
        const timer = setTimeout(onExpire, timeout);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error("Invalid token", error);
      onExpire();
    }
  }, [token, onExpire]);
};

export default useAuthCheck;
