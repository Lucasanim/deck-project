import axios from "axios";

const AxiosInstance = (subPath: string = "") => {
  const instance = axios.create({
    baseURL: process.env.GATEWAY_BASE_URL + subPath,
    timeout: 1000,
  });

  return instance;
};

export default AxiosInstance;
