import { useLocation } from "@solidjs/router"
import { createDropzone } from "@soorria/solid-dropzone"

import FileList from "../components/generic/file/FileList"
import ProjectMaintainers from "../components/project/ProjectMaintainers"
import ProjectOwner from "../components/project/ProjectOwner"

import api from "../api/api"
import sortFiles from "../components/generic/file/sortFiles"

// mock/test data
import { projectInfo } from "../assets/projectContent"
import { currentPathStore } from "../api/stores"


let projectID;
const getProjectInfo = async () => {
  const response = await api.get(`/projects/${projectID}`)
  return response.data
}

export default function Project(props) {
  projectID = useLocation().pathname.split('/')[2];
  // const [projectInfo] = createResource(getProjectInfo)

  const sortedFiles = sortFiles(projectInfo().files)
  
  const onDrop = async (acceptedFiles) => {
    return await api.upload(`/upload/projects/${projectID}`, { files: acceptedFiles, currentPath: currentPathStore.path})
  }
  
  const dropzone = createDropzone({ onDrop })
  
  return (
    <div class="max-w-screen-2xl mx-auto py-6 mt-4">
      {/* project title */}
      <p class="text-3xl pb-6 pl-6">
        {projectInfo().name}
      </p>
      
      {/* panels container */}
      <div class="flex flex-row justify-between items-stretch gap-10">
        {/* left-panel */}
        <div class="w-full">
          {/* dropzone */}
          <div {...dropzone.getRootProps()} >
            <input {...dropzone.getInputProps()} />
            <div class="flex flex-row justify-center items-center text-xl my-4 italic border-2 rounded-xl border-accent-600 h-52">
              {
                dropzone.isDragActive ? 
                <p>Drop files here!</p> :
                <p>Click here or drag files to upload</p>
              }
            </div>
          </div>
          
          {/* project files */}
          <div class="h-auto border-2 border-accent-600 rounded-xl p-4">
            <FileList
              data={sortedFiles}
              />
          </div>
        </div>
      
        {/* right panel */}
        <div class="sticky w-auto">
          <ProjectOwner
            owner={projectInfo().owner}
            />
          
          <ProjectMaintainers
            maintainers={projectInfo().collaborators}
          />
          
          {/* about */}
          
          <p class="text-2xl flex flex-row justify-center items-center mt-8">
            About
          </p>
          <div class="border-2 border-accent-600 rounded-xl h-auto p-4 mt-2">
            <p>
              {projectInfo().about}
            </p>
          </div>
        </div>
      </div>     
      {/* <div class="h-80 border-2 mt-80">
      </div>  */}
    </div>
  )
}