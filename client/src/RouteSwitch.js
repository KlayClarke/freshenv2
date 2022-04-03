import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Footer from "./components/partials/Footer";
import Nav from "./components/partials/Nav";
import SalonDetail from "./components/salon/SalonDetail";
import SalonList from "./components/salon/SalonList";
import JoinForm from "./components/user/JoinForm";
import LoginForm from "./components/user/LoginForm";

function RouteSwitch() {
  const [token, setToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("freshen_user_data")) {
      setIsLoggedIn(false);
      setUser({});
    }

    // uncomment code below to simulate loggedin user

    localStorage.setItem(
      "freshen_user_data",
      JSON.stringify({
        token: "",
        id: "",
        first_name: "Klay",
        last_name: "Clarke",
      })
    );

    setIsLoggedIn(true);
    setUser(JSON.parse(localStorage.getItem("freshen_user_data")));
    console.log("render");
    console.log(user);
  }, []);

  return (
    <BrowserRouter>
      <Nav isLoggedIn={isLoggedIn} />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home isLoggedIn={isLoggedIn} user={user} />}
          />
          <Route path="/explore" element={<SalonList />} />
          <Route path="/explore/salons/:salonid" element={<SalonDetail />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate replace to={"/"} /> : <LoginForm />}
          />
          <Route
            path="/join"
            element={isLoggedIn ? <Navigate replace to={"/"} /> : <JoinForm />}
          />
          <Route path="/about" />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default RouteSwitch;
