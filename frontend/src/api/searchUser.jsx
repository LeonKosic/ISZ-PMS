import UserList from "../components/user/UserList";
import api from "./api"

export const searchUser = async (username, toUserList = false) => {
  const response = await api.post("/users/search", { user_name: username })
  const data = await response.data;
  
  if (toUserList == false)
    return data
  else return <UserList users={data.users} />
}