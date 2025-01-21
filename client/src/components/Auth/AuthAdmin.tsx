import { Navigate } from "react-router-dom";

import { Layout } from "../Layout/Layout";

export const AuthAdmin = () => {
  const isAdmin = true;

  if (!isAdmin) {
    return <Navigate to={"/user/home"} replace />;
  }

  return (
    <>
      <Layout />
    </>
  );
};
