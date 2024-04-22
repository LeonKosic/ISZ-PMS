import { Stack, ThemeProvider } from "@suid/material";

import theme from "../../styles/suidTheme";
import AdminBanUser from "./AdminBanUser";
import AdminUserReq from "./AdminUserReq";
import AdminAddCategory from "./AdminAddCategory";
import AdminDelCategory from "./AdminDelCategory";

export default function AdminPanel() {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="column" class="admin-panel">
        <AdminUserReq />
        <AdminBanUser />
        <AdminAddCategory />
        <AdminDelCategory/>
      </Stack>
    </ThemeProvider>
  )
}