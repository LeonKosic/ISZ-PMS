import { useLocation } from "@solidjs/router";
import api from "../api/api";

const courseDetails = async (id) => {
  const response = await api.get(`/course/${id}`)
  return response.data
}

export default function Course(props) {
  const courseID = useLocation().pathname.split("/")[2];
  if (isEnrolled(courseID) == true)
    return (<EnrolledCourse />)
  else return (<UnenrolledCourse />)
}