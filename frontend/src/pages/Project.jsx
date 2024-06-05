import { useLocation } from "@solidjs/router"
import { Box, Container, Stack } from "@suid/material"
import { For, createResource } from "solid-js"
import api from "../api/api"

import { createDropzone } from "@soorria/solid-dropzone"
import FileList from "../components/generic/file/FileList"
import ProjectMaintainers from "../components/project/ProjectMaintainers"
import ProjectOwner from "../components/project/ProjectOwner"
import { projectInfo } from "../assets/projectContent"


let projectID;

const getProjectInfo = async () => {
  const response = await api.get(`/projects/${projectID}`)
  return response.data
}

export default function Project(props) {
  projectID = useLocation().pathname.split('/')[2];
  // const [projectInfo] = createResource(getProjectInfo)
  
  const sortedFiles = projectInfo().files.sort((a, b) => {{
    if (a.isDirectory && !b.isDirectory) {
      return -1;
    }
    if (!a.isDirectory && b.isDirectory) {
      return 1;
    }
    return 0;
  }})
  
  const onDrop = async (acceptedFiles) => {
    console.log(acceptedFiles)
    return await api.upload(`/upload/projects/${projectID}`)
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
          {/* TODO: parse paths from received response */}
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