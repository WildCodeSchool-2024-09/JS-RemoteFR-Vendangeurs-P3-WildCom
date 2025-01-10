import { useEffect, useState } from "react";
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
    <div className="bg-text-secondary flex flex-col min-h-screen">
      <header className="lg:fixed lg:left-0 lg:top-0 lg:bottom-0 w-full h-20 bg-text-secondary lg:bg-bg_opacity-secondary flex lg:flex-col lg:justify-between lg:w-1/5 lg:h-screen z-10">
        <section className="flex lg:justify-center px-4 py-6 w-full ">
          <Link to={"/"} className="flex items-center gap-4">
            <img
              src="./src/assets/images/logo.png"
              alt=""
              aria-labelledby="wildcom"
              className="w-12 lg:w-12 xl:w-16  2xl:w-20"
            />

            <h1
              className="hidden font-title font-semibold lg:block lg:text-accent-primary lg:text-1xl xl:text-2xl  2xl:text-3xl"
              id="wildcom"
            >
              &lt;WildCom/&gt;
            </h1>
          </Link>
        </section>

        <section className="hidden lg:block flex-grow">
          <Navigation />
        </section>

        <section className="w-full hidden lg:block p-6">
          <Link
            className="flex items-center gap-4 justify-center mr-10"
            to={"/profile"}
          >
            <img
              className="size-11"
              src="./src/assets/images/userprofile.png "
              alt=""
              aria-labelledby="username"
            />
            <p className="text-text-primary hover:text-accent-primary font-text text-lg">
              Username
            </p>
          </Link>
        </section>
      </header>

      <main className="my-10 lg:w-1/2 mx-auto">
        <Outlet />

        <div className="w-52 h-52 rounded-full fixed top-1 -left-20 bg-accent-primary blur-[150px] opacity-65 lg:w-96 lg:h-96 lg:top-20 lg:left-80" />

        <div className="w-52 h-52 rounded-full fixed bottom-16 -right-20 bg-accent-primary blur-[150px] opacity-65 lg:w-96 lg:h-96 lg:right-60" />
      </main>

      <footer className="lg:fixed top-0 bottom-0 right-0 w-1/5  bg-bg_opacity-secondary lg:flex flex-col hidden">
        <section className="hidden lg:flex flex-grow">
          <SideNavigation location={location} />
        </section>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
