import { useLocation } from "@solidjs/router";
import { Button, Stack } from "@suid/material";
import axios from "axios";
import { For, Show, createSignal } from "solid-js";

const uploadFiles = async () => {
  var formData = new FormData();
  var filelist = document.querySelector("#uploadInput");
  formData.append("file", filelist.files[0])
  
  console.log(filelist)
  console.log(formData)
  
  const response = await axios.post("http://localhost:3001/", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  // return await response.data()
}

// const uploadFiles = async (files) => {
//   console.log(`files: ${files}`);
  
//   const url = "http://localhost:3001/";
//   const response = await fetch(url,
//     {
//       method: "POST",
//       headers: { "Content-Type": "multipart/form-data" },
//       body: JSON.stringify(files)
//     })
//   return await response.json();
// }

export default function UploadForm(props) {
  const [files, setFiles] = createSignal([]);
  const updateFileList = () => {
    setFiles(document.getElementById("uploadInput").files)
    console.log(files())
  }
  
  const url = `${import.meta.env.VITE_API_HOST}${useLocation().pathname}`
  console.log(`Sending POST to: ${url}`)
  
  return (
    <div class="py-10 max-w-screen-2xl mx-auto flex justify-center items-center">
      <Stack direction="column" spacing={2}>
        <form id="uploadForm" encType="multipart/form-data">
          <input id="uploadInput" type="file" multiple onChange={updateFileList} />
          <Button
            type="submit"
            variant="contained"
            onClick={() => uploadFiles(files())}
            >
            Submit
          </Button>
        </form>
          
          <Show when={files().length > 0}>
            <p>Files selected:</p>
            <For each={files()}>
              {
                (file, idx) => <p>{file.name}</p>
              }
            </For>
          </Show>
        </Stack>
    </div>
  )
}