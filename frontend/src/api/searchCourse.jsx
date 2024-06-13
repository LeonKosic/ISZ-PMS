import CourseList from "../components/generic/course/CourseList";
import api from "./api"

export const searchCourse = async (courseName, toCourseList = false) => {
  const response = await api.post("/courses/search", { name: courseName })
  const data = await response.data;
  
  if (toCourseList == false)
    return data
  else return <CourseList 
                    courses={data.courses}
                    cardClickAction={(id) => { window.location.href = `/courses/${id}` }}
                    cardStyle={"hover:cursor-pointer rounded-lg border-2 border-accent-600 my-1 ms-2 mr-2 hover:bg-accent-600 duration-300 transition-all"}
                 />
}