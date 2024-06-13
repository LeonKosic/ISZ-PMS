import { useLocation } from "@solidjs/router";
import { projectStore, setProjectStore } from "../api/stores";
import { projectInfo } from "../assets/projectContent";
import Post from "../components/post/Post";
import Project from "./Project";
import { Show, createResource } from "solid-js";
import api from "../api/api";

const getProjectInfo = async (id) => {
  const response = await api.get(`/projects/${id}`)
  return response.data;
}

const getPostInfo = async (id) => {
  const response = await api.get(`/post/${id}`)
  return response.data
}

export default function ProjectPage(props) {
  // demo
  // const data = projectInfo();

  setProjectStore("id", useLocation().pathname.split('/')[2]);
  const postId = useLocation().pathname.split('/')[2];
  const [projectData] = createResource(() => getProjectInfo(projectStore.id));
  const [postData] = createResource(() => getPostInfo(postId));


  return (
    <Show
      when={projectData.loading == false && postData.loading == false}
    >
      {console.log(projectData())}
      {console.log(postData())}

      <Post
        name={postData.name}
        body={postData.body}
        owner_id={postData.owner_id}
      >
        <Project data={projectData} post={postData} />
      </Post>
    </Show>
  )
}