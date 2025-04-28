import { BASE_URL } from "./BaseURL";
import axios from "axios";
export const apiRequest = async (url, method = "POST", data = {}, isFormData) => {
  try {
    const config = {
      method,
      url,
      headers: {},
    };
console.log(config, "isFormData")
    if (isFormData) {
      config.data = data;
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.data = data;
    }

    const response = await api(config);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("API Error:", error);

    return {
      success: false,
      data: error.response?.data || { message: "Something went wrong" },
    };
  }
};

const api = axios.create({
    baseURL: BASE_URL, 
  });
  
  // Request interceptor for adding token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Response interceptor for handling 401 errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        if (window.location.pathname !== "/login") {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      }
      return Promise.reject(error);
    }
  );