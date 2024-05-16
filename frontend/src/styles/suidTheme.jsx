import { createTheme } from "@suid/material";

const theme = createTheme({
  palette: {
    pmsScheme: {
      main: '#e7e2e2',
      light: '#fefefe',
      dark: '#371a1a',
      contrastText: '#fefefe'
    },
    monochrome: {
      main: "#212121",
      light: "#adadad",
      dark: "#181818"
    }
  }
})

export default theme;

// import theme from ".../suidTheme.jsx"
// koristi se ThemeProvider (u vidu konteksta za child elemente)
// <Button color={theme} />
// ima detaljnije na mui dokumentaciji
