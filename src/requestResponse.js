import axios from "axios";

const URL = "https://dwisetube.herokuapp.com/";

const sentToken = JSON.parse(localStorage.getItem("token"));

export const publicRequest = axios.create({
  baseURL: URL,
  headers: { token: `bearer ${sentToken}` },
});
