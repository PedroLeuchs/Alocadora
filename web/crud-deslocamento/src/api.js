import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:1111/api/v1/",
});
