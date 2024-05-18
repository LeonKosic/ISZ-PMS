import { Button, Stack } from "@suid/material";
import { createSignal } from "solid-js";
import api from "../../../api/api";

export default function EditPasswordField(props) {  
  const [result, setResult] = createSignal({ processed: false, statusCode: 999, message: "" })
  const getInput = (elementId) => document.querySelector(`#${elementId}`).value
  
  const submit = async () => {
    if (getInput("oldPasswordTF") == '' || getInput("newPasswordTF") == '') {
      setResult({ processed: "true", statusCode: 420, message: "Please define both passwords." })
      return
    }  
    
    const response = await api.put('/users/changepassword', {
      old_password: getInput("oldPasswordTF"),
      new_password: getInput("newPasswordTF")
    })
    setResult({
      processed: true,
      statusCode: response.status,
      message: response.statusText
    })
  }
  
  return (
    <div class="password-field">
      <Stack direction="column">  
        <p class="py-2 pl-1">Change password</p>
        <p class="py-2 pl-1 text-lg italic">Current password</p>
        <input
          type="password"
          id="oldPasswordTF"
          class="rounded-lg bg-accent-300 bg-opacity-10 w-full ps-2 text-slate-200 text-lg h-9"
        />
        
        <p class="py-2 pl-1 text-lg italic">New password</p>
        <input
          type="password"
          id="newPasswordTF"
          class="rounded-lg bg-accent-300 bg-opacity-10 w-full ps-2 text-slate-200 text-lg h-9"
        />
      </Stack>
      
      <Button
          class="rounded-xl h-auto mt-2 p-2 w-full"
          variant="outlined"
          color="pmsScheme"
          onClick={() => {submit()}}
        >
          Submit
      </Button>
      
      <Show when={result().processed}>
          <div class="flex flex-row items-center justify-center ps-4 mx-auto">
            <p class={`${result().statusCode < 400 ? "" : "text-red-400 "} italic`}>
              {result().message} ({ result().statusCode })
            </p>
          </div>
        </Show>
    </div>
  )
}