import axios from "axios";

const api = axios.create({
  baseURL: "https://kenzieshop2.herokuapp.com",
});

export default api;
