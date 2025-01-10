import { NavLink } from "react-router-dom";

type LocationProps = {
  location: string;
};

function SideNavigation({ location }: LocationProps) {
  if (location === "/profile") {
    return (
      <nav
        className="flex h-1/4 w-full justify-center items-center "
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
              <img
                className="w-8"
                src="./src/assets/images/myprofile.png"
                alt=""
              />
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
