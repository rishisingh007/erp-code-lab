import { Routes, Route } from "react-router-dom";
import MasterLayout from "./layouts/MasterLayout";
import Dashboard from "./pages/Dashboard";
// import Vendors from "./pages/Vendors";
import Customers from "./pages/Customers";
import Invoices from "./pages/accounts/invoice/Invoices";
import VendorPage from "./pages/entities/VendorPage";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vendors" element={<VendorPage />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}