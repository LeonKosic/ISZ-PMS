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

  download: async ({project, path}) => {
    const token = localStorage.getItem('accessToken');

    return await axios.post("/projects/download/", {project_id: project, path},
      {
        ...defaultConfig,
        headers: {
          ...defaultConfig.headers,
          Authorization: `Bearer ${token}`
        }
      })
      .then((response)=>response.blob())
      .then((blob)=>{
          // Create blob link to download
            const url = window.URL.createObjectURL(
              new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
              'download',
              `download.txt`,
            );

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
      })},
  logout: async (payload) => {
    localStorage.removeItem('accessToken')
    window.location.href = '/login'
  }
}


export default api;