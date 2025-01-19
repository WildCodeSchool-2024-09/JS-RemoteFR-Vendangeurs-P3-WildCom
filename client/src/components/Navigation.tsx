import { RxCalendar, RxDashboard, RxHome } from "react-icons/rx";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="flex lg:justify-center">
      <ul className="space-y-4">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `${isActive ? "text-accent-primary" : "text-text-primary"} flex gap-4 lg:items-center font-text text-xl pt-28 hover:text-accent-primary`
            }
          >
            <RxHome className="size-7 text-accent-primary" />
            Acceuil
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/events"}
            className={({ isActive }) =>
              `${isActive ? "text-accent-primary" : "text-text-primary"} flex gap-4 lg:items-center font-text text-xl hover:text-accent-primary`
            }
          >
            <RxCalendar className="size-7 text-accent-primary" />
            Événements
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/admin"}
            className={({ isActive }) =>
              `${isActive ? "text-accent-primary" : "text-text-primary"} flex gap-4 lg:items-center font-text text-xl hover:text-accent-primary`
            }
          >
            <RxDashboard className="size-7 text-accent-primary" />
            Administrateur
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
