import { Button, Stack } from "@suid/material";
import { Show, createSignal } from "solid-js";
import api from "../../../api/api";
import { userDetails } from "../../../api/stores";

export default function EditFullnameField(props) {
  const [result, setResult] = createSignal({ processed: false, statusCode: 999, message: "" })
  const getInput = () => document.querySelector("#fullnameTF").value

  const submit = async () => {
    const response = await api.put('/users/edit', { name: getInput() })
    setResult({
      processed: true,
      statusCode: response.status,
      message: response.statusText
    })
  }

  return (
    <div class="fullname-field">
      <p class="py-2 pl-1">Full name</p>

      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <input
            id="fullnameTF"
            variant="standard"
            placeholder={userDetails.name}
            class="rounded-lg bg-accent-300 bg-opacity-10 w-full ps-2 text-slate-200 text-lg"
          />

          <Button
            class="rounded-xl h-auto"
            variant="outlined"
            color="pmsScheme"
            onClick={() => { submit() }}
          >
            Submit
          </Button>
        </Stack>

        <Show when={result().processed}>
          <div class="flex flex-row items-center justify-center ps-4 mx-auto">
            <p class={`${result().statusCode < 400 ? "" : "text-red-400 "} italic`}>
              {result().message} ({result().statusCode})
            </p>
          </div>
        </Show>
      </Stack>
    </div>
  )
}