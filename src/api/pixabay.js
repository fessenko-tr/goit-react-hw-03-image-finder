import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pixabay.com/api/?",
  params: {
    key: "24928130-93382ca5244436f2e49b16d9e",
    per_page: 12,
    image_type: "photo",
  },
});

const fetchPics = async (q, page) => {
  const { data } = await axiosInstance.request({
    params: { q, page },
  });
  const hits = data.hits;

  if (!hits.length) {
    throw new Error("No Pictures Found");
  }

  return hits;
};

export default fetchPics;
