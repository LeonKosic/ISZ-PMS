import { TextField, Stack, InputBase, ThemeProvider } from "@suid/material";
import { darkColors } from "@suid/material/styles/createPalette";
import theme from "../../styles/suidTheme";

export default function AdminBanUser(props) {
  return (
    <div class="ban-user-ctr">
      <h1 class="ctr-title">Ban user</h1>
      <hr class="my-2 py-2"/>
      
      <Stack spacing={2}>
        <input
          type="text"        
          class="default-form form-big"
          placeholder="Search users..."
        />
      </Stack>
    </div>
  )
}