import { ThemeProvider } from "@suid/material";

import pmsTheme from "../../styles/suidTheme";
import AdminBanUser from "./AdminBanUser";
import AdminUserReq from "./AdminUserReq";
import AdminAddCategory from "./AdminAddCategory";
import AdminDelCategory from "./AdminDelCategory";

export default function AdminPanel() {
  return (
    <ThemeProvider theme={pmsTheme}>
      <AdminUserReq />
      <AdminBanUser />
      <AdminAddCategory />
      <AdminDelCategory/>
    </ThemeProvider>
  )
}