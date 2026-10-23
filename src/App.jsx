import { useState, useEffect } from "react";
import About from "./components/About";
import AboutRis from "./components/AboutRis";
import OurManagement from "./components/OurManagement";
import AboutRahulEducation from "./components/AboutRahulEducation";
import DirectorsDesk from "./components/DirectorsDesk";
import OurAdvisoryPanel from "./components/OurAdvisoryPanel";
import AffiliationsCollaborations from "./components/AffiliationsCollaborations";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdmissionPopup from "./components/AdmissionPopup";

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = (window.location.hash || "").toLowerCase();
    if (hash === "#about-ris" || hash === "#/about-ris") return "about-ris";
    if (
      hash === "#our-management" ||
      hash === "#/our-management" ||
      hash === "#management-desk" ||
      hash === "#/management-desk"
    )
      return "our-management";
    if (
      hash === "#about-rahul-education" ||
      hash === "#/about-rahul-education" ||
      hash === "#rahul-education" ||
      hash === "#/rahul-education"
    )
      return "about-rahul-education";
    if (
      hash === "#directors-desk" ||
      hash === "#/directors-desk" ||
      hash === "#director-desk" ||
      hash === "#/director-desk" ||
      hash === "#director" ||
      hash === "#/director"
    )
      return "directors-desk";
    if (
      hash === "#our-advisory-panel" ||
      hash === "#/our-advisory-panel" ||
      hash === "#advisory-panel" ||
      hash === "#/advisory-panel" ||
      hash === "#advisory" ||
      hash === "#/advisory"
    )
      return "our-advisory-panel";
    if (
      hash === "#affiliations-collaborations" ||
      hash === "#/affiliations-collaborations" ||
      hash === "#affiliations" ||
      hash === "#/affiliations" ||
      hash === "#collaborations" ||
      hash === "#/collaborations"
    )
      return "affiliations-collaborations";
    return "home";
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = (window.location.hash || "").toLowerCase();
      if (hash === "#about-ris" || hash === "#/about-ris") {
        setCurrentRoute("about-ris");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (
        hash === "#our-management" ||
        hash === "#/our-management" ||
        hash === "#management-desk" ||
        hash === "#/management-desk"
      ) {
        setCurrentRoute("our-management");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (
        hash === "#about-rahul-education" ||
        hash === "#/about-rahul-education" ||
        hash === "#rahul-education" ||
        hash === "#/rahul-education"
      ) {
        setCurrentRoute("about-rahul-education");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (
        hash === "#directors-desk" ||
        hash === "#/directors-desk" ||
        hash === "#director-desk" ||
        hash === "#/director-desk" ||
        hash === "#director" ||
        hash === "#/director"
      ) {
        setCurrentRoute("directors-desk");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (
        hash === "#our-advisory-panel" ||
        hash === "#/our-advisory-panel" ||
        hash === "#advisory-panel" ||
        hash === "#/advisory-panel" ||
        hash === "#advisory" ||
        hash === "#/advisory"
      ) {
        setCurrentRoute("our-advisory-panel");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (
        hash === "#affiliations-collaborations" ||
        hash === "#/affiliations-collaborations" ||
        hash === "#affiliations" ||
        hash === "#/affiliations" ||
        hash === "#collaborations" ||
        hash === "#/collaborations"
      ) {
        setCurrentRoute("affiliations-collaborations");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (!hash || hash === "#" || hash === "#home" || hash === "#/home") {
        setCurrentRoute("home");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // If an anchor was clicked (e.g. #curriculum or #features)
        if (
          currentRoute === "about-ris" ||
          currentRoute === "our-management" ||
          currentRoute === "about-rahul-education" ||
          currentRoute === "directors-desk" ||
          currentRoute === "our-advisory-panel" ||
          currentRoute === "affiliations-collaborations"
        ) {
          setCurrentRoute("home");
          setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }, 150);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [currentRoute]);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between">
      <NavBar />
      {currentRoute === "about-ris" ? (
        <AboutRis />
      ) : currentRoute === "our-management" ? (
        <OurManagement />
      ) : currentRoute === "about-rahul-education" ? (
        <AboutRahulEducation />
      ) : currentRoute === "directors-desk" ? (
        <DirectorsDesk />
      ) : currentRoute === "our-advisory-panel" ? (
        <OurAdvisoryPanel />
      ) : currentRoute === "affiliations-collaborations" ? (
        <AffiliationsCollaborations />
      ) : (
        <>
          <Hero />
          <About />
          <Features />
          <Story />
          <Contact />
        </>
      )}
      <Footer />
      <AdmissionPopup />
    </main>
  );
}

export default App;
