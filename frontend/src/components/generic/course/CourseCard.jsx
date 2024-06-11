import { Container } from "@suid/material"

export default function CourseCard(props) {  
  return (
    <Container class={props.style} maxWidth="sm">
      <p
        class="text-big mb-2 mt-1 pb-2"
        style={{ 'overflow-wrap': 'break-word' }}
      >
        {props.name}
      </p>
      
      <hr class="separator" />
      
      <p class="italic pb-1 overflow pt-1"
        style={{ 'overflow-wrap': 'break-word' }}
      >
        {props.about}
      </p>
    </Container>
  )
}