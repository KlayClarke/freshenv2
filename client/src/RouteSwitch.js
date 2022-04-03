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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (localStorage.getItem("freshen_user_data")) {
      const userId = JSON.parse(localStorage.getItem("freshen_user_data"))[
        "id"
      ];
      axios
        .get("http://localhost:9000/users/" + userId, { signal })
        .then((response) => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
          setUser(response.data);
        })
        .catch((err) => {
          new Error(err);
        });
      return () => controller.abort;
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Nav user={user} loading={loading} />
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} loading={loading} />} />
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
          <Route path="/about" user={user} loading={loading} />
        </Routes>
      </main>
      <Footer loading={loading} />
    </BrowserRouter>
  );
}

export default RouteSwitch;
