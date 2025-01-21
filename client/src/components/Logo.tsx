import { Link } from "react-router-dom";

import imageLogo from "../assets/images/logo.png";

export const Logo = () => {
  return (
    <Link to={"/user/home"} className="flex items-center gap-4">
      <img
        src={imageLogo}
        alt=""
        aria-labelledby="wildcom"
        className="w-12 lg:w-12 xl:w-16 2xl:w-20"
      />

      <span
        className="hidden font-semibold font-title lg:block lg:text-accent-primary lg:text-1xl xl:text-2xl 2xl:text-3xl"
        id="wildcom"
      >
        &lt;WildCom/&gt;
      </span>
    </Link>
  );
};
