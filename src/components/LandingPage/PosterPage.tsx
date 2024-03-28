import React from "react";
import AboutSectionOne from "./AboutSectionOne";
import Breadcrumb from "./Breadcrumb";
import Header from "./LandingHeader";
import PosterImg from "./PosterImg";

const PosterPage = () => {
  return (
    <>
      <div className="min-h-screen">
        <Header currentPath={"/poster"} />
        <Breadcrumb />
        <PosterImg />
      </div>
    </>
  );
};

export default PosterPage;
