import axios from "axios";

const URL = "https://dwisewatch.adaptable.app/api";
//const URL = "http://localhost:8800/api/";

const sentToken = JSON.parse(localStorage.getItem("token") && true);

export const publicRequest = axios.create({
  baseURL: URL,
  headers: { token: `bearer ${sentToken}` },
});
