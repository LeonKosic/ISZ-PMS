export default function EnrolledCourse(props) {
  return (
    <div>
      {props.data.name}
      <br />
      <p class="text-lg italic">{"About this course..."}</p>
    </div>
  )
}