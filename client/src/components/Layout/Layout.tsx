import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { BackgroundEffects } from "./BackgroundEffects";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MainContent } from "./MainContent";

export const Layout = () => {
  const url = useLocation();
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    setLocation(url.pathname);
  }, [url]);

  return (
    <div className="flex flex-col min-h-screen bg-text-secondary">
      <Header />
      <MainContent />
      <BackgroundEffects />
      <Footer location={location} />
    </div>
  );
};
