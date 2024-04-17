import { createTheme } from "@suid/material";

const pmsTheme = createTheme({
  palette: {
    pmsScheme: {
      main: '#e7e2e2',
      light: '#180000',
      dark: '#371a1a',
      contrastText: '#866d6d'
    },
    pmsSchemeFullbright: {
      main: '#e7e2e2',
      light: "#e7e2e2",
      contrastText: "#e7e2e2",
      dark: "#e7e2e2"
    }
  }
})

export default pmsTheme;