import { NavLink } from "react-router-dom";

import { FaRegUser } from "react-icons/fa";

import type { LocationProps } from "../../types/type";

import { useAuth } from "../../contexts/AuthContext";

export const RightNav: React.FC<LocationProps> = ({ location }) => {
  const { user } = useAuth();
  // Adapter avec l'utilisateur connecté
  if (location === `/user/profile/${user?.id}`) {
    return (
      <nav
        className="flex items-center justify-center w-full h-1/4 "
        aria-label="navigation secondaire"
      >
        <ul>
          <li>
            <NavLink
              to={`/user/profile/${user?.id}`}
              className={({ isActive }: { isActive: boolean }) =>
                `${isActive ? "text-accent-primary" : "text-text-primary"} flex gap-4 items-center text-xl`
              }
            >
              <FaRegUser className="size-7 text-accent-primary" />
              Mon Profil
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
  return null;
};
