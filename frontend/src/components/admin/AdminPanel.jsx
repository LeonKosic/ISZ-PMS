import { Stack, ThemeProvider } from "@suid/material";

import theme from "../../styles/suidTheme";
import AdminBanUser from "./AdminBanUser";
import AdminUserReq from "./AdminUserReq";
import AdminAddCategory from "./AdminAddCategory";
import AdminDelCategory from "./AdminDelCategory";

export default function AdminPanel() {
  return (
    <div>
      <div class="max-w-screen-2xl mx-auto flex flex-auto gap-10 items-center justify-center py-10">
        <div class="flex flex-col gap-10 m-4">
          <div class="flex flex-row justify-around w-full">
            <AdminUserReq />
            <AdminBanUser />
          </div>

          <div class="flex flex-col items-center w-full">
            <AdminAddCategory />
            <AdminDelCategory />
          </div>
        </div>
      </div>
    </div>
  )
}