import { NavLink } from "react-router-dom";

import { FaRegUser } from "react-icons/fa";

import type { LocationProps } from "../../types/type";

import ModalButton from "../ModalButton";

export const RightNav: React.FC<LocationProps> = ({ location }) => {
  // Adapter avec l'utilisateur connecté
  if (location === "/user/profile/1") {
    return (
      <nav
        className="flex items-center justify-center w-full h-1/4 "
        aria-label="navigation secondaire"
      >
        <ul>
          <li>
            <NavLink
              to={"/user/profile/1"}
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

  if (location === "/user/home") {
    return (
      <section className="flex items-center justify-center w-full h-1/4">
        <ModalButton>Ajouter une publication</ModalButton>
      </section>
    );
  }

  return null;
};
