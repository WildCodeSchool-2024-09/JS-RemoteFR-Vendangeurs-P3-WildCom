import { Navigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { Layout } from "../Layout/Layout";

export const AuthUser = () => {
  const { user } = useAuth();

  if (!user || (user?.role !== "user" && user?.role !== "admin")) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <>
      <Layout />
    </>
  );
};
