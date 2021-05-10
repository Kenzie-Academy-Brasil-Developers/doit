import axios from "axios";

const api = axios.create({
  baseURL: "https://api-nodejs-todolist.herokuapp.com",
});

export default api;
