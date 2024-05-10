import { createResource, createSignal } from "solid-js";
import ProfileInfo from "../components/profile/edit/ProfileInfo";
import EditUsernameField from "../components/profile/edit/EditUsernameField";
import EditFullnameField from "../components/profile/edit/EditFullnameField";
import EditPasswordField from "../components/profile/edit/EditPasswordField";
import { Stack, ThemeProvider } from "@suid/material";
import { jwtDecode } from "jwt-decode";

import theme from "../styles/suidTheme";

const getCookie = () => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('jwt='))
    .split('=')[1];
  
  const decodedToken = jwtDecode(token);
  
  return { username: decodedToken.user.user_name }; // TODO: username ili user_name?
}

const getUserInfo = async (name) => {
  const url = `${import.meta.env.VITE_API_HOST}/users/details?user_name=${name}`
  const response = await fetch(url, { method: "GET" })
  return await response.json();
}

export default function EditProfile(props) {
  const [user, setUser] = createSignal({
    username: "test-username",
    fullname: "test-fullname"
  });
  
  const [loaded, setLoaded] = createSignal(false)
  // TODO
  // setUser(getUserInfo(getCookie().username));
  setLoaded(true)
  
  return (
    <ThemeProvider theme={theme}>
      <Show when={loaded() == true} placeholder={<h1 class="italic">Loading your information...</h1>}>
        <div class="edit-profile-ctr">
            
          <div class="profile-info">
            {/* current info */}
            <ProfileInfo
              username={user().username}
              fullname={user().fullname}
              />
          </div>
          
          <div class="edit-panel">
            <Stack direction="column" spacing={3}>
              <EditUsernameField username={user()?.username} />
              <EditPasswordField />
              <EditFullnameField fullname={user()?.fullname} />
            </Stack>
          </div>
        </div>
      </Show>
    </ThemeProvider>
  )
}