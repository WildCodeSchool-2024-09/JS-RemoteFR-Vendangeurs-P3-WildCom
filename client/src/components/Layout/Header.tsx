import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { LeftNav } from "../Navigation/LeftNav";

import { FiLogOut } from "react-icons/fi";
import { Logo } from "../Logo";

export const Header = () => {
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

  return (
    <header className="z-10 flex w-full h-20 lg:fixed lg:left-0 lg:top-0 lg:bottom-0 bg-text-secondary lg:bg-bg_opacity-secondary lg:flex-col lg:justify-between lg:w-1/5 lg:h-screen">
      <section className="flex w-full px-4 py-6 lg:justify-center ">
        <Logo isLayout={true} />
      </section>

      <section className="flex-grow hidden lg:block">
        <LeftNav />
      </section>

      <section className="items-center justify-center hidden w-full gap-4 mb-6 lg:flex-col lg:flex text-text-primary">
        <Link
          className="flex items-center justify-center gap-4 m-2 group"
          to={`/user/profile/${user?.id}`}
        >
          <img
            src={user?.avatar}
            alt={`Avatar de ${user?.username}`}
            className="object-cover rounded-full size-10"
          />

          <p className="text-xs sm:text-lg group-hover:text-accent-primary font-text">
            {user?.username}
          </p>
        </Link>

        <button
          type="button"
          className="flex items-center justify-center gap-4 group"
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
