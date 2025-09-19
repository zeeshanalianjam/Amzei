import axios from "axios";
import { baseURL } from "./summaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export { Axios };