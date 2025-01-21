import { Navigate } from "react-router-dom";

import { Layout } from "../Layout/Layout";

export const AuthUser = () => {
  const isAuth = true;

  if (!isAuth) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <>
      <Layout />
    </>
  );
};
