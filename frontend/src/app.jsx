import Navbar from "./components/navbar/Navbar";
import PMSRouter from "./components/routing/PMSRouter";
import { ThemeProvider } from "@suid/material";
import theme from './styles/suidTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <PMSRouter />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
