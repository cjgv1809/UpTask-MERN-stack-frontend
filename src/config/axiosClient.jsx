import axios from "axios";

const axiosClient = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: `${process.env.BACKEND_URL}/api`,
});

export default axiosClient;
