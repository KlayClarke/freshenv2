import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/partials/Footer";
import Nav from "./components/partials/Nav";
import SalonDetail from "./components/salon/SalonDetail";
import SalonList from "./components/salon/SalonList";
import JoinForm from "./components/user/JoinForm";
import LoginForm from "./components/user/LoginForm";

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <div className="main-content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/salons" element={<SalonList />} />
            <Route path="/salons/:salonid" element={<SalonDetail />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/join" element={<JoinForm />} />
            <Route path="/about" />
          </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default RouteSwitch;
