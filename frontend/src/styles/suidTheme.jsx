import { createTheme } from "@suid/material";

const theme = createTheme({
  palette: {
    pmsScheme: {
      main: '#e7e2e2',
      light: '#fefefe',
      dark: '#371a1a',
      contrastText: '#fefefe'
    }
  }
})

export default theme;

// import theme from ".../suidTheme.jsx"
// koristiti <ThemeProvider theme={theme}>... (slicno kao kontekst)
// <Button color={theme} />
// ima detaljnije na mui dokumentaciji
