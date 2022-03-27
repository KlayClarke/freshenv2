import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import SalonDetail from "./components/salon/SalonDetail";
import SalonList from "./components/salon/SalonList";

function RouteSwitch() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default RouteSwitch;
