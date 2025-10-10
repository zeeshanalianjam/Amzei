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
    fetchAllDestinations : {
        url: "/api/v1/destinations/get-all-destinations",
        method: "GET"
    },
    fetchAllTours: {
        url: "/api/v1/tours/get-all-tours",
        method: "GET"
    },
    addTourPackage: {
        url: "/api/v1/tour-packages/book",
        method: "POST"
    },

     // Payment endpoints
  createPaymentOrder: {
    url: '/payment/create-order',
    method: 'post'
  },
  
  verifyPayment: {
    url: '/payment/verify',
    method: 'post'
  },
}

export { baseURL, summaryApi };