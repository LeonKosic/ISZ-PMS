import { Stack } from "@suid/material"

export default function ProfileInfo(props) {
  const merged = ({
    username: "?",
    fullname: "?"
  }, props)
  
  return (
    <Stack direction="column" spacing={1}>
      <p>{merged.username}</p>
      <p>{merged.fullname}</p>
    </Stack>
  )
}