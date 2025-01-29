import axios from "axios";
import { useState } from "react";
import { createPortal } from "react-dom";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { RxCalendar, RxDashboard, RxHome } from "react-icons/rx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { RightNav } from "./RightNav";

const MobileNav = () => {
  const [MenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      null,
      {
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      navigate("/");
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <section className="flex items-center justify-end w-full gap-4 px-4">
        <button
          type="button"
          className="text-2xl text-text-primary lg:hidden"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <FiMenu className="size-7" />
        </button>
        <Link
          className="flex items-center justify-center gap-4 m-2 group "
          to={`/user/profile/${user?.id}`}
        >
          <img
            src={user?.avatar}
            alt={`Avatar de ${user?.username}`}
            className="object-cover rounded-full size-8"
          />
        </Link>
      </section>

      {MenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary">
            <div className="flex flex-col items-center w-full gap-24 p-6 rounded-lg ">
              <button
                type="button"
                className="absolute top-0 self-end text-4xl right-4 text-text-primary"
                aria-label="Close menu"
                onClick={toggleMenu}
              >
                &times;
              </button>
              <nav className="flex lg:justify-center">
                <ul className="space-y-8">
                  <li>
                    <NavLink
                      to="/user/home"
                      className={({ isActive }) =>
                        `${isActive ? " drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)] text-accent-primary" : "text-text-primary"} flex gap-4 lg:items-center font-text text-xl mt-28 hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]`
                      }
                      onClick={toggleMenu}
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
                      onClick={toggleMenu}
                    >
                      <RxCalendar className="size-7 text-accent-primary " />
                      Événements
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={`/user/profile/${user?.id}`}
                      className={({ isActive }: { isActive: boolean }) =>
                        `${isActive ? "drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)] text-accent-primary" : "text-text-primary"} flex gap-4 items-center text-xl hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]`
                      }
                      onClick={toggleMenu}
                    >
                      <FaRegUser className="size-7 text-accent-primary" />
                      Mon Profil
                    </NavLink>
                  </li>

                  <li>
                    {user?.role === "admin" && (
                      <NavLink
                        to="/admin/dashboard"
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
              <section className="items-center lg:flex-col lg:flex text-text-primary">
                <button
                  type="button"
                  className="flex items-center justify-center gap-4"
                  onClick={handleLogout}
                >
                  <FiLogOut className="ml-4 size-6 md:size-7 text-accent-primary" />

                  <span className="text-xl mr-7 font-text">Se déconnecter</span>
                </button>
                <hr className="mt-6 mb-4 border-accent-primary drop-shadow-[0_3px_2px_rgba(65,242,77,1)]" />
              </section>
              <footer className="top-0 bottom-0 right-0 flex-col justify-start lg:fixed lg:flex">
                <section className="flex-grow hidden lg:flex">
                  <RightNav location={location.pathname} />
                </section>

                <section className="p-6 space-y-2 text-sm text-center text-text-primary">
                  <p>
                    &copy; 2025{" "}
                    <span className="text-accent-primary font-title">
                      &lt;WildCom/&gt;
                    </span>
                  </p>

                  <a className="" href="mailto:creamedoc@gmail.com">
                    Contactez nous
                  </a>
                </section>
              </footer>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default MobileNav;
