import { NavLink } from "react-router-dom";

import { RxCalendar, RxDashboard, RxHome } from "react-icons/rx";

export const LeftNav = () => {
  return (
    <nav className="flex lg:justify-center">
      <ul className="space-y-8">
        <li>
          <NavLink
            to="/user/home"
            className={({ isActive }) =>
              `${isActive ? "text-accent-primary" : "text-text-primary"} flex gap-4 lg:items-center font-text text-xl mt-28 hover:text-accent-primary`
            }
          >
            <RxHome className="size-7 text-accent-primary" />
            Acceuil
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/user/events"
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
            to="/admin/dashboard"
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
};
