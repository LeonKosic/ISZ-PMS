import { mergeProps } from "solid-js";

export default function CourseCard(props) {
  const merged = mergeProps({
    name: "name_placeholder",
    id: "2251"
  }, props)
  
  return (
    <div class="course-card">
      <h1 class="title">{merged.name}</h1>
      <hr class="separator"/>
      <p class="course-id">{merged.id}</p>
    </div>
  )
}