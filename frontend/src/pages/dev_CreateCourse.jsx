import { ThemeProvider } from "@suid/material";
import CreateCourseModal from "../components/course/CreateCourseModal";
import theme from "../styles/suidTheme"
export default function devCreateCourse() {
  return (
    
    <ThemeProvider theme={theme}>
      <CreateCourseModal/>
    </ThemeProvider>
  )
}