import { createStore } from "solid-js/store";

export const [userDetails, setUserDetails] = createStore({
  id: "",
  username: "",
  name: ""
})