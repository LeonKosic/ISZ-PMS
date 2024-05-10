import { Button, Stack } from "@suid/material";
import { createSignal } from "solid-js";

const [result, setResult] = createSignal({status: "OK", reason: "ALL_GOOD" })

const changeFullname = async (fullname, newFullname) => {
  const url = `${import.meta.env.VITE_API_HOST}/users/edit`
  const response = await fetch(url, { method: "PUT", body: { name: fullname, new: newFullname } })
  const json = await response.json()
  
  if (json.status != 200)
    setResult({status: "NOK", reason: "Some reason?"})

  return json
}

export default function EditFullnameField(props) {
  const [fullname, setFullname] = createSignal(props.fullname)
  
  const handleInputChange = (event) => {
    setFullname(event.target.value)
  } 
  
  return (
    <div class="fullname-field">
      <h1 class="text-big italic my-4 mb-2">Full Name</h1>
      
      <Stack direction="row">
        <input
          class="default-form form-big mr-2 w-80"
          type="text"
          value={fullname()}
          onChange={handleInputChange}
          onKeyDown={handleInputChange}
          placeholder={fullname()}
          />
        
        <div onClick={() => changeFullname(props.fullname, fullname())}>
          <Button variant="outlined" class="h-full" color="pmsScheme">
            Change
          </Button>
        </div>
        
        <Show when={result().status != "OK"}> {result().reason} </Show>
      </Stack>
    </div>
  )
}