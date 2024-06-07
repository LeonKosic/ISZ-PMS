import { Alert } from "@suid/material"

export const logoutAlert = (success) => {
  success ? alert("Successfully logged out.") : alert("Already logged out.");
}
