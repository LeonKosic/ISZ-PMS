import { For, createSignal } from "solid-js";
import FileCard from "./FileCard";
import { useLocation } from "@solidjs/router";
import api from "../../../api/api";
import { isReadable } from "../../../assets/readableMIMETypes";
import { mockApi } from "../../../assets/mockApi";
import sortFiles from "./sortFiles";
import { currentPathStore, setCurrentPathStore, setSelectedFile, projectStore } from "../../../api/stores";

// sadrzaj trenutnog direktorijuma
const [activeData, setActiveData] = createSignal([]);

async function getProjectFiles(path) { 
  const response = await api.post("/projects/directory/structure", {path, project_id: projectStore.id });
  console.log(response.data)
  return response.data; 
 }

const getDirectoryContent = async (dirpath) => {
  const dirInfo = await getProjectFiles(dirpath);

  // TODO
  // const response = await api.get('/project/content', {})

  return dirInfo.files;
}

const updateCurrentPath = (path) => {
  console.log(`rootPath: ${path}`);
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
  const [rootPath, setRootPath] = createSignal('')
  setActiveData(props.data)
  setCurrentPathStore("path", rootPath())
  setCurrentPathStore("root", rootPath())

  return (
    <div>
      <Show when={currentPathStore != rootPath()}>
        <div
          class="pl-4 pr-4 py-2 rounded-xl mb-2 block w-28 hover:cursor-pointer hover:bg-accent-600 bg-opacity-5 duration-500"
          onClick={async () => {
            let previousURL = currentPathStore.path.substring(0, currentPathStore.path.lastIndexOf('/'));
            previousURL = previousURL.substring(0, previousURL.lastIndexOf('/'))
            // // boze me pomoz al za dir1/dir2/
            // // bude dir1/dir2
            // // pa onda dir1
            console.log(`previousURL: ${previousURL}`)

            // console.log(`previousURL: ${previousURL}`)
            updateCurrentPath(previousURL+"/")

            const data = await getDirectoryContent(previousURL+"/")
            updateActiveData(data)
          }}
        >
          <p class="text-lg italic text-accent-300">
            <i class="fa-solid fa-arrow-left mr-2" /> Back
          </p>
        </div>
      </Show>
      <hr class="w-full mb-1 border-accent-600 " />
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

                    const targetPath = `${currentPathStore.path}${file.name}/`
                    console.log(`targetPath: ${targetPath}`)
                    updateCurrentPath(targetPath)

                    const data = await getDirectoryContent(targetPath)
                    updateActiveData(data)
                  }

                  else api.download({ project: projectStore.id, path: currentPathStore.path + file.name })
                }}
              />
            </div>
        }
      </For>
    </div>
  )
}