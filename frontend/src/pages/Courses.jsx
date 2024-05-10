import { Show, createResource } from "solid-js"
import CourseCard from "../components/course/CourseCard";

const getCourses = async (username) => {
  // fetches courses accessible by user
  const url = `${import.meta.env.VITE_API_HOST}/courses?user_name=${username}`
  const response = await fetch(url, { method: "GET" })
  return await response.json();
}

export default function Courses(props) {
  // TODO: role context
  // TODO: fetch username from JWT (rework login)
  const username = "test_username"
  const [courses] = createResource(async () => getCourses(username));
  
  // TODO: use courses instead of this test sample
  const courseList = [{id: '2422'}, {}, {}, {}, {}]
  
  return (
    <>
      <Show
        when={courses.loading}
        // fallback={<h1 class="loading-placeholder">Loading courses...</h1>}
      >
        {/* TODO: implement when endpoint starts working */}
      </Show>
      
      <div class="courses-list-ctr">
        <For each={courseList}>
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
    </>
  )
}