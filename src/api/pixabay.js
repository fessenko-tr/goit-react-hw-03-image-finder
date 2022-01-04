import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pixabay.com/api/?",
  params: {
    key: "24928130-93382ca5244436f2e49b16d9e",
    per_page: 12,
    image_type: "photo",
  },
});

export default axiosInstance;
