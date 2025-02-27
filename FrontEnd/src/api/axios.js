import axios from "axios";

const api = axios.create({
  baseURL: "http://16.170.223.23", // Replace with your FastAPI server URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
