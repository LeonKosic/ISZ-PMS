import { TextField, Stack,   } from "@suid/material";
import { darkColors } from "@suid/material/styles/createPalette";
import theme from "../../styles/suidTheme";
import UserSearchResult from "./atomic/UserSearchResult";
import { For, createSignal } from "solid-js";

const banUser = async (username) => {
  // TODO
  const url = `${import.meta.env.VITE_API_HOST}/admin/ban`
  const response = await fetch(url, { method: "POST", body: { user_name: username } }) // post/put?
  return await response.json()
}

const searchUser = async (username) => {
  if (name == '')
    return []
  
  // TODO
  const url = `${import.meta.env.VITE_API_HOST}/users/search`
  const response = await fetch(url, { method: "POST", body: { user_name: username }})
  return await response.json();
}

export default function AdminBanUser(props) {
  const [targetUsername, setTargetUsername] = createSignal('') 
  const [users, setUsers] = createSignal([]);
  
  const handleInputChange = (event) => {
    setTargetUsername(event.target.value)
    setUsers(searchUser(event.target.value))
  }
  
  return (
    <div class="ban-user-ctr">
      <h1 class="ctr-title">Ban user</h1>
      <hr class="my-2 py-2"/>
      
      <Stack spacing={2}>
        <input
          type="text"    
          value={targetUsername()}
          onChange={handleInputChange}
          class="default-form form-big"
          placeholder="Search users..."
        />
      </Stack>
      
      <Show when={users().length > 0}>
        <For each={users()}>
          {
            (user) => 
              // TODO: mzd ce trebati koristiti samo user, vidjeti poslije
              <div onClick={() => banUser(user.username)}>
                <UserSearchResult username={user.username}/>
              </div>
          }
        </For>
      </Show>
    </div>
  )
}