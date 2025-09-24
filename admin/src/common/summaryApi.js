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
    },
    // admin route for fetching all data 
    fetchAllUsers: {
        url: "/api/v1/users/fetch-all-users",
        method: "GET"
    },
    fetchAllTours: {
        url: "/api/v1/tours/get-all-tours",
        method: "GET"
    },
    fetchAllDestinations: {
        url: "/api/v1/destinations/get-all-destinations",
        method: "GET"
    },
    fetchAllEvents: {
        url: "/api/v1/events/get-all-events",
        method: "GET"
    },
    fetchAllTourBookings: {
        url: "/api/v1/tour-bookings/fetch-all-tour-bookings",
        method: "GET"
    },
    addTour: {
        url: "/api/v1/tours/add",
        method: "POST"
    },
     updateTour: (id) => ({
    url: `/api/v1/tours/update/${id}`,
    method: "PUT"
  }),
    deleteTour: (id) => ( {
        url: `/api/v1/tours/delete/${id}`,
        method: "DELETE"
    })
}

export { baseURL, summaryApi };