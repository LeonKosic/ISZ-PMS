import { Button, TextField, Stack } from "@suid/material";
import { Show, createResource } from "solid-js";
import UserRequestInfo from "./atomic/UserRequestInfo";

const fetchRequests = async () => {
  const url = `${import.meta.env.VITE_API_HOST}/users/requests`;
  const resource = await fetch(url);
  return await resource.json();
}

export default function AdminUserReq(props) {
  const [newRequests] = createResource(fetchRequests);
  
  
  return (
    <div class="user-req-ctr">
      <Stack spacing={2}>
        <h1 class="ctr-title">Pending user requests</h1>
        <hr class="my-1" />
        
        <Show
          when={newRequests.loading == false}
          fallback={<p class="italic">Loading user requests...</p>}
        >   
          <UserRequestInfo/>
          <Button variant="outlined"
            class="w-1/5"
            color="pmsScheme"
          >
            Approve
          </Button>
          
          {/* TODO: Fix initial style state (from dark to bright) */}
          <TextField
            id="standard-small"
            label="Search users..."
            variant="outlined"
            size="small"
            color="pmsSchemeFullbright"
            />
        </Show>
      </Stack>
    </div>
  )
}