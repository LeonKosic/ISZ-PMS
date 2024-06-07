import Navbar from "./components/Navbar";
import PMSRouter from "./components/routing/PMSRouter";

import { ThemeProvider } from "@suid/material";
import theme from "./styles/suidTheme"
import "./styles/app.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <PMSRouter />
    </ThemeProvider>
  );
}

export default App;
