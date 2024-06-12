import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import api from "../api/api";
import CreateProjectRequestButton from "./CreateProjectRequestButton"; 

export default function LeftSidebar() {
  const [courses, setCourses] = createSignal([]);
  const navigate = useNavigate();

  onMount(async () => {
    const response = await api.get("/course/my");
    const latestCourses = response.data; 
    setCourses(latestCourses);
  });

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div class="fixed left-0 top-20 bottom-5 h-full w-80 bg-primary-600 p-4 shadow-lg rounded-lg m-4 flex flex-col items-center">
      <div class="w-full flex flex-col items-center">
        <div class="mb-4 w-full flex justify-center">
          <CreateProjectRequestButton />
        </div>
        <h2 class="text-xl font-semibold text-gray-50 mb-4 text-center">Enrolled Courses</h2>
        {courses().length === 0 ? (
          <p class="text-gray-400 text-center">No courses found</p>
        ) : (
          courses().map((course) => (
            <div 
              class="bg-primary-400 p-4 mb-4 rounded-lg shadow-md w-full cursor-pointer"
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
            >
              <h3 class="text-lg font-semibold text-gray-50">{course.title}</h3>
              <p class="text-gray-200">{course.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
