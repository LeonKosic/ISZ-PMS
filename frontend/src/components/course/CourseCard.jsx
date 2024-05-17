export default function CourseCard(props) {  
  return (
    <div class="course-card">
      <h1 class="title">{props.name}</h1>
      <hr class="separator" />
      <p class="">{props.about}</p>
    </div>
  )
}