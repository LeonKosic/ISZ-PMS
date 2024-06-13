import { useLocation } from "@solidjs/router";
import { projectStore, setProjectStore } from "../api/stores";
import { projectInfo } from "../assets/projectContent";
import Post from "../components/post/Post";
import Project from "./Project";

export default function ProjectPage(props) {
  const data = projectInfo()

  setProjectStore("id", useLocation().pathname.split('/')[2]);
  console.log(projectStore.id);

  return (
    <Post
      name={data.name}
      body={data.body}
    >
      <Project data={data} />
    </Post>
  )
}