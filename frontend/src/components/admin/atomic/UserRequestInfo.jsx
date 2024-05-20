import { Stack } from "@suid/material";
import { mergeProps } from "solid-js";
import UserCard from "../../generic/user/UserCard";

export default function UserRequestInfo(props) {
  const merged = mergeProps({
    id: "-1",
    username: "<no-username>",
    name: "<no-fullname>",
    email: "<no-email>",
    role: "<no-role>"
  }, props);
  
  return (
    <div class="flex flex-row items-center justify-center py-2">
      <UserCard
        userid={merged.id}
        name={merged.name}
        username={merged.username}
        role={merged.role}
        
        showRole={true}
        showUsername={true}
        cardStyle={"border-2 border-accent-600 rounded-lg w-80 h-20 flex flex-row justify-around text-md"}
        />
    </div>
  )
}