import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import logo from "../assets/images/logo.png";

export default function Header() {
  return (
    <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: "background.paper" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box component="img" src={logo} alt="Logo" sx={{ width: 32, height: 32 }} />
          <Typography variant="h6" fontWeight={600}>
            Smart ERP
          </Typography>
        </Box>
        <Button variant="text" color="primary" size="small">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
