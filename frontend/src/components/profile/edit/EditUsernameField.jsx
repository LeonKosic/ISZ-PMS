import { Button, Stack } from "@suid/material";
import { createSignal } from "solid-js";

const [result, setResult] = createSignal({status: "OK", reason: "ALL_GOOD" })

const changeUsername = async (username, newUsername) => {
  const url = `${import.meta.env.VITE_API_HOST}/users/edit`
  const response = await fetch(url, { method: "PUT", body: { user_name: username, new: newUsername } })
  const json = await response.json()
  
  if (json.status != 200)
    setResult({status: "NOK", reason: "Some reason?"})

  return json
}

export default function EditUsernameField(props) {
  const [username, setUsername] = createSignal(props.username)
  
  const handleInputChange = (event) => {
    setUsername(event.target.value)
  } 
  
  return (
    <div class="username-field">
      <h1 class="text-big italic my-4 mb-2">Username</h1>
      
      <Stack direction="row">
        <input
          class="default-form form-big mr-2 w-80"
          type="text"
          value={username()}
          onChange={handleInputChange}
          onKeyDown={handleInputChange}
          placeholder={username()}
          />
        
        <div onClick={() => changeUsername(props.username, username())}>
          <Button variant="outlined" class="h-full" color="pmsScheme">
            Change
          </Button>
        </div>
        
        <Show when={result().status != "OK"}> {result().reason} </Show>
      </Stack>
    </div>
  )
}