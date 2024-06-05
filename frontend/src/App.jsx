import "./styles/app.css";
import Navbar from "./components/Navbar";
import PMSRouter from "./components/routing/PMSRouter";
import { ThemeProvider } from "@suid/material";

import theme from "./styles/suidTheme"

function App() {
  return (
    <PMSRouter>
      <Navbar/>
    </PMSRouter>
  );
}

export default App;
