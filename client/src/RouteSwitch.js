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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<SalonList />} />
          <Route path="/explore/salons/:salonid" element={<SalonDetail />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/join" element={<JoinForm />} />
          <Route path="/about" />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default RouteSwitch;
