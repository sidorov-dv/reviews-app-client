import axios from "axios";

const instance = axios.create({
  baseURL: REACT_APP_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
