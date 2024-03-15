import axios from "axios";

const API_KEY = "zptrX55x2qZApiVKm68RNNqVMOk5s6W9N19uFgah3zI";
axios.defaults.baseURL = "https://api.unsplash.com/";

export const ApiService = async (query, page) => {
  const { data } = await axios.get("/search/photos/", {
    params: {
      client_id: API_KEY,
      query: query,
      per_page: 10,
      page: page,
    },
  });

  return data;
};

export default ApiService;
