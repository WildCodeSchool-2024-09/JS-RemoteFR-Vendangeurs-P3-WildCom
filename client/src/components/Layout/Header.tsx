import { Link, useNavigate } from "react-router-dom";

import { LeftNav } from "../Navigation/LeftNav";

import { FaRegUserCircle } from "react-icons/fa";
import { Logo } from "../Logo";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="z-10 flex w-full h-20 lg:fixed lg:left-0 lg:top-0 lg:bottom-0 bg-text-secondary lg:bg-bg_opacity-secondary lg:flex-col lg:justify-between lg:w-1/5 lg:h-screen">
      <section className="flex w-full px-4 py-6 lg:justify-center ">
        <Logo />
      </section>

      <section className="flex-grow hidden lg:block">
        <LeftNav />
      </section>

      <section className="flex-col items-center justify-center hidden w-full p-6 lg:flex ">
        <Link
          className="flex items-center justify-center gap-4 mr-10"
          to={"/user/profile/1"}
        >
          <FaRegUserCircle className="text-text-primary size-11" />

          <p className="text-lg text-text-primary hover:text-accent-primary font-text">
            Username
          </p>
        </Link>
        <button type="button" onClick={() => navigate("/")}>
          Se déconnecter
        </button>
      </section>
    </header>
  );
};
