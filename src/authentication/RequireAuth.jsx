import React, { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { Navigate, Outlet } from "react-router-dom";
import { instance } from "../apis/AxiosInstance";
import LoaderComponent from "../components/Spinner/LoaderComponent";

export default function RequireAuth() {
  const cookie = Cookie();
  const token = cookie.get("login_token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(
          "http://localhost:8000/api/fournisseurs"
        );

        if (response.data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching fournisseurs:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    const checkTokenValidity = () => {
      fetchData();
    };

    checkTokenValidity();

    const intervalId = setInterval(checkTokenValidity, 20 * 1000);

    return () => clearInterval(intervalId);
  }, [token]);

  if (isLoading) {
    return (<LoaderComponent />);
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace={true} />;
}
