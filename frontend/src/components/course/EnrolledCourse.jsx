export default function EnrolledCourse(props) {
  return (
    <div>
      <p>
        {props.data.name}
      </p>
      <br />
      <p class="text-lg italic">{"About this course..."}</p>
    </div>
  )
}