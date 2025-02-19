import { Outlet } from "react-router-dom";

export const MainContent = () => {
  return (
    <main className="mx-auto my-5 lg:w-1/2 lg:my-10">
      <Outlet />
    </main>
  );
};
