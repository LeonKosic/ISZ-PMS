import api from "../api/api";
import PostList from "../components/generic/post/PostList"
import {createResource} from "solid-js"

const getPosts = async () => {
  const response = await api.get(`/post/following`)
  return await response.data;
}


export default function Landing(props) {
  const posts = getPosts()

  return (
      <PostList data={posts}/>
  )
}
