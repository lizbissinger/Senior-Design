import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { usePathname } from "next/navigation";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import Link from "@mui/material/Link";
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

  const usePathName = usePathname();

  return (
    <>
      <Header />
      <Hero />
      <Features />
      <AboutSectionOne />
    </>
  );
};

export default LandingPage;
