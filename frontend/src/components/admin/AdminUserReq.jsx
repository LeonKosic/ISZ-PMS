import { Button, Stack } from "@suid/material";
import { For, Show, createResource } from "solid-js";
import UserRequestInfo from "./atomic/UserRequestInfo";
import api from "../../api/api";

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

  return (
    // <Show when={newRequests.loading == false}>
    <div class="border-2 subpixel-antialiased ms-8 p-4 rounded-xl h-80 w-full">
      <Stack spacing={2}>
        <h1 class="text-2xl">Pending user requests</h1>
        <hr class="my-2 bg-opacity-100" />

        <Show
          // when={newRequests.loading == false}
          when={true}
          fallback={<p class="italic">Loading user requests...</p>}
        >
          <div class="max-h-56 overflow-y-scroll">
            <For each={newRequests()}>
              {
                (req) => (
                  <div class="flex flex-row items-center justify-center">
                    <div class="mr-4 w-min rounded-md hover:bg-blue-400 transition-all duration-500">
                      <Button
                        variant="outlined"
                        color="pmsScheme"
                        onClick={() => approveRequest(req.id)}
                      >
                        <i class="fa-solid fa-check" />
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
                          <i class="fa-solid fa-xmark" />
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
    // </Show>
  )
}