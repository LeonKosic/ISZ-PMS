import { Show, createResource } from "solid-js";
import api from "../../../api/api";

export default function PostDetails(props) {
  const [postDetails] = createResource(async () => (await api.get(`/post/${props.id}`)).data)
  
  return (
    <Show when={postDetails.loading == false}>
      {/* Header (title) */}
      <p class="text-2xl">{postDetails().id}</p>
      
      {/* About (body, whatever) */}
      <p class="text-lg">{postDetails().body}</p>
      
      {/* Comments */}
      <p class="text-lg">Comments</p>
      <PostComments data={postDetails().comments}/>
      
      {/* Nested components */}
      {props.children}
    </Show>
  )
}