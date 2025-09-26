const viteUrl = import.meta.env.VITE_BACKEND_URL.split(",");
const [localUrl, prodUrl] = viteUrl;

const baseURL =
  import.meta.env.MODE === "development" ? localUrl : prodUrl;


const summaryApi = {
    register: {
        url: "/api/v1/users/register",
        method: "POST"
    },
    login: {
        url: "/api/v1/users/login",
        method: "POST"
    },
    refreshToken: {
        url: "/api/v1/users/refresh",
        method: "POST"
    },
    logout: {
        url: "/api/v1/users/logout",
        method: "POST"
    },
    bookATour: {
        url: "/api/v1/tour-bookings/book",
        method: "POST"
    },
    fetchAllTourBookings: {
        url: "/api/v1/tour-bookings/fetch-all-tour-bookings",
        method: "GET"
    },
    fetchTourBookingByUser: {
        url: "/api/v1/tour-bookings/fetch-tour-booking-by-user",
        method: "GET"
    },
    fetchTourBookingById: {
        url: "/api/v1/tour-bookings/fetch-tour-booking/:bookingId",
        method: "GET"
    },
    updateTourBookingStatus: {
        url: "/api/v1/tour-bookings/update/:bookingId",
        method: "PUT"
    }
}

export { baseURL, summaryApi };