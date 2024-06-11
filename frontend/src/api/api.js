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
      setUserDetails(response.data.user)
    } else console.error("Error during login: ", err)

    // return axios
    //   .post(`/users/login`, {
    //     username: payload.username,
    //     password: payload.password
    //   },
    //   )
    //   .then(response => {
    //     if (response.status == 200) {
    //       localStorage.setItem('accessToken', response.data.accessToken)
    //       setUserDetails(response.data.user)
    //     } else {
    //       throw new Error(response.data.err);
    //     }
    //   }).catch(err => {
    //     console.error("Error during login: ", err);
    //   })
  }
}


export default api;