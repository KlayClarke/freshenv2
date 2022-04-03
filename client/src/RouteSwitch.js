import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./components/Home";
import Footer from "./components/partials/Footer";
import Nav from "./components/partials/Nav";
import SalonDetail from "./components/salon/SalonDetail";
import SalonList from "./components/salon/SalonList";
import JoinForm from "./components/user/JoinForm";
import LoginForm from "./components/user/LoginForm";

function RouteSwitch() {
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchUserInformation(id) {
      const response = await axios.get("http://localhost:9000/users/" + id);
      console.log(response.data);
      setUser(response.data);
    }
    if (localStorage.getItem("freshen_user_data")) {
      const userId = JSON.parse(localStorage.getItem("freshen_user_data"))[
        "id"
      ];
      fetchUserInformation(userId);
    } else {
      setUser();
    }
  }, []);

  return (
    <BrowserRouter>
      <Nav user={user} />
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/explore" element={<SalonList user={user} />} />
          <Route
            path="/explore/salons/:salonid"
            element={<SalonDetail user={user} />}
          />
          <Route
            path="/login"
            element={user ? <Navigate replace to={"/"} /> : <LoginForm />}
          />
          <Route
            path="/join"
            element={user ? <Navigate replace to={"/"} /> : <JoinForm />}
          />
          <Route path="/about" user={user} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default RouteSwitch;
