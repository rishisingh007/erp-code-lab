import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";

export default function MasterLayout() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Header />

      {/* Main content area */}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <Box sx={{ display: "flex", height: "100%" }}>
          <Sidebar />
        </Box>

        {/* Main section */}
        <Box component="main" sx={{ flex: 1, overflowY: "auto", p: 3, bgcolor: "background.paper" }}>
          <Breadcrumb />
          <Box sx={{ mt: 2 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
