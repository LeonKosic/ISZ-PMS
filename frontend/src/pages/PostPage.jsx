import Post from "../components/post/Post";
import { Show, createResource } from "solid-js";
import preprocessor from "../api/preprocessor";
import { useLocation } from "@solidjs/router";
import Loading from "../components/placeholders/Loading";
import RightSidebar from "../components/sidebars/right/RightSidebar";
import LeftSidebar from "../components/sidebars/left/LeftSidebar";

export default function PostPage(props) {
  const postID = useLocation().pathname.split('/')[2]
  const [post] = createResource(() => preprocessor.post.details(postID));

  return (
    <Show
      when={post.loading == false}
      fallback={Loading}
    >
      <RightSidebar />
      <LeftSidebar />
      <Post
        id={post().id}
        name={post().title}
        owner_id={post().owner_id}
        body={post().body}
        comments={post().comments}
      />
    </Show>
  )
}