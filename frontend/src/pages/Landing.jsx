import api from "../api/api";
import PostList from "../components/PostList"
import {createResource} from "solid-js"

export default function Landing(props) {

  const posts = createResource(async () => {
    const response = await api.get("/post/following");
    return await response.json();
  });

  return (
      <PostList data={posts}/>
  )
}
