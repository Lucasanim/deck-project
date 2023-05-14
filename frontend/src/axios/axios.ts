import axios from "axios";

const AxiosInstance = (subPath: string = "") =>
  axios.create({
    baseURL: import.meta.env.VITE_GATEWAY_BASE_URL + subPath,
    timeout: 1000,
  });

export default AxiosInstance;
