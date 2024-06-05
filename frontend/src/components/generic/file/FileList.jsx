import { For, createSignal } from "solid-js";
import FileCard from "./FileCard";
import { useLocation } from "@solidjs/router";
import api from "../../../api/api";
import { isReadable } from "../../../assets/readableMIMETypes";
import { mockApi } from "../../../assets/mockApi";
import sortFiles from "./sortFiles";
import { currentPathStore, setCurrentPathStore, setSelectedFile } from "../../../api/stores";

// sadrzaj trenutnog direktorijuma
const [activeData, setActiveData] = createSignal([]);

const getDirectoryContent = async (dirpath) => {
  const dirInfo = await mockApi.get(dirpath)
  return dirInfo.files;
}

const updateCurrentPath = (path) => {
  setCurrentPathStore("path", path);
}

const updateActiveData = (dirData) => {
  dirData = sortFiles(dirData)
  setActiveData(dirData)
}

const updateSelectedFile = (name, data, hidden) => {
  setSelectedFile("name", name)
  setSelectedFile("data", data)
  setSelectedFile("hidden", hidden)
}


export default function FileList(props) {
  const [rootPath, _] = createSignal(
    useLocation().pathname.endsWith('/')
      ? useLocation().pathname.substring(0, useLocation().pathname.length - 1)
      : useLocation().pathname);
  
  setActiveData(props.data)
  setCurrentPathStore("path", rootPath())
  
  return (
    <div>
      <Show when={currentPathStore.path != rootPath()}>
        <div
          class="pl-4 pr-4 py-2 rounded-xl mb-2 block w-28 hover:cursor-pointer hover:bg-accent-600 bg-opacity-5 duration-500"
          onClick={async () => {
            const previousURL = currentPathStore.path.substring(0, currentPathStore.path.lastIndexOf('/'));
            updateCurrentPath(previousURL)
            
            const data = await getDirectoryContent(previousURL)
            updateActiveData(data)
          }}
          >
          <p class="text-lg italic text-accent-300">
            <i class="fa-solid fa-arrow-left mr-2"/> Back
          </p>
        </div>
      </Show>
      <hr class="w-full mb-1 border-accent-600 "/>
      <For each={activeData()}>
        {
          (file) =>
            <div class="cursor-pointer">
              <FileCard
                isDirectory={file.isDirectory}
                name={file.name}
                onClick={async () => {
                  if (file.isDirectory) {
                    updateSelectedFile(null, null, true);
                    
                    const targetPath = `${currentPathStore.path}/${file.name}`
                    updateCurrentPath(targetPath)
                    
                    const data = await getDirectoryContent(targetPath)
                    updateActiveData(data)
                  }
                  
                  else if (isReadable(file.mimeType)) {
                    updateSelectedFile(file.name, file.data, false)
                  }
                  
                  else api.download(`${currentPathStore.path}/${file.name}`)
                }}
                />
            </div>
        }
      </For>
    </div>
  )
}