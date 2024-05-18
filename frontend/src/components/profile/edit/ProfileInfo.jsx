import { Stack } from "@suid/material"

export default function ProfileInfo(props) {  
  return (
    <Stack direction="column" spacing={1} class="items-center justify-center">
      <p class="pb-2">{props.username}</p>
      <hr class="w-5/6"/>
      <p class="text-3xl italic">{props.fullname}</p>
    </Stack>
  )
}