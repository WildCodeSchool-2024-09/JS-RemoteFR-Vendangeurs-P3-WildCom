import { Outlet } from "react-router-dom";

export const MainContent = () => {
  return (
    <main className="mx-auto my-10 lg:w-1/2">
      <Outlet />
    </main>
  );
};
