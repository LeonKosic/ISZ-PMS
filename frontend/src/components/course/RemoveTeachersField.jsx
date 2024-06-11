import { Stack } from "@suid/material"
import UserList from "../generic/user/UserList"

export default function RemoveTeachersField(props) {
  return (
    <div>
      <center class="text-medium"><p>Remove teachers</p></center>
      <Stack direction="column">
        <UserList
          style={"max-h-52 overflow-auto"}
          cardStyle={"hover:cursor-pointer border-2 rounded-full text-lg hover:bg-red-200 duration-300 transition-all"}
          users={props.teachers}
          highlightCard={true}
          highlightColor={"bg-primary-300"}
          cardUseMaxWidth={false}
          cardClickAction={(teacherID) => removeTeacher(teacherID, props.courseID)}
        />
      </Stack>
    </div>
  )
}