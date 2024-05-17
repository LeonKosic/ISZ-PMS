import axios from "axios";
import { createStore } from "solid-js/store";

const defaultConfig = {
  baseURL: `http://${import.meta.env.VITE_API_HOST}`,
}

export const [tokenStore, setTokenStore] = createStore();

// TODO: provjeriti da li treba prosljedjivati sa fronta cijeli url ili samo djelimican endpoint?

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
  // TODO: /users/login prima (payload) ili {username, password}?
  login: async (payload) => {
    return axios
      .post(`${defaultConfig.baseURL}/users/login`, payload)
      .then(response => {
        if (response.status == 200) {
          setTokenStore(payload.username, tokenStore.array.length, {
            jwt: response.data.accessToken
          })

          // save the JWT acces token in the local storage
          localStorage.setItem('accessToken', response.data.accessToken)

          return response.data
        } else {
          throw new Error(response.data.err);
        }
      }).catch(err => {
        console.error("Error during login: ", err);

        // TODO
        return response.data;
      })
  }
}


export default api;