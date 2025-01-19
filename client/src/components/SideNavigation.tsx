import { FaRegUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

type LocationProps = {
  location: string;
};

function SideNavigation({ location }: LocationProps) {
  if (location === "/profile/1") {
    return (
      <nav
        className="flex items-center justify-center w-full h-1/4 "
        aria-label="navigation secondaire"
      >
        <ul>
          <li>
            <NavLink
              to={"/profile"}
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
}

export default SideNavigation;
