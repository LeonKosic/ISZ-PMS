import { Container } from "@suid/material"

export default function PostCard(props) {
  const displayComments = () => {
    // TODO 
  } 
  
  return (
    <Container class={props.style}>
    {/* <Container class="rounded-lg border-2"> */}
      <p class="mt-2 text-medium">{props.title}</p>
      <p>{props.content}</p>
      <center><p class="mb-2 italic text-small"> {props.postedBy}</p></center>
      <hr class="w-full mx-auto opacity-75 m-2" />
      <center onClick={displayComments}><p class="mb-2 italic text-small">View comments</p></center>
    </Container>
  )
}