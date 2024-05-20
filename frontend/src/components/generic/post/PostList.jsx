import {For} from "solid-js"
import PostCard from "./PostCard"

export default function PostList(props){
  return (
    <div class="grid grid-cols-1 gap-3 bg-primary-900 mt-3 h-full">
      <For each={props.data}>
        {
          (post) => (<PostCard data={post} />)
        }
      </For>
    </div>
  )
}