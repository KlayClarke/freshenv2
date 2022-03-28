import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/partials/Footer";
import Nav from "./components/partials/Nav";
import SalonDetail from "./components/salon/SalonDetail";
import SalonList from "./components/salon/SalonList";

function RouteSwitch() {
  return (
    <BrowserRouter>
      <div id="page-container">
        <Nav />
        <main>
          <div id="main-content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/salons" element={<SalonList />} />
              <Route path="/salons/:salonid" element={<SalonDetail />} />
              <Route path="/login" />
              <Route path="/join" />
              <Route path="/about" />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default RouteSwitch;
