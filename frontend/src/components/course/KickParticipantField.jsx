import api from "../../api/api";
import UserList from "../generic/user/UserList";

const unenrollUser = async (userID, courseID) => {
  const response = await api.put('/course/unenroll', {
    user_id: userID,
    course_id: courseID
  })
  
  return await response.data;
}

export default function KickParticipantField(props) {
  return (
    <div>
      <center class="text-medium">Unenroll users</center>
      
      <div class="max-h-80 overflow-auto">
        <UserList
          cardStyle={"hover:cursor-pointer border-2 border-accent-600 rounded-lg my-2 py-2 text-xl"}
          users={props.users}
          highlightCard={true}
          highlightColor={"bg-primary-300"}
          cardUseMaxWidth={false}
          cardClickAction={(userID) => unenrollUser(userID, props.courseID)}
          
          showRole={true}
          />
      </div>
    </div>
  )
}