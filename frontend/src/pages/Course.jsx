import { useLocation } from "@solidjs/router";
import api from "../api/api";
import { Show, createResource } from "solid-js";
import Loading from "../components/placeholders/Loading"
import EnrolledCourse from "../components/course/EnrolledCourse";
import UnenrolledCourse from "../components/course/UnenrolledCourse";

import LeftSidebar from "../components/sidebars/left/LeftSidebar"
import RightSidebar from "../components/sidebars/right/RightSidebar"

const courseDetails = async (id) => {
  const response = await api.get(`/course/${id}`)
  return response.data
}

export default function Course(props) {
  const courseID = useLocation().pathname.split("/")[2];
  const [course] = createResource(() => courseDetails(courseID))

  return (
    <>
      <LeftSidebar />
      <RightSidebar />

      <Show
        when={course.loading == false}
        fallback={<Loading message={"Loading course details..."} />}
      >
        <div>
          <Show when={course().isEnrolled == true}>
            {
              console.log(course())
            }
            <EnrolledCourse
              data={course()}
            />
          </Show>

          <Show when={course().isEnrolled == false}>
            <UnenrolledCourse
              data={course()}
            />
          </Show>
        </div>
      </Show>
    </>
  )
}