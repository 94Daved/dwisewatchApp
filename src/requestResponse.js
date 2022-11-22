import axios from "axios";

const URL = "http://localhost:8800/api/";

const sentToken = JSON.parse(localStorage.getItem("token"));

export const publicRequest = axios.create({
  baseURL: URL,
  headers: { token: `bearer ${sentToken}` },
});
