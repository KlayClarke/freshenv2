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
import ScrollToTop from "./components/utils/ScrollToTop";
import SalonCreateForm from "./components/salon/SalonCreateForm";

function RouteSwitch() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (localStorage.getItem("freshen_user_data")) {
      const userID = JSON.parse(localStorage.getItem("freshen_user_data"))[
        "id"
      ];
      const userToken = JSON.parse(localStorage.getItem("freshen_user_data"))[
        "token"
      ];
      axios
        .get("http://localhost:9000/users/" + userID, { signal })
        .then((response) => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
          setUser({
            id: userID,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            password: response.data.password,
            token: userToken,
          });
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
      <ScrollToTop>
        <main>
          <Routes>
            <Route path="/" element={<Home user={user} loading={loading} />} />
            <Route path="/salons" element={<SalonList user={user} />} />
            <Route
              path="/salons/create"
              element={
                user ? (
                  <SalonCreateForm user={user} />
                ) : (
                  <Navigate replace to={"/salons"} />
                )
              }
            />
            <Route
              path="/salons/:salonid"
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
      </ScrollToTop>
      <Footer loading={loading} />
    </BrowserRouter>
  );
}

export default RouteSwitch;
