import { Link } from "react-router-dom";

import imageLogo from "../assets/images/logo.png";

interface LogoProps {
  isLayout: boolean;
}

export const Logo: React.FC<LogoProps> = ({ isLayout }) => {
  return (
    <Link to={"/user/home"} className="flex items-center gap-4">
      <img
        src={imageLogo}
        alt=""
        aria-labelledby="wildcom"
        className={`${isLayout ? "w-12" : "w-20"}  lg:w-12 xl:w-16 2xl:w-20`}
      />

      <span
        className={` ${isLayout ? "hidden" : "lg:block text-2xl"} lg:block font-semibold font-title text-accent-primary lg:text-1xl xl:text-2xl 2xl:text-3xl`}
        id="wildcom"
      >
        &lt;WildCom/&gt;
      </span>
    </Link>
  );
};
