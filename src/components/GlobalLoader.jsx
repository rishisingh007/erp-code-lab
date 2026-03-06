import { Backdrop, CircularProgress } from "@mui/material";
import { useLoading } from "../context/LoadingContext";

export default function GlobalLoader() {

  const { loading } = useLoading();

  return (
    <Backdrop open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}