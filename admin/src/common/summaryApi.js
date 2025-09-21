const baseURL = "http://localhost:8080";


const summaryApi = {
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