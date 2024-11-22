import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  // Función para disparar notificaciones
  const notify = (type, message, options = {}) => {
    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "warn":
        toast.warn(message, options);
        break;
      case "info":
        toast.info(message, options);
        break;
      default:
        toast(message, options);
        break;
    }
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useNotification = () => {
  return useContext(NotificationContext);
};
