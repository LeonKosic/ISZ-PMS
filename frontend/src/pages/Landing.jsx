import api from "../api/api";
import PostList from "../components/generic/post/PostList"
import {createResource, onMount} from "solid-js"
import Loading from "../components/placeholders/Loading";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar";
import { useNavigate, redirect } from "@solidjs/router";

async function getPosts() { 
  const response = await api.get("/post/following");
  console.log(response.data)
  return response.data; 
 }

export default function Landing(props) {
  const navigate = useNavigate();

  onMount(() => {
    console.log(localStorage.getItem("token"))
    if (localStorage.getItem("token") == null) {
      navigate("/login")
    }
  })

  const [posts] = createResource(getPosts);
  console.log(posts())

  return (
    <Show
    when={posts.loading == false}
    fallback={<Loading message="Loading posts, please wait..." />}
  >
    <RightSidebar />
    <LeftSidebar />
    <PostList
      data={posts()}
      cardStyle={"border-2 border-accent-600 rounded-lg p-4 m-2"}
    />
  </Show>
  )
}
