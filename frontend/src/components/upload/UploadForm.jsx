import { useLocation } from "@solidjs/router";
import { Button, Stack } from "@suid/material";
import { For, Show, createSignal } from "solid-js";


export default function UploadForm(props) {
  const [files, setFiles] = createSignal([]);
  const updateFileList = () => {
    setFiles(document.getElementById("uploadInput").files)
  }
  
  const url = `${import.meta.env.VITE_API_HOST}${useLocation().pathname}`
  console.log(`Sending POST to: ${url}`)
  
  return (
    <div class="py-10 max-w-screen-2xl mx-auto flex justify-center items-center">
      
      <form
        action={`https://localhost:3001/`}
        method="post"
        enctype="multipart/form-data"
      >
        <Stack direction="column" spacing={2}>
          <input id="uploadInput" type="file" multiple onChange={updateFileList} />
          <Button type="submit" variant="contained"> Submit </Button>
          
          <Show when={files().length > 0}>
            <p>Files selected:</p>
            <For each={files()}>
              {
                (file, idx) => <p>{file.name}</p>
              }
            </For>
          </Show>
        </Stack>
      </form>
    </div>
  )
}