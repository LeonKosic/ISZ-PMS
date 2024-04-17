import { Button, Stack, ThemeProvider } from "@suid/material";
import AdminBanUser from "./AdminBanUser";
import AdminUserReq from "./AdminUserReq";
import AdminAddCategory from "./AdminAddCategory";
import AdminDelCategory from "./AdminDelCategory";
import pmsTheme from "../../styles/suidTheme";

export default function AdminPanel(props) {
  return (
    <ThemeProvider theme={pmsTheme}>
      <Stack class="admin-panel">
        <AdminUserReq />
        <AdminBanUser />
        <AdminAddCategory />
        <AdminDelCategory />
      </Stack>
    </ThemeProvider>
  )
}