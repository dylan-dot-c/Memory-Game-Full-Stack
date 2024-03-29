// obselete file
import axios from "axios";
// Check the location of the hoster server
// if it is localhost user the development endpoint
// else use the production endpoint

// this makes sure our api URL is safe
// and we can seemlessly swap api endpoints for dev and prod

const baseURL = window.location.origin;

// notice that im still hardcoding the localhost
// not suitable when that change or the current port is used
const api = axios.create({
    baseURL:
        baseURL === "http://localhost:5173"
            ? import.meta.env.VITE_API_ENDPOINT_DEV
            : import.meta.env.VITE_API_ENDPOINT_PROD,
});

export default api;
