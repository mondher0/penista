import axios from "axios";

const axiosInstance = axios.create();
const TOKEN_KEY = "token";

axiosInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
    console.log(token);
    console.log(request.headers);
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return request;
});
export default axiosInstance;
