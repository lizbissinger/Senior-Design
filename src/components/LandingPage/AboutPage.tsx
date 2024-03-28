import React from "react";
import AboutSectionOne from "./AboutSectionOne";
import Breadcrumb from "./Breadcrumb";
import Header from "./LandingHeader";

const AboutPage = () => {
  return (
    <>
      <div className="min-h-screen">
        <Header currentPath={"/about"} />
        <Breadcrumb />
        <AboutSectionOne />
      </div>
    </>
  );
};

export default AboutPage;
