import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { LeftNav } from "../Navigation/LeftNav";

import { useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import defaultProfilePicture from "../../assets/images/profil_neutral.webp";
import { useUpdate } from "../../contexts/UpdateContext";
import { Logo } from "../Logo";
import MobileNav from "../Navigation/MobileNav";

export const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { updateUser } = useUpdate();

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

  useEffect(() => {
    const getUpdatedCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/find/${user?.id}`,
          { withCredentials: true },
        );
        setUser(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur", error);
      }
    };
    if (updateUser) {
      getUpdatedCurrentUser();
    }
  }, [updateUser, user?.id, setUser]);

  return (
    <header className="z-10 flex w-full h-20 lg:fixed lg:left-0 lg:top-0 lg:bottom-0 bg-text-secondary lg:bg-bg_opacity-secondary lg:flex-col lg:justify-between lg:w-1/5 lg:h-screen">
      <section className="flex w-1/2 px-4 py-6 lg:w-full lg:justify-center ">
        <Logo isLayout={true} />
      </section>
      <section className="flex w-1/2 lg:hidden ">
        <MobileNav />
      </section>

      <section className="flex-grow hidden lg:block">
        <LeftNav />
      </section>

      <section className="items-center justify-center hidden w-full gap-4 mb-6 lg:flex-col lg:flex text-text-primary">
        <Link
          className="flex items-center justify-center gap-4 m-2 group "
          to={`/user/profile/${user?.id}`}
        >
          {user?.path ? (
            <img
              src={`${import.meta.env.VITE_API_URL}/${user?.path}`}
              alt={`Avatar de ${user?.username}`}
              className="object-cover rounded-full size-10"
            />
          ) : (
            <img
              src={defaultProfilePicture}
              alt={`Avatar de ${user?.username}`}
              className="object-cover rounded-full size-10"
            />
          )}

          <p className="text-xs sm:text-lg group-hover:text-accent-primary font-text group-hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]">
            {user?.username}
          </p>
        </Link>

        <button
          type="button"
          className="flex items-center justify-center gap-4 group hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]"
          onClick={handleLogout}
        >
          <FiLogOut className="ml-4 size-4 md:size-7 text-accent-primary" />
          <span className=" group-hover:text-accent-primary font-text">
            Se déconnecter
          </span>
        </button>
      </section>
    </header>
  );
};
