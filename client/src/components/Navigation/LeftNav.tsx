import { NavLink } from "react-router-dom";

import { RxCalendar, RxDashboard, RxHome } from "react-icons/rx";
import { useAuth } from "../../contexts/AuthContext";

export const LeftNav = () => {
  const { user } = useAuth();

  return (
    <nav className="flex lg:justify-center">
      <ul className="space-y-8">
        <li>
          <NavLink
            to="/user/home"
            className={({ isActive }) =>
              `${isActive ? " drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)] text-accent-primary" : "text-text-primary"} flex gap-4 lg:items-center font-text text-xl mt-28 hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]`
            }
          >
            <RxHome className="size-7 text-accent-primary" />
            Accueil
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/user/events"
            className={({ isActive }) =>
              `${isActive ? "drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)] text-accent-primary" : "text-text-primary"} flex gap-4 lg:items-center font-text text-xl hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]`
            }
          >
            <RxCalendar className="size-7 text-accent-primary " />
            Événements
          </NavLink>
        </li>

        <li>
          {user?.role === "admin" && (
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `${isActive ? "drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)] text-accent-primary" : "text-text-primary"} flex gap-4 lg:items-center font-text text-xl hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]`
              }
            >
              <RxDashboard className="size-7 text-accent-primary " />
              Administrateur
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};
