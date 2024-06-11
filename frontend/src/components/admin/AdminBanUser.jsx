import { Stack } from "@suid/material";
import { createSignal } from "solid-js";
import UserList from '../generic/user/UserList'
import api from "../../api/api";
const banUser = async (id) => {
  const response = await api.post('/admin/ban', { id: id })
  return response.data;
}

const searchUser = async (username) => {
  if (username == '')
    return []

  const response = await api.post('/users/search', { username: username })
  return response.data;
}


export default function AdminBanUser(props) {
  const [targetUsername, setTargetUsername] = createSignal('')
  const [users, setUsers] = createSignal([]);

  const handleInputChange = (event) => {
    setTargetUsername(event.target.value)
    setUsers(searchUser(event.target.value))
  }

  return (
    <div class="border-2 ms-8 p-4 rounded-xl h-80 w-max">
      <h1 class="text-2xl">Ban user</h1>
      <hr class="my-2 py-2" />

      <Stack spacing={2}>
        <input
          type="text"
          value={targetUsername()}
          onChange={handleInputChange}
          class="subpixel-antialiased rounded-lg bg-opacity-10 border-accent-600 bg-primary-100 border-2 p-4 text-xl"
          placeholder="Search users..."
        />
      </Stack>

      <Show when={users().length > 0}>
        <div class="h-80 overflow-y-scroll">
          <UserList
            users={users()}
            style={"flex flex-col items-center justify-center mt-2"}
            cardStyle={"border-2 border-accent-600 rounded-xl p-2 w-80 my-1 text-xl cursor-pointer bg-opacity-0 hover:bg-opacity-10 hover:bg-red-500 transition-opacity duration-1000"}
            cardClickAction={(id) => { banUser(id) }}
            showRole={false}
            cardUseMaxWidth={false}
            showUsername={false}
          />
        </div>
      </Show>
    </div>
  )
}