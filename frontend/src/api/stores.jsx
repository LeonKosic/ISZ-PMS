import { createStore } from "solid-js/store";

// user related
export const [userDetails, setUserDetails] = createStore({
  id: "",
  username: "",
  name: ""
})

// project page related

export const [currentPathStore, setCurrentPathStore] = createStore({
  root: '',
  path: ''
});

export const [selectedFile, setSelectedFile] = createStore({
  name: '',
  data: '',
  hidden: true
})

export const [fileList, setFileList] = createStore({
  commitID: 0,
  files: [],
})

// nested reactivity
export const [projectStore, setProjectStore] = createStore({
  _pathStore: currentPathStore,
  _selectedFile: selectedFile,
  _fileList: fileList
})