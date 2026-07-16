import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

// withCredentials sends the httpOnly session cookie automatically on admin routes.
export const api = axios.create({
  baseURL: API,
 // withCredentials: true,
});
