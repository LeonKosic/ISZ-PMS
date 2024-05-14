import axios from "axios";
import { createStore } from "solid-js/store";

const defaultConfig = {
  baseURL: `http://${import.meta.env.VITE_API_HOST}`,
  headers: {}
}

const store = createStore();

const api = {
  get: (url) => {
    return axios.get(url, defaultConfig);
  },
  post: (url, data, header) => {

  },
  put: (url, data, header) => {

  },
  // payload => {username. login}
  login: (payload) => {
    // save jwt
  }

}

export default api;