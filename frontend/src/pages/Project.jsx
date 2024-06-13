import { useLocation } from "@solidjs/router"
import { createDropzone } from "@soorria/solid-dropzone"

import FileList from "../components/generic/file/FileList"
import ProjectMaintainers from "../components/project/ProjectTeam"
import ProjectOwner from "../components/project/ProjectOwner"
import CommitDropdown from "../components/project/CommitDropdown"

import api from "../api/api"
import sortFiles from "../components/generic/file/sortFiles"
import { currentPathStore, selectedFile, setSelectedFile, fileList, setFileList, setCurrentPathStore, projectStore } from "../api/stores"

// mock/test data
import { projectInfo } from "../assets/projectContent"
import ProjectTeam from "../components/project/ProjectTeam"

const getCommitVersion = async (commitID) => {
  // ENDPOINT?
  const response = await api.post(`/project/files`,
    {
      id: projectStore.id,
      commit: projectStore._fileList.commitID,
    }
  )

  return response.data
}

export default function Project(props) {
  setFileList("files", sortFiles(projectInfo().files))

  const onDrop = async (acceptedFiles) => {
    // TODO: ovaj endpoint?
    // TODO return await api.upload(`/upload/projects/${projectStore.id}`,
    return await api.upload(`http://localhost:3001/`,
      {
        id: projectStore.id,
        currentPath: currentPathStore.path,
        files: acceptedFiles,
      })
  }

  const dropzone = createDropzone({ onDrop })

  return (
    <div class="max-w-screen-2xl mx-auto py-2 mt-2">
      <hr class="border-accent-700 border-2 rounded-lg" />

      {/* panels container */}
      <div class="flex flex-row justify-between items-stretch gap-4">
        {/* left-panel */}
        <div class="w-full">
          {/* dropzone */}
          <div {...dropzone.getRootProps()} >
            <input {...dropzone.getInputProps()} />
            <div class="flex flex-row justify-center items-center text-xl my-4 italic border-2 rounded-xl border-accent-600 h-52 hover:cursor-pointer hover:bg-accent-700 duration-300">
              {
                dropzone.isDragActive ?
                  <p>Drop files here!</p> :
                  <p>Click here or drag files to upload</p>
              }
            </div>
          </div>

          {/* file content display */}
          <Show when={!selectedFile.hidden}>
            <div class="relative h-auto border-2 border-accent-600 rounded-xl p-4 mb-4">
              <div class="pb-2">
                <div
                  class="absolute right-0 top-0 m-3 mr-3 pl-2 pr-2 py-1 hover:bg-accent-700 bg-opacity-25 rounded-lg duration-500 hover:cursor-pointer"
                  onClick={() => { setSelectedFile("hidden", true) }}
                >
                  <i class="fa-solid fa-x" />
                </div>
                <p class="text-xl">Displaying contents of {selectedFile.name}</p>
              </div>
              <hr />
              <code>{selectedFile.data}</code>
            </div>
          </Show>

          {/* project files */}
          <div class="h-auto border-2 border-accent-600 rounded-xl p-4">
            <FileList
              data={fileList.files}
            />
          </div>
        </div>

        {/* right panel */}
        <div class="w-1/3">
          <ProjectTeam
            team={props.data.team}
          />

          <CommitDropdown
            commits={props.data.commits}
            commitID={props.data.commits[props.data.commits.length - 1]}
            callback={async (commitID) => {
              /* 
                - set current commit, 
                - get commit-based files 
                - set virtual path to root 
              */
              setFileList("commitID", commitID)
              setFileList("files", getCommitVersion(commitID))

              // TODO (vidjeti sa leonom):
              // './' ili '' kao root path?
              setCurrentPathStore("path",)
            }}
          />
        </div>
      </div>

      <hr class="mt-4 border-accent-700 border-2 rounded-lg" />
    </div>
  )
}
