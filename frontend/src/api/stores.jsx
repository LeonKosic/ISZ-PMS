import { createStore } from "solid-js/store";


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
export const [userDetails, setUserDetails] = createStore(
  {
    id: localStorage.getItem("user_id"),
    name: localStorage.getItem("user_name"),
    username: localStorage.getItem("user_username")
  }
)
