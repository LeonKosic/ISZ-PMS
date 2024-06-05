import { For, createSignal } from "solid-js";
import FileCard from "./FileCard";
import { useLocation } from "@solidjs/router";
import api from "../../../api/api";
import { isReadable } from "../../../assets/readableMIMETypes";
import { mockApi } from "../../../assets/mockApi";

// da ne koristim window.location.href mrtvi
let currentPath = '';

const directoryContent = async (dirname) => {
  const data = await mockApi.get(`${currentPath}/${dirname}/`)
  console.log(data.files)
  return data.files
  // return await api.get(`${currentPath}/${dirname}/`).data
} 

export default function FileList(props) {
  const [rootPath, _] = createSignal(useLocation().pathname);
  currentPath = rootPath()
  
  return (
    <div>
      <Show when={currentPath != rootPath()}>
        <div
          class="pl-4 pr-4 py-2 rounded-xl mb-2 block w-28 hover:cursor-pointer hover:bg-accent-600 bg-opacity-5 duration-500"
          onClick={() => {
            const previousURL = currentPath.substring(0, currentPath.lastIndexOf('/'));
            window.location.replace(previousURL)
          }}
          >
          <p class="text-lg italic text-accent-300">
            <i class="fa-solid fa-arrow-left mr-2"/> Back
          </p>
        </div>
      </Show>
      <hr class="w-full mb-1 border-accent-600 "/>
      <For each={props.data}>
        {
          (file) =>
            <div class="cursor-pointer">
              <FileCard
                isDirectory={file.isDirectory}
                name={file.name}
                onClick={() => {
                  if (file.isDirectory) {
                    // replace contents of current FileList.props.data with the result
                    props.data = directoryContent(file.name);
                    currentPath = `${currentPath}/${file.name}`
                  }
                  
                  else if (isReadable(file.mimeType)) {
                    // 1. redirect to a display page with the provided content
                    // 2. display the file content
                    // kako?
                  }
                  
                  else api.download(`${currentPath}/${file.name}`)
                }}
                />
            </div>
        }
      </For>
    </div>
  )
}