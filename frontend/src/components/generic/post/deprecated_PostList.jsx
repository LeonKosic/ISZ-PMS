import PostCard from "./PostCard";
import { Container } from "@suid/material"

export default function PostList(props) {
  return (
    <Container class={props?.style}>
      <For each={props?.posts}>
        {
          (post) =>
          <PostCard
            title={post.title}
            postedBy={post.postedBy}
            content={post.content}
            style={props.cardStyle}  
          />
        }
      </For>
    </Container>
  )
}