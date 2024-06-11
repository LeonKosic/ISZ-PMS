import { createStore } from "solid-js/store";

export const [userDetails, setUserDetails] = createStore(
  {
    id: localStorage.getItem("user_id"),
    name: localStorage.getItem("user_name"),
    username: localStorage.getItem("user_username")
  }
)
