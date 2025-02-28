import axios from "axios";

const api = axios.create({
  baseURL: "http://13.60.248.99", // Replace with your FastAPI server URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
