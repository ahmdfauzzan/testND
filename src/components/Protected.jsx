import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Protected = ({ children }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    if (!accessToken) {
      toast.warn("Anda belum login!", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: false,
      });
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [accessToken]);

  if (!accessToken && shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  if (!accessToken) {
    return null;
  }

  return children;
};

export default Protected;
