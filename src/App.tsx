import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Saloni from "./pages/Saloni";
import AdminSaloni from "./pages/AdminSaloni";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/saloni" element={<Saloni />} />
          <Route path="/admin/saloni" element={<AdminSaloni />} />
          <Route path="/registracija" element={<Signup />} />
          <Route path="/prijava" element={<Login />} />
          <Route path="/kontakt" element={<Contact />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
