import { NavLink } from "react-router-dom";

import { FaRegUser } from "react-icons/fa";

import type { LocationProps } from "../../types/type";

import { IoMdAdd } from "react-icons/io";
import { SlEqualizer } from "react-icons/sl";
import { useAuth } from "../../contexts/AuthContext";
import ModalButton from "../ModalButton";

export const RightNav: React.FC<LocationProps> = ({ location }) => {
  const { user } = useAuth();

  if (
    location === `/user/profile/${user?.id}` ||
    location === `/user/profile/edit/${user?.id}`
  ) {
    return (
      <nav
        className="flex items-center justify-center w-full gap-10 h-1/4 "
        aria-label="navigation secondaire"
      >
        <ul className="flex flex-col justify-start gap-10">
          <li>
            <NavLink
              to={`/user/profile/${user?.id}`}
              className={({ isActive }: { isActive: boolean }) =>
                `${isActive ? "drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)] text-accent-primary" : "text-text-primary"} flex gap-4 items-center text-xl hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]`
              }
            >
              <FaRegUser className="size-7 text-accent-primary" />
              Mon Profil
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/user/profile/edit/${user?.id}`}
              className={({ isActive }: { isActive: boolean }) =>
                `${isActive ? "drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)] text-accent-primary" : "text-text-primary"} flex gap-4 items-center text-xl hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]`
              }
            >
              <SlEqualizer className=" size-7 drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]size-7 text-accent-primary hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]" />
              Mes informations
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }

  if (location === "/user/home") {
    return (
      <section className="flex items-center justify-center w-auto h-1/4 xl:text-xl text-base">
        <div className="group">
          <ModalButton type={"post"}>
            <IoMdAdd className="transition-transform duration-300 rounded-full bg-accent-primary text-text-secondary size-7 group-hover:rotate-90" />
            Ajouter une publication
          </ModalButton>
        </div>
      </section>
    );
  }
  if (location === "/user/events") {
    return (
      <section className="flex items-center justify-center w-auto h-1/4 xl:text-xl text-base">
        <div className="group">
          <ModalButton type={"event"}>
            <IoMdAdd className="transition-transform duration-300 rounded-full bg-accent-primary text-text-secondary size-7 group-hover:rotate-90" />
            Ajouter un événement
          </ModalButton>
        </div>
      </section>
    );
  }

  return null;
};
