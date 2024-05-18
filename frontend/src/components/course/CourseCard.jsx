export default function CourseCard(props) {  
  return (
    <div class="course-card">
      <p class="title">{props.name}</p>
      <hr class="separator" />
      <p class="about">{props.about}</p>
    </div>
  )
}