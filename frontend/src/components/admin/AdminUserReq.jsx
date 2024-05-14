import { Button, TextField, Stack } from "@suid/material";
import { Show, createResource } from "solid-js";
import UserRequestInfo from "./atomic/UserRequestInfo";
import ApproveRequestBtn from "./atomic/ApproveRequestBtn";
import DenyRequestBtn from "./atomic/DenyRequestBtn";

// TODO: api endpoints

const fetchRequests = async () => {
  const url = `${import.meta.env.VITE_API_HOST}/admin/request`;
  const resource = await fetch(url, { method: "GET"});
  return await resource.json();
}

const approveRequest = async (username) => {
  const url = `${import.meta.env.VITE_API_HOST}/admin/approve`;
  const resource = await fetch(url, { method: "POST", body: { user: username } })
  return await resource.json();
}

const denyRequest = async (username) => {
  const url = `${import.meta.env.VITE_API_HOST}/admin/reject`;
  const resource = await fetch(url, { method: "POST", body: { user: username } })
  return await resource.json();
}

export default function AdminUserReq(props) {
  const [newRequests] = createResource(fetchRequests);
  
  return (
    <div class="user-req-ctr">
      <Stack spacing={2}>
        <h1 class="ctr-title">Pending user requests</h1>
        <hr class="my-2 py-2" />
        
        <Show
          // when={newRequests.loading == false}
          when={true}
          fallback={<p class="italic">Loading user requests...</p>}
        >
          <div class="request-ctr">
              <UserRequestInfo
                fullname={"test"}
                username={"test"}
                email={"test"}
              />
              
              <Stack direction="row" spacing={1}>
                <div onClick={() => approveRequest("test")}>
                  <ApproveRequestBtn />
                </div>
                
                <div onClick={() => denyRequest(request?.username)}>
                  <DenyRequestBtn/>
                </div>
              </Stack>
          </div>
          
          <For each={newRequests()}>
            {
              (request, idx) => 
                <div class="request-ctr">
                  <UserRequestInfo
                    fullname={request?.fullname}
                    username={request?.username}
                    email={request?.email}
                  />
                  
                  <Stack direction="row" spacing={1}>
                    <div onClick={() => approveRequest(request?.username)}>
                      <ApproveRequestBtn />
                    </div>
                    
                    <div onClick={() => denyRequest(request?.username)}>
                      <DenyRequestBtn/>
                    </div>
                  </Stack>
                </div>
            }
          </For>
        </Show>
      </Stack>
    </div>
  )
}