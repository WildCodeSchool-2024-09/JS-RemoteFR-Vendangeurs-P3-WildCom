import { Navigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { Layout } from "../Layout/Layout";

export const AuthAdmin = () => {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <Navigate to={"/user/home"} replace />;
  }

  return (
    <>
      <Layout />
    </>
  );
};
