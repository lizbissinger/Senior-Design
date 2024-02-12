import AboutSectionOne from "./AboutSectionOne";
import Breadcrumb from "./Breadcrumb";
import Header from "./LandingHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | FleetWave",
  description: "This is About Page",
};

const AboutPage = () => {
  return (
    <>
    <Header />
      <Breadcrumb />
      <AboutSectionOne />
    </>
  );
};

export default AboutPage;
