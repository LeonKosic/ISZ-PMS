import axios from "axios";
import { setUserDetails, userDetails } from "./stores";

const defaultConfig = {
  baseURL: `${import.meta.env.VITE_API_HOST}`,
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

  login: async (payload) => {
    const response = await axios.post(
      `/users/login`,
      {
        username: payload.username,
        password: payload.password,
      },
      {
        ...defaultConfig,
        headers: defaultConfig.headers
      }
    )

    if (response.status == 200) {
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem("user_id", response.data.id)
      localStorage.setItem("user_name", response.data.name)
      localStorage.setItem("user_username", response.data.username)

      setUserDetails("id", response.data.id)
      setUserDetails("name", response.data.name)
      setUserDetails("username", response.data.username)
    } else console.error("Error during login: ", err)
  },

  logout: async (payload) => {
    localStorage.removeItem('accessToken')
    window.location.href = '/login'
  }
}


export default api;