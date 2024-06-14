import { createResource, Suspense } from "solid-js";
import ProjectList from "../components/generic/ProjectList";
import api from "../api/api";
import Loading from "../components/placeholders/Loading";
import RightSidebar from "../components/sidebars/right/RightSidebar";
import LeftSidebar from "../components/sidebars/left/LeftSidebar";

export default function Projects(props) {
  const [projects] = createResource(async () => {
    const myProjects = (await api.get('/projects/my')).data
    const followingProjects = (await api.get('/projects/following')).data

    return [...myProjects, ...followingProjects]
  })

  return (
    <div class="pt-10 pb-5">
      {/* <div class="flex flex-auto items-center justify-center">
        <Button
          color="pmsScheme"
          variant="outlined"
          onClick={() => { window.location.href = `/project/create`; }}
        >
          Create Project
        </Button>
      </div> */}

      <Suspense fallback={<Loading message={"Loading projects, please wait..."} />}>
        {
          console.log(projects())
        }
        <RightSidebar />
        <LeftSidebar />
        <div class="w-2/5 mx-auto">
          <ProjectList
            projects={projects()}
            cardClickAction={(id) => { window.location.href = `/project/${id}` }}
            cardStyle={"hover:cursor-pointer rounded-lg border-2 border-accent-600 my-1 ms-2 mr-2 hover:bg-accent-600 duration-300 transition-all w-full"}
          />
        </div>
      </Suspense>
    </div>
  )
}