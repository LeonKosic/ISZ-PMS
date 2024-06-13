import ProjectList from "../components/generic/project/ProjectList";
import api from "./api"

export const searchProject = async (projectName, toProjectList = false) => {
  const response = await api.post("/projects/search", { title: projectName })
  const data = await response.data;
  
  if (toProjectList == false)
    return data
  else return <ProjectList
                 projects={data.projects}
                 cardClickAction={(id) => { window.location.href = `/projects/${id}` }}
                 cardStyle={"hover:cursor-pointer rounded-lg border-2 border-accent-600 my-1 ms-2 mr-2 hover:bg-accent-600 duration-300 transition-all"}
                />
}