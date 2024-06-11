import { For } from "solid-js"
import PostCard from "./PostCard"

export default function PostList(props) {
  return (
    <div class="grid grid-cols-1 gap-3 mt-3 h-full">
      <For each={props.data}>
        {
          (post) => {
            console.log(post)

            return (<PostCard
              data={post}
              owner_id={post.owner_id}
            />)
          }
        }
      </For>
    </div>
  )
}