import axios from "axios";

const api = axios.create({
  baseURL: "https://shapes-cooperative-nervous-medicare.trycloudflare.com", // Replace with your FastAPI server URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
