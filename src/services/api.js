import axios from "axios";

const api = axios.create({
  baseURL: "https://json-server-doit.herokuapp.com",
});

export default api;
