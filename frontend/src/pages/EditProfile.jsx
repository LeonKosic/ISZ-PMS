import ProfileInfo from "../components/profile/edit/ProfileInfo";
import { Container, Stack } from "@suid/material";
import EditPanel from "../components/profile/edit/EditPanel";
import { userDetails } from "../api/stores";

import LeftSidebar from "../components/sidebars/left/LeftSidebar"
import RightSidebar from "../components/sidebars/right/RightSidebar"

export default function EditProfile(props) {
  return (
    <>
      <LeftSidebar />
      <RightSidebar />
      <Stack class="flex flex-row justify-center items-center py-10 text-xl card mx-auto max-w-screen-md" direction="column" spacing={4}>
        <Container class="border-2 border-accent-600 rounded-lg py-4 text-4xl text-slate-100">
          <ProfileInfo
            username={userDetails.username}
            fullname={userDetails.name}
          />
        </Container>

        <Container class="border-2 border-accent-600 rounded-lg py-4">
          <EditPanel />
        </Container>
      </Stack>
    </>
  )
}