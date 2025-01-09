import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="flex lg:justify-center">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `${isActive ? "text-accent-primary" : "text-text-primary"} flex gap-4 lg:items-center font-text text-2xl pt-28`
        }
      >
        <img src="./src/assets/images/home.png" alt="" className="size-10" />
        Acceuil
      </NavLink>
    </nav>
  );
}

export default Navigation
