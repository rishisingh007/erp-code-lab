import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {

  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, severity = "info") => {
    setNotification({ message, severity });
  }, []);

  const showError = (message) => showNotification(message, "error");
  const showSuccess = (message) => showNotification(message, "success");
  const showWarning = (message) => showNotification(message, "warning");
  const showInfo = (message) => showNotification(message, "info");

  const handleClose = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showError,
        showSuccess,
        showWarning,
        showInfo,
      }}
    >
      {children}

      <Snackbar
        open={!!notification}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {notification && (
          <Alert
            severity={notification.severity}
            variant="filled"
            onClose={handleClose}
          >
            {notification.message}
          </Alert>
        )}
      </Snackbar>
    </NotificationContext.Provider>
  );
}