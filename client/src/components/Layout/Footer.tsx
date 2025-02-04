import { RightNav } from "../Navigation/RightNav";

import type { LocationProps } from "../../types/type";

export const Footer: React.FC<LocationProps> = ({ location }) => {
  return (
    <>
      <footer className="top-0 bottom-0 right-0 flex-col hidden w-1/5 lg:fixed bg-bg_opacity-secondary lg:flex">
        <section className="justify-center flex-grow hidden pt-10 lg:flex">
          <RightNav location={location} />
        </section>

        <section className="p-6 space-y-2 text-sm text-center text-text-primary">
          <p>
            &copy; 2025{" "}
            <span className="text-accent-primary font-title">
              &lt;WildCom/&gt;
            </span>
          </p>

          <a
            className="hover:text-accent-primary"
            href="https://mail.google.com/mail/?view=cm&to=nimda.wildcom@gmail.com"
          >
            Contactez nous
          </a>
        </section>
      </footer>
    </>
  );
};
