import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Footer from "./components/partials/Footer";
import Nav from "./components/partials/Nav";
import SalonDetail from "./components/salon/SalonDetail";
import SalonList from "./components/salon/SalonList";

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/salons" element={<SalonList />} />
        <Route path="/salons/:salonid" element={<SalonDetail />} />
        <Route />
        <Route />
        <Route />
        <Route />
        <Route />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default RouteSwitch;
