import React, { useState, useEffect } from "react";
import Header from "./LandingHeader";
import Hero from "./Hero";
import Features from "./Features";
import AboutSectionOne from "./AboutSectionOne";

const LandingPage: React.FC = () => {
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <Header currentPath={"/"} />
        <Hero />
        <Features />
        <AboutSectionOne />
      </div>
    </>
  );
};

export default LandingPage;
