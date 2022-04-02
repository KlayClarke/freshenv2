import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Footer from "./components/partials/Footer";
import Nav from "./components/partials/Nav";
import SalonDetail from "./components/salon/SalonDetail";
import SalonList from "./components/salon/SalonList";
import JoinForm from "./components/user/JoinForm";
import LoginForm from "./components/user/LoginForm";

function RouteSwitch() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("freshen_user_data")) {
      setIsLoggedIn(false);
      setUser({});
    }
    setIsLoggedIn(true);
    setUser(JSON.parse(localStorage.getItem("freshen_user_data")));
    console.log("render");
  }, []);

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
