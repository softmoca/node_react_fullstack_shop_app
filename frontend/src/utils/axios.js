import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? "배포시 url" : "http://localhost:4000", // 서버 포트
});

export default axiosInstance;
