import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.default",
        borderTop: 1,
        borderColor: "divider",
        py: 1.5,
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 Smart ERP. All rights reserved.
      </Typography>
    </Box>
  );
}
