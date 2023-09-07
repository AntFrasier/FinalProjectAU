import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_ADDRESS || "//localhost:33550";


export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type" : "application/json"},
    withCredentials: true,
});