import { ThemeProvider } from "@suid/material";
import CourseUnenrollBtn from "../components/course/CourseUnenrollBtn";
import theme from "../styles/suidTheme";

export default function devCourseUnenroll(props) {
  return (
    <ThemeProvider theme={theme}>
      <CourseUnenrollBtn/>  
    </ThemeProvider>
  )
}