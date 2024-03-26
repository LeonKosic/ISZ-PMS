import axios from "axios";

const defaultConfig = {
  baseURL: `http://${import.meta.env.VITE_API_HOST}`
}

const api = {
  get: (url) => {
    return axios.get(url, defaultConfig);
  },
  post: (url, data) => {

  },
  put: (url, data) => {

  }
}

export default api;