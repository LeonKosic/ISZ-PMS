import { For } from "solid-js";
import CommentCard from "./CommentCard";

export default function PostComments(props) {
  const comments = props.data;

  return (
    // Comments
    <div class="">
      <For each={comments}>
        {
          (comment) => <CommentCard data={comment} />
        }
      </For>
    </div>
  )
}