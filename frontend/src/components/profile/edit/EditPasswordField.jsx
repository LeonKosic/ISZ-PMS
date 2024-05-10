import { Button, Stack } from "@suid/material";
import { createSignal } from "solid-js";

const [result, setResult] = createSignal({status: "OK", reason: "ALL_GOOD" })

const changePassword = async (password, newPassword) => {
  const url = `${import.meta.env.VITE_API_HOST}/users/edit`
  const response = await fetch(url, { method: "PUT", body: { password: password, new: newPassword } })
  const json = await response.json()
  
  if (json.status != 200)
    setResult({status: "NOK", reason: "Some reason?"})

  return json
}

export default function EditPasswordField(props) {
  const [password, setPassword] = createSignal('')
  const [newPassword, setNewPassword] = createSignal('')
  
  const handlePassword = (event) => {
    setPassword(event.target.value)
  } 
  
  const handleNewPassword = (event) => {
    setNewPassword(event.target.value)
  }
  
  return (
    <div class="password-field">
      <h1 class="text-big italic my-4 mb-2">Password</h1>
      
      <Stack direction="column" spacing={1}>  
      {/* Input password */}
      <Stack direction="row">
        <input
          class="default-form form-big mr-2 w-80 h-10"
          type="text"
          value={password()}
          onChange={handlePassword}
          onKeyDown={handlePassword}
          placeholder={"Enter new password..."}
          />
      </Stack>
      
      {/* Confirm password */}
      <Stack direction="row">
        <input
            class="default-form form-big mr-2 w-80 h-10"
            type="text"
            value={newPassword()}
            onChange={handleNewPassword}
            onKeyDown={handleNewPassword}
            placeholder={"Confirm new password..."}
        />
        
        <div onClick={() => changePassword(password(), newPassword())}>
          <Button variant="outlined" class="h-full" color="pmsScheme">
            Change
          </Button>
        </div>
        
        <Show when={result().status != "OK"}> {result().reason} </Show>
        </Stack>
      </Stack>
    </div>
  )
}