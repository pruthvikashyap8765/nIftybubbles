import axios from "axios";

const api = axios.create({
  baseURL: "https://13.61.33.80", // Replace with your FastAPI server URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
