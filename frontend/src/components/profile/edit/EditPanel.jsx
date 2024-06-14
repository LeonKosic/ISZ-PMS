import { userDetails } from "../../../api/stores";
import EditFullnameField from "./EditFullnameField";
import EditUsernameField from "./EditUsernameField";
import EditPasswordField from "./EditPasswordField";
import { Stack } from "@suid/material";

export default function EditPanel(props) {
  return (
    <Stack direction="column" gap={1}>
      <span class="flex flex-row items-center justify-center text-2xl"><p>Your profile</p></span>
      <EditFullnameField fullname={userDetails.name} />
      <hr class="mt-2 mb-1 w-full border-accent-600 border-2"/>
      <EditUsernameField username={userDetails.username} />
      <hr class="mt-2 mb-1 w-full border-accent-600 border-2"/>
      <EditPasswordField />
    </Stack>
  )
}