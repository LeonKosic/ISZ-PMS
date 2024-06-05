import { useLocation } from "@solidjs/router"
import { Box, Container, Stack } from "@suid/material"
import { For, createResource } from "solid-js"
import api from "../api/api"
import axios from "axios";
import { createDropzone } from "@soorria/solid-dropzone"
import FileList from "../components/generic/file/FileList"
import ProjectMaintainers from "../components/project/ProjectMaintainers"
import ProjectOwner from "../components/project/ProjectOwner"


let projectID;

const getProjectInfo = async () => {
  const response = await api.get(`/projects/${projectID}`)
  return response.data
}

export default function Project(props) {
  projectID = useLocation().pathname.split('/')[2];
  // const [projectInfo] = createResource(getProjectInfo)
  const projectInfo = () => ({
    name: "Project Management System",
    about: "Projektni zadatak iz inzenjeringa softverskih zahtjeva, project management service",
    owner: {
      id: "1",
      username: "oggnjen",
      name: "Ognjen Komadina"
    },
    collaborators: [
      { id: "2", username: "testuser2", name: "fullname2" },
      { id: "3", username: "testuser3", name: "fullname3" },
      { id: "4", username: "testuser4", name: "fullname4" },
      { id: "5", username: "testuser5", name: "fullname5" },
    ],
    files: [
      { name: "dir1", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "dir" },
      { name: "file2.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file3.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "dir2", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "dir" },
      { name: "docker_compose.yaml", data: `version: '3.8'
services:
  database:
    image: mysql:latest
    ports:
      - "3308:3306"
    expose:
      - 3306
    volumes:
      - ./database:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: test
      MYSQL_DATABASE: test
  api:
    build: "./api"
    depends_on:
      - database
    restart: always
    ports:
      - "3001:3000"
    environment:
      DB_HOST: test
      DB_PORT: test
      DB_USER: test
      DB_PASSWORD: test
      DB_NAME: test 
      JWT_KEY: test
  frontend:
    build: "./frontend"
    ports:
      - "3000:3000"
      
      # To avoid the infinite HMR error in console
      - "3003:3000"
    environment:
      VITE_API_HOST: test
    depends_on:
      - api`, type: "file"
      },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
      { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
                                                                                                            { name: "file4.txt", data: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, provident!", type: "file" },
    ]
  })
  
  const sortedFiles = projectInfo().files.sort((a, b) => {{
    if (a.type === 'dir' && b.type !== 'dir') {
      return -1;
    }
    if (a.type !== 'dir' && b.type === 'dir') {
      return 1;
    }
    return 0;
  }})
  
  const onDrop = async (acceptedFiles) => {
    console.log(acceptedFiles)
    return await axios.post("http://localhost:3001/",acceptedFiles) //TODO REMOVE, TESTING
    //return await api.upload(`/upload/projects/${projectID}`)
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
