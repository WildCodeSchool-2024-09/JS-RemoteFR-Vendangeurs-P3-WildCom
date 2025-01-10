import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="flex lg:justify-center">
      <ul className="space-y-4">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `${isActive ? "text-accent-primary" : "text-text-primary"} flex gap-4 lg:items-center font-text text-2xl pt-28 hover:text-accent-primary`
            }
          >
            <img
              src="./src/assets/images/home.png"
              alt=""
              className="size-10"
            />
            Acceuil
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/events"}
            className={({ isActive }) =>
              `${isActive ? "text-accent-primary" : "text-text-primary"} flex gap-4 lg:items-center font-text text-2xl hover:text-accent-primary`
            }
          >
            <img
              src="./src/assets/images/calendar.png"
              alt=""
              className="size-10"
            />
            Évènements
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/admin"}
            className={({ isActive }) =>
              `${isActive ? "text-accent-primary" : "text-text-primary"} flex gap-4 lg:items-center font-text text-2xl hover:text-accent-primary`
            }
          >
            <img
              src="./src/assets/images/admin.png"
              alt=""
              className="size-10"
            />
            Administrateur
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
