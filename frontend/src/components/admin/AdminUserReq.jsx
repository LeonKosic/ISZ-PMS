import { Button, Stack } from "@suid/material";
import { For, Show, createResource } from "solid-js";
import UserRequestInfo from "./atomic/UserRequestInfo";
import api from "../../api/api";

// TODO: api endpoints

const fetchRequests = async () => {
  const response = await api.get('/admin/requests')
  return response.data
}

const approveRequest = async (id) => {
  const response = await api.post('/admin/requests/approve', { id: id })
  return response.data
}

const denyRequest = async (id) => {
  const response = await api.post('/admin/requests/deny', { id: id })
  return response.data
}

export default function AdminUserReq(props) {
  const [newRequests] = createResource(fetchRequests);
  const requests = [{}, {}, {}, {}, {}, {}]
  
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
          <div class="request-ctr h-80 overflow-y-scroll">
            <For each={requests}>
              {
                (req) => (
                  <div class="flex flex-row items-center justify-center">
                    <div class="mr-4 w-min rounded-md hover:bg-blue-400 transition-all duration-500">
                      <Button
                        variant="outlined"
                        color="pmsScheme"
                        onClick={() => denyRequest(req.id)}
                        >
                        <i class="fa-solid fa-check"/>
                      </Button>  
                    </div>
                    
                    <UserRequestInfo
                      fullname={"test"}
                      username={"test"}
                      email={"test"}
                      id={""}
                    />
                    
                    <div class="flex flex-row items-center justify-center">
                      <div class="ml-4 w-min rounded-md hover:bg-red-400 transition-all duration-500">
                        <Button
                          variant="outlined"
                          color="pmsScheme"
                          onClick={() => denyRequest(req.id)}
                        >
                          <i class="fa-solid fa-xmark"/>
                        </Button> 
                      </div>
                    </div>
                  </div>
                )
              }
            </For>
              
              <Stack direction="row" spacing={1}>
              </Stack>
          </div>
        </Show>
      </Stack>
    </div>
  )
}