import axios from "axios";
import { setUserDetails } from "./stores";
import { Alert } from "@suid/material";
import { logoutAlert } from "../components/navbar/LogoutAlert";

const defaultConfig = {
  baseURL: `http://${import.meta.env.VITE_API_HOST}`,
}

const api = {
  get: async (url) => {
    const token = localStorage.getItem('accessToken');

    return await axios.get(url,
      {
        ...defaultConfig,
        headers: {
          ...defaultConfig.headers,
          Authorization: `Bearer ${token}`
        }
      });
  },
  post: async (url, data) => {
    const token = localStorage.getItem('accessToken');

    return await axios.post(url, data,
      {
        ...defaultConfig,
        headers: {
          ...defaultConfig.headers,
          Authorization: `Bearer ${token}`
        }
      });
  },

  put: async (url, data) => {
    const token = localStorage.getItem('accessToken');

    return await axios.put(url, data,
      {
        ...defaultConfig,
        headers: {
          ...defaultConfig.headers,
          Authorization: `Bearer ${token}`
        }
      });
  },

  delete: async (url) => {
    const token = localStorage.getItem('accessToken');

    return await axios.delete(url,
      {
        ...defaultConfig,
        headers: {
          ...defaultConfig.headers,
          Authorization: `Bearer ${token}`
        }
      });
  },

  // payload => {username, login}
  login: async (payload) => {
    return axios
      .post(`${defaultConfig.baseURL}/users/login`, payload)
      .then(response => {
        if (response.status == 200) {
          localStorage.setItem('accessToken', response.data.accessToken)
          setUserDetails(response.data.user)
        } else {
          throw new Error(response.data.err);
        }
      }).catch(err => {
        console.error("Error during login: ", err);
        return response.data;
      })
  },

  logout: async () => {
    if (localStorage.getItem('accessToken') == null)
      return logoutAlert(false);

    localStorage.removeItem('accessToken')
    window.location.href = '/login';
    return logoutAlert(true);
  }
}


export default api;