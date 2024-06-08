import axios from "axios";
import { setUserDetails } from "./stores";

const defaultConfig = {
  baseURL: `http://${import.meta.env.VITE_API_HOST}`,
}

const api = {
  get: (url) => {
    return axios.get(url, defaultConfig);
  },
  post: (url, data) => {
    return axios.post(url, data, defaultConfig)
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

  upload: async (url, payload) => {
    // files: dropzone-provided
    var formData = new FormData();
    Array.from(payload).forEach((file, index) => {
      formData.append(index, file);
    });


    return await axios.post(url,formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "multipart/form-data"
        }
      }
    )
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
  }
}


export default api;
