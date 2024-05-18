import api from "../../api/api";
import UserList from "../generic/user/UserList";

const unenrollUser = async (userID, courseID) => {
  const response = await api.put('/courses/unenroll', {
    user_id: userID,
    course_id: courseID
  })
  
  return await response.data;
}

export default function KickParticipantField(props) {
  return (
    <div>
      <center class="text-medium">Unenroll users</center>
      
      <UserList
        style={"max-h-52 overflow-auto hover:cursor-pointer"}
        users={props.users}
        cardStyle={"underline-offset-2 hover:text-xl pl-2 duration-150 hover:cursor-pointer hover:bg-red-300 rounded-sm"}
        cardClickAction={(userID) => unenrollUser(userID, props.course)}
      />
    </div>
  )
}