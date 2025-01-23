import { Navigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { Layout } from "../Layout/Layout";

export const AuthUser = () => {
  const { user } = useAuth();

  if (user?.role !== "user" && user?.role !== "admin") {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <>
      <Layout />
    </>
  );
};
