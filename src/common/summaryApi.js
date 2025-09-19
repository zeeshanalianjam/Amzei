const baseURL = "http://localhost:8080";


const summaryApi = {
    register: {
        url: "/api/v1/users/register",
        method: "POST"
    },
    login: {
        url: "/api/v1/users/login",
        method: "POST"
    },
}

export { baseURL, summaryApi };