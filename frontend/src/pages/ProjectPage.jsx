import { useLocation } from "@solidjs/router";
import { projectStore, setProjectStore } from "../api/stores";
import { projectInfo } from "../assets/projectContent";
import Post from "../components/post/Post";
import Project from "./Project";
import { Show, createResource } from "solid-js";

const getProjectInfo = async (id) => {
  const response = await api.get(`/projects/${id}`)
  return response.data;
}

export default function ProjectPage(props) {
  // demo
  const data = projectInfo();

  setProjectStore("id", useLocation().pathname.split('/')[2]);
  // const data = createResource(() => getProjectInfo(projectStore.id));
  console.log(data)

  return (
    <Show when={data.loading == false}>
      <Post
        name={data.name}
        body={data.body}
      >
        <Project data={data} />
      </Post>
    </Show>
  )
}