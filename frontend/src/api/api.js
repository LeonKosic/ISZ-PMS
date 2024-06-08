import axios from "axios";
import { setUserDetails } from "./stores";

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

  upload: async (url, payload) => {
    console.log(payload);

    var formData = new FormData();
    Array.from(payload.files).forEach((file, index) => {
      let filePath = file.path;
      if (file.path[0] == '/') {
        // kada je direktorijum dodaje / na pocetak, pa da bude uniformno
        filePath = file.path.substring(1, file.path.length);
      }

      let path = `${payload.id}/${payload.currentPath}${filePath}`;
      console.log(path);
      formData.append(path, file);
    });

    return await axios.post(url, formData,
      {
        headers: {
          ...defaultConfig.headers,
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