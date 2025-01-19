import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import SideNavigation from "./components/SideNavigation";

function App() {
  const url = useLocation();
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    setLocation(url.pathname);
  }, [url]);

  return (
    <div className="flex flex-col min-h-screen bg-text-secondary">
      <header className="z-10 flex w-full h-20 lg:fixed lg:left-0 lg:top-0 lg:bottom-0 bg-text-secondary lg:bg-bg_opacity-secondary lg:flex-col lg:justify-between lg:w-1/5 lg:h-screen">
        <section className="flex w-full px-4 py-6 lg:justify-center ">
          <Link to={"/"} className="flex items-center gap-4">
            <img
              src="./src/assets/images/logo.png"
              alt=""
              aria-labelledby="wildcom"
              className="w-12 lg:w-12 xl:w-16 2xl:w-20"
            />

            <h1
              className="hidden font-semibold font-title lg:block lg:text-accent-primary lg:text-1xl xl:text-2xl 2xl:text-3xl"
              id="wildcom"
            >
              &lt;WildCom/&gt;
            </h1>
          </Link>
        </section>

        <section className="flex-grow hidden lg:block">
          <Navigation />
        </section>

        <section className="hidden w-full p-6 lg:block">
          <Link
            className="flex items-center justify-center gap-4 mr-10"
            to={"/profile/1"}
          >
            <FaRegUserCircle className="text-text-primary size-11" />

            <p className="text-lg text-text-primary hover:text-accent-primary font-text">
              Username
            </p>
          </Link>
        </section>
      </header>

      <main className="mx-auto my-10 lg:w-1/2">
        <Outlet />

        <div className="w-52 h-52 rounded-full fixed top-1 -left-20 bg-accent-primary blur-[150px] opacity-65 lg:w-96 lg:h-96 lg:top-20 lg:left-80" />

        <div className="w-52 h-52 rounded-full fixed bottom-16 -right-20 bg-accent-primary blur-[150px] opacity-65 lg:w-96 lg:h-96 lg:right-60" />
      </main>

      <footer className="top-0 bottom-0 right-0 flex-col hidden w-1/5 lg:fixed bg-bg_opacity-secondary lg:flex">
        <section className="flex-grow hidden lg:flex">
          <SideNavigation location={location} />
        </section>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
