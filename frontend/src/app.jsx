import "./styles/app.css";
import NavBar from "./components/NavBar";
import PMSRouter from "./components/routing/PMSRouter";
import 'dotenv/config';

export default function App() {
  return (
    <>
      <NavBar/>
      <PMSRouter />
    </>
  );
}
