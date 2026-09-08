import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Saloni from "./pages/Saloni";
import SalonDetail from "./pages/SalonDetail";
import AdminSaloni from "./pages/AdminSaloni";
import AdminOdobravanje from "./pages/AdminOdobravanje";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/saloni" element={<Saloni />} />
          <Route path="/saloni/:id" element={<SalonDetail />} />
          <Route path="/admin/saloni" element={<AdminSaloni />} />
          <Route path="/admin/odobravanje" element={<AdminOdobravanje />} />
          <Route path="/registracija" element={<Signup />} />
          <Route path="/prijava" element={<Login />} />
          <Route path="/zaboravljena-lozinka" element={<ForgotPassword />} />
          <Route path="/reset-lozinke" element={<ResetPassword />} />
          <Route path="/kontakt" element={<Contact />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
