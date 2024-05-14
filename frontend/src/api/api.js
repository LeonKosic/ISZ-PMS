import axios from "axios";

const defaultConfig = {
  baseURL: `http://${import.meta.env.VITE_API_HOST}`
}

const api = {
  get: (url) => {
    return axios.get(url, defaultConfig);
  },
  post: (url, data) => {
    return axios.post(url, data, defaultConfig)
  },
  put: (url, data) => {

  }
}

export default api;