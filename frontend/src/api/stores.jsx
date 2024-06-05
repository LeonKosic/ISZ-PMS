import { createStore } from "solid-js/store";

export const [userDetails, setUserDetails] = createStore({
  id: "",
  username: "",
  name: ""
})

export const [currentPathStore, setCurrentPathStore] = createStore({
  path: ''
});

export const [selectedFile, setSelectedFile] = createStore({
  name: '',
  data: '',
  hidden: true
})