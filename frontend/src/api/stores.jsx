import { createStore } from "solid-js/store";

export const [userDetails, setUserDetails] = createStore({
  id: "",
  username: "",
  name: ""
})

export const [testUserDetails, setTestUserDetails] = createStore({
  id: "1",
  username: "testusername",
  name: "testname"
})