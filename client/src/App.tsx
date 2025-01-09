import { Link, Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="bg-text-secondary flex min-h-screen">
      <header className="w-full h-20 bg-text-secondary lg:bg-bg_opacity-secondary flex lg:flex-col lg:w-1/5 lg:h-screen z-10">
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

        
          <Navigation/>

      
      </header>

      <main className="flex flex-grow ">
        <Outlet />

        <div className="w-52 h-52 rounded-full fixed top-1 -left-20 bg-accent-primary blur-[150px] opacity-65 lg:w-96 lg:h-96 lg:top-20 lg:left-80" />

        <div className="w-52 h-52 rounded-full fixed bottom-16 -right-20 bg-accent-primary blur-[150px] opacity-65 lg:w-96 lg:h-96 lg:right-60" />
      </main>

      <footer className="w-1/5  bg-bg_opacity-secondary lg:flex flex-col hidden">
        <section className="flex flex-grow" />
        <Footer />
      </footer>
    </div>
  );
}

export default App;
