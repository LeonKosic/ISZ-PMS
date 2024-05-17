import { createStore } from "solid-js/store";

export const [userDetails, setUserDetails] = createStore({
  user: {
    id: "",
    username: "",
    name: ""
  } 
})