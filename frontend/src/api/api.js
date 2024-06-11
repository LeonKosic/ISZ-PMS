import axios from "axios";
import { setUserDetails } from "./stores";

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
    console.log(payload)

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
      setUserDetails("id", response.data.id)
      setUserDetails("username", response.data.username)
      setUserDetails("name", response.data.name)
      setUserDetails("role_id", response.data.role_id)
    } else console.error("Error during login: ", err)
  }
}


export default api;