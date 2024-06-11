import { Show, createResource } from "solid-js"
import api from "../api/api";
import Loading from "../components/placeholders/Loading";
import CourseList from "../components/generic/course/CourseList";

const getCourses = async () => {
  const response = await api.get(`/course`)
  return response.data
}

export default function Courses(props) {
  const [courses] = createResource(getCourses);

  return (
    <Show
      when={courses.loading == false}
      fallback={<Loading message="Loading courses, please wait..." />}
    >
      <CourseList
        courses={courses()}
        cardStyle={"border-2 border-accent-600 rounded-lg p-4 m-2"}
      />
    </Show>
  )
}