import { MdOutlineCategory } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import { NavLink } from "react-router-dom";

export const AdminMobileNav = () => {
  return (
    <nav
      className=" relative z-10 w-screen lg:hidden flex justify-center h-auto  py-4 mb-4 font-light border-2 bg-bg_opacity-primary rounded-xl border-bg_opacity-secondary font-text text-text-primary shadow-[0px_4px_40px_1px_rgba(0,0,0,0.75)]"
      aria-label="navigation secondaire"
    >
      <ul className="flex justify-start gap-10">
        <li>
          <NavLink
            to="/admin/categories"
            className={({ isActive }: { isActive: boolean }) =>
              `${isActive ? "drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)] text-accent-primary" : "text-text-primary"} flex gap-3 items-center text-lg hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]`
            }
          >
            <MdOutlineCategory className="size-6 text-accent-primary" />
            Catégories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }: { isActive: boolean }) =>
              `${isActive ? "drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)] text-accent-primary" : "text-text-primary"} flex gap-4 items-center text-lg hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]`
            }
          >
            <TbUsersGroup className="size-6 text-accent-primary" />
            Utilisateurs
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
