import { For, Show, createResource } from "solid-js"
import CourseCard from "../components/course/CourseCard";
import api from "../api/api";
import Loading from "../components/placeholders/Loading";

const getCourses = async () => {
  const response = await api.get(`/courses`)
  return await response.json();
}

export default function Courses(props) {
  // const [courses] = createResource(getCourses);
  const courses = [{}, {}, {}, {}]
  
  return (
    <Show
      // when={courses.loading == false}
      when={true}
      fallback={<Loading message="Loading courses, please wait..."/>}
    >
      <div class="courses-list-ctr">
        {/* <For each={courses()}> */}
        <For each={courses}>
        {
          (course) =>
            <a href={`/courses/${course.id}`}>
              <CourseCard
                class="course-card"
                name={course.name}
                id={course.id}
                />
            </a>
        }
      </For>
    </div>
    </Show>
  )
}