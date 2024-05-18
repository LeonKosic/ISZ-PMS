import {For} from "solid-js"
import PostCard from "../components/PostCard"

export default function PostList(props){
    const posts = props.data

    return(
        <div class="grid grid-cols-1 gap-3 bg-primary-900 mt-3 h-full">
          <For each={posts}>{(post) =>(
            <PostCard data={post}/>
          )}</For>
        </div>
    )
}