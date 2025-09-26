const viteUrl = import.meta.env.VITE_BACKEND_URL.split(",");
const [localUrl, prodUrl] = viteUrl;

const baseURL =
  import.meta.env.MODE === "development" ? localUrl : prodUrl;


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
    updateUserStatus: (userId) => ({
        url: `/api/v1/users/status/${userId}`,
        method: "PUT"
    }),
    fetchTourBookingByUser: {
        url: "/api/v1/tour-bookings/fetch-tour-booking-by-user",
        method: "GET"
    },
    fetchTourBookingById: {
        url: "/api/v1/tour-bookings/fetch-tour-booking/:bookingId",
        method: "GET"
    },
    updateTourBookingStatus: (bookingId) => ( {
        url: `/api/v1/tour-bookings/update/${bookingId}`,
        method: "PUT"
    }),
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

    // Tours API's
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
    }),

    // Destinations API's
    addDestination: {
        url: "/api/v1/destinations/add",
        method: "POST"
    },
    updateDestination: (id) => ({
        url: `/api/v1/destinations/update/${id}`,
        method: "PUT"
      }),
    deleteDestination: (id) => ({
        url: `/api/v1/destinations/delete/${id}`,
        method: "DELETE"
    }),

    // Events API's
    addEvent: {
        url: "/api/v1/events/add",
        method: "POST"
    },
    updateEvent: (id) => ({
        url: `/api/v1/events/update/${id}`,
        method: "PUT"
      }),
    deleteEvent: (id) => ({
        url: `/api/v1/events/delete/${id}`,
        method: "DELETE"
    }),
}

export { baseURL, summaryApi };