
import "./App.css";
import Header from "./components/header/Header.component";
import { Outlet } from "react-router-dom"
import Footer from "./components/header/Footer.jsx";


function App() {
  return (
    <>
      <Header />
      <main>

        <Outlet />

      </main>
      <Footer />
    </>
  );
}

export default App;
