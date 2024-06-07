import { projectInfo } from "../assets/projectContent";
import Post from "../components/post/Post";
import Project from "./Project";

export default function ProjectPage(props) {
  const data = projectInfo()

  return (
    <Post
      name={data.name}
      body={data.body}
    >
      <Project data={data} />
    </Post>
  )
}