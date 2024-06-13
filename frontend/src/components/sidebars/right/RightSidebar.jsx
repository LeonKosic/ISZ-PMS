import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import api from "../../../api/api";
import CreateProjectButton from "./CreateProjectButton"; // Assuming you have this button component ready

export default function RightSidebar() {
  const [projects, setProjects] = createSignal([]);
  const navigate = useNavigate();

  onMount(async () => {
    const response = await api.get("/projects/my");
    const latestProjects = response.data.slice(-3).reverse(); // Fetch the last 3 projects and reverse to show the latest first
    setProjects(latestProjects);
  });

  const handleProjectClick = (projectId) => {
    window.location.href = `/post/${projectId}`
    setTimeout(() => { location.reload() }, 1000)
  };

  return (
    <div class="fixed right-0 top-20 bottom-5 h-full w-80 bg-primary-600 p-4 shadow-lg rounded-lg m-4 flex flex-col items-center">
      <div class="w-full flex flex-col items-center">
        <div class="mb-4 w-full flex justify-center">
          <CreateProjectButton />
        </div>
        <h2 class="text-xl font-semibold text-gray-50 mb-4 text-center">Recent Projects</h2>
        {projects().length === 0 ? (
          <p class="text-gray-400 text-center">No projects found</p>
        ) : (
          projects().map((project) => (
            <div
              class="bg-primary-400 p-4 mb-4 rounded-lg shadow-md w-full cursor-pointer"
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
            >
              <h3 class="text-lg font-semibold text-gray-50">{project.title}</h3>
              <p class="text-gray-200">{project.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}