import { useState, useEffect } from "react";
import About from "./components/About";
import AboutRis from "./components/AboutRis";
import OurManagement from "./components/OurManagement";
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
      } else if (!hash || hash === "#" || hash === "#home" || hash === "#/home") {
        setCurrentRoute("home");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // If an anchor was clicked (e.g. #curriculum or #features)
        if (currentRoute === "about-ris" || currentRoute === "our-management") {
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
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      {currentRoute === "about-ris" ? (
        <AboutRis />
      ) : currentRoute === "our-management" ? (
        <OurManagement />
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
