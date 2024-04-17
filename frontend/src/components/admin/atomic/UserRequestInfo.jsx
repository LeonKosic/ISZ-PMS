import { Stack } from "@suid/material";
import { mergeProps } from "solid-js";

export default function UserRequestInfo(props) {
  const merged = mergeProps({
    fullname: "<no-fullname>",
    username: "<no-username>",
    email: "<no-email>"
  }, props);
  
  return (
    <div class="user-request">
      <Stack direction="column">
        <p class="fullname-field">
          Full name: {merged.fullname}
        </p>
        
        <p class="username-field">
          Username: {merged.username}
        </p>
        
        <p class="email-field">
          E-mail: {merged.email}
        </p>
      </Stack>
    </div>
  )
}