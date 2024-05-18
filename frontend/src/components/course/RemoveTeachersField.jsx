import { Button, Input, Stack } from "@suid/material"
import api from "../../api/api"
import { searchUser } from "../../api/searchUser"
import { createResource, createSignal } from "solid-js"
import UserList from "../generic/user/UserList"

export default function RemoveTeachersField(props) {
  const getTeachers = async () => {
    const response = await api.get('/course/teacher', {
      course_id: props.courseID
    })
    
    return await response.data
  }
  
  const removeTeacher = async (teacherID, courseID) => {
    const response = await api.post('/course/teacher/remove', {
      course_id: courseID,
      teacher_id: teacherID
    })
    
    return await response.data;
  }
  
  const [teachers] = createResource(getTeachers)
  
  return (
    <div>
      <center class="text-medium"><p>Remove teachers</p></center>
      
      <Stack direction="column">
        <Show when={teachers.loading == false}>
          <UserList
            style={"max-h-52 overflow-auto hover:cursor-pointer"}
            users={teachers()}
            highlightCard={true}
            highlightColor={"bg-primary-300"}
            cardUseMaxWidth={false}
            cardClickAction={(teacherID) => removeTeacher(teacherID, props.courseID)}
          />
        </Show>
      </Stack>
    </div>   
  )
}