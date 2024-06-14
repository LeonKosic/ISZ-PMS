import UserList from "../components/generic/user/UserList";
import api from "./api"

export const searchUser = async (username, toUserList = false) => {
  const response = await api.post("/users/search", { username: username })
  const data = response.data

  if (toUserList == false)
    return data
  else return <UserList users={data} 
                cardClickAction={(id) => { window.location.href = `/profiles/${id}` }}
                cardStyle={"overflow-auto max-h-52 my-2 bg-accent-600 bg-opacity-5 border-2 rounded-xl border-accent-600 py-2 text-xl text-slate-200"}
              />
}