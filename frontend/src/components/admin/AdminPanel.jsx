import { Stack, ThemeProvider } from "@suid/material";

import theme from "../../styles/suidTheme";
import AdminBanUser from "./AdminBanUser";
import AdminUserReq from "./AdminUserReq";
import AdminAddCategory from "./AdminAddCategory";
import AdminDelCategory from "./AdminDelCategory";

export default function AdminPanel() {
  return (
    <ThemeProvider theme={theme}>
      <div class="max-w-screen-2xl mx-auto">
        <Stack direction="column" class="admin-panel">
          <div class="flex flex-row justify-around w-full">
            <AdminUserReq />
            <AdminBanUser />
          </div>
          
          <div class="flex flex-col items-center w-full">
            <AdminAddCategory />
            <AdminDelCategory/>
          </div>
        </Stack>
      </div>
    </ThemeProvider>
  )
}