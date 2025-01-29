import { NavLink } from "react-router-dom";

import { FaRegUser } from "react-icons/fa";

import type { LocationProps } from "../../types/type";

import { IoMdAdd } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext";
import ModalButton from "../ModalButton";

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
                `${isActive ? "drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)] text-accent-primary" : "text-text-primary"} flex gap-4 items-center text-xl hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]`
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

  if (location === "/user/home") {
    return (
      <section className="flex items-center justify-center w-full h-1/4 group">
        <ModalButton>
          <IoMdAdd className="bg-accent-primary text-text-secondary rounded-full size-7 transition-transform duration-300 group-hover:rotate-90" />
          Ajouter une publication
        </ModalButton>
      </section>
    );
  }

  return null;
};
