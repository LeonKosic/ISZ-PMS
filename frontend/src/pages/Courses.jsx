import { Show, createResource } from "solid-js"
import api from "../api/api";
import Loading from "../components/placeholders/Loading";
import CourseList from "../components/course/CourseList";

const getCourses = async () => {
  const response = await api.get(`/courses/my`)
  return await response.json();
}

export default function Courses(props) {
  const [courses] = createResource(getCourses);
  
  return (
    <Show
      when={courses.loading == false}
      fallback={<Loading message="Loading courses, please wait..."/>}
    >
      <CourseList courses={courses()} />
    </Show>
  )
}