import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
//const token = localStorage.getItem("token");

// Create an Axios instance with custom configuration
export const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    //Authorization: `Bearer ${token}`, // Add the token to the Authorization header
  },
  withCredentials: true, // Include credentials (cookies) in requests
});

export const NIS = "\u20AA";
