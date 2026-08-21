import { HashRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Contact from "./pages/Contact";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/registracija" element={<Signup />} />
        <Route path="/prijava" element={<Login />} />
        <Route path="/kontakt" element={<Contact />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
