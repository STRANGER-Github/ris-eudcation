import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// BentoTilt: Interactive 3D perspective tilt container
// ============================================================================
const BentoTilt = ({ children, className = "", style = {} }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;
    setTransformStyle(`perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// Affiliations Data (Verbatim from user)
// ============================================================================
const affiliations = [
  {
    acronym: "CBSE",
    name: "Central Board of Secondary Education",
    logo: "https://ris.education/wp-content/uploads/2022/08/cbse-1-1.webp",
    url: "https://www.cbse.gov.in/",
  },
  {
    acronym: "CISCE",
    name: "Council for the Indian School Certificate Examinations",
    logo: "https://ris.education/wp-content/uploads/2022/08/ICSE-1.webp",
    url: "https://cisce.org/",
  },
  {
    acronym: "CAIE",
    name: "Cambridge Assessment International Education",
    logo: "https://ris.education/wp-content/uploads/2022/08/CAM2.webp",
    url: "https://www.cambridgeinternational.org/",
  },
];

// ============================================================================
// Academic Partners (All 11 URLs shared by user)
// ============================================================================
const academicPartners = [
  { id: 1, image: "https://ris.education/wp-content/uploads/2022/08/05-400x452.jpg" },
  { id: 2, image: "https://ris.education/wp-content/uploads/2022/08/06-400x452.jpg" },
  { id: 3, image: "https://ris.education/wp-content/uploads/2022/08/07-400x452.jpg" },
  { id: 4, image: "https://ris.education/wp-content/uploads/2022/08/09-400x453.jpg" },
  { id: 5, image: "https://ris.education/wp-content/uploads/2022/08/10-400x454.jpg" },
  { id: 6, image: "https://ris.education/wp-content/uploads/2022/08/11-400x452.jpg" },
  { id: 7, image: "https://ris.education/wp-content/uploads/2022/08/12-400x452.jpg" },
  { id: 8, image: "https://ris.education/wp-content/uploads/2022/08/13-400x454.jpg" },
  { id: 9, image: "https://ris.education/wp-content/uploads/2022/08/04-400x452.jpg" },
  { id: 10, image: "https://ris.education/wp-content/uploads/2022/08/03-400x453.jpg" },
  { id: 11, image: "https://ris.education/wp-content/uploads/2022/08/01-400x452.jpg" },
];

// ============================================================================
// International School Collaborations (Verbatim from user)
// ============================================================================
const internationalCollaborations = [
  {
    school: "Sundar Junior Secondary School (Bangladesh)",
    project: "World on a Plate",
    topic: "Exploration of Indian Bangladeshi Cuisines",
    url: null,
  },
  {
    school: "Akshara School (Nepal)",
    project: "Zero-Waste Challenge",
    topic: "Awareness on the waste disposal effective management methods of waste",
    url: "https://www.ucas.com/",
  },
  {
    school: "Mamonia Elem Code A School (Bangladesh)",
    project: "Be my Guest",
    topic: "Exploring tourism in India and Palestine",
    url: "https://www.oxfam.org/en",
  },
];

const AffiliationsCollaborations = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Hero reveal animation
      gsap.fromTo(
        ".ac-hero-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      // Scroll reveal sections
      const sections = gsap.utils.toArray(".ac-scroll-reveal");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="affiliations-collaborations-page"
      className="relative flex-1 w-full bg-[#dfdff0] selection:bg-violet-600 selection:text-white"
    >
      {/* =========================================================================
          HERO SECTION: Single-Line Monumental Headline
      ========================================================================== */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-36 pb-6 px-6 sm:px-10 lg:px-20 text-center text-black overflow-hidden border-b border-neutral-300/40">
        {/* Subtle ambient wash */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-violet-400/15 blur-[160px]" />
        <div className="pointer-events-none absolute top-48 right-12 size-72 rounded-full bg-blue-400/10 blur-[130px]" />

        <div className="ac-hero-reveal w-full max-w-[96vw] xl:max-w-7xl mx-auto flex flex-col items-center justify-center">
          <AnimatedTitle
            title="AFFILIATI<b>O</b>NS &amp; C<b>O</b>LLABORATIONS"
            containerClass="!text-black text-center !text-2xl sm:!text-3xl md:!text-4xl lg:!text-[4.3vw] xl:!text-[4.6vw] !leading-none tracking-tight uppercase whitespace-nowrap [&_.flex-center]:flex-nowrap"
          />
          <div className="mt-4 sm:mt-6 text-center">
            <span className="font-general text-xs sm:text-sm uppercase tracking-[0.25em] text-violet-700 font-semibold block">
              Know Us Better
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: AFFILIATIONS (CBSE, CISCE, CAIE)
      ========================================================================== */}
      <section className="relative z-10 py-16 sm:py-20 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="ac-hero-reveal text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-zentry text-4xl sm:text-6xl md:text-7xl font-black text-black leading-tight uppercase">
            AFFILIATIONS
          </h2>
        </div>

        {/* 3-Board Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {affiliations.map((item, idx) => (
            <BentoTilt
              key={idx}
              className="ac-hero-reveal relative flex flex-col justify-between rounded-3xl border border-black/10 bg-white/95 p-8 sm:p-10 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-violet-400 hover:shadow-2xl group overflow-hidden"
            >
              {/* Subtle ambient light on hover */}
              <div className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-violet-500/10 blur-[50px] group-hover:scale-125 transition-transform duration-500" />

              <div>
                {/* Board Logo Container */}
                <div className="size-28 sm:size-32 rounded-2xl bg-neutral-50 p-4 border border-black/5 shadow-inner flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={item.logo}
                    alt={`${item.acronym} Logo`}
                    className="max-h-full max-w-full object-contain select-none"
                    loading="lazy"
                  />
                </div>

                {/* Acronym & Full Name */}
                <div className="text-center">
                  <h3 className="font-general text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight">
                    {item.acronym}
                  </h3>
                  <h4 className="font-circular-web text-sm sm:text-base font-semibold text-neutral-700 mt-2">
                    {item.name}
                  </h4>
                </div>
              </div>

              {/* Official Link Button */}
              <div className="mt-8 pt-5 border-t border-neutral-200/80 text-center">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-general text-xs uppercase tracking-wider font-bold text-violet-700 hover:text-black transition-colors"
                >
                  <span>Visit {item.acronym}</span>
                  <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </BentoTilt>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OUR ACADEMIC PARTNER (Verbatim Copy & 11 Partner Logos)
      ========================================================================== */}
      <section className="ac-scroll-reveal relative z-10 py-16 sm:py-20 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto border-t border-neutral-300/40">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-zentry text-4xl sm:text-6xl md:text-7xl font-black text-black leading-tight uppercase">
            OUR ACADEMIC PARTNER
          </h2>
        </div>

        {/* Verbatim Editorial Text */}
        <BentoTilt className="relative rounded-3xl border border-black/10 bg-white/95 p-8 sm:p-12 shadow-xl backdrop-blur-md mb-12 max-w-5xl mx-auto overflow-hidden">
          <div className="pointer-events-none absolute -bottom-16 -right-16 size-60 rounded-full bg-violet-500/10 blur-[80px]" />
          <p className="font-circular-web text-base sm:text-lg text-neutral-800 leading-relaxed font-normal text-center sm:text-left">
            For an educational organization, academic partners are essential, keeping in mind that there is a constant
            need to stay in tune with the trends of various industries. Rahul International School has been fortunate
            to join hands with numerous firms and companies that have shared their expertise and vision for our students.
            Our Academic Partners help us bridge the gap in the industry and make learning more innovative &amp; impactful.
            Our partners provide certifications, diplomas, internships, skill building, assistance for university
            placements, and many more.
          </p>
        </BentoTilt>

        {/* 11 Partner Logos Grid (Exact 11 URLs shared by user) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 items-center">
          {academicPartners.map((partner) => (
            <BentoTilt
              key={partner.id}
              className="relative rounded-2xl border border-black/10 bg-white p-3 sm:p-4 shadow-md backdrop-blur-md transition-all duration-300 hover:border-violet-400 hover:shadow-xl group overflow-hidden flex items-center justify-center aspect-[4/4.5]"
            >
              <img
                src={partner.image}
                alt={`Academic Partner ${partner.id}`}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 select-none"
                loading="lazy"
              />
            </BentoTilt>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INTERNATIONAL SCHOOL COLLABORATIONS
      ========================================================================== */}
      <section className="ac-scroll-reveal relative z-10 py-16 sm:py-20 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto border-t border-neutral-300/40">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-zentry text-4xl sm:text-6xl md:text-7xl font-black text-black leading-tight uppercase">
            INTERNATIONAL COLLABORATIONS
          </h2>
        </div>

        {/* 3 Collaboration Cards (Verbatim user content, zero filler) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {internationalCollaborations.map((collab, idx) => (
            <BentoTilt
              key={idx}
              className="relative flex flex-col justify-between rounded-3xl border border-black/10 bg-white/95 p-8 sm:p-9 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-violet-400 hover:shadow-2xl group overflow-hidden"
            >
              <div className="pointer-events-none absolute -top-10 -right-10 size-36 rounded-full bg-violet-500/10 blur-[50px] group-hover:scale-125 transition-transform duration-500" />

              <div>
                {/* School Name */}
                {collab.url ? (
                  <a
                    href={collab.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-general text-xl sm:text-2xl font-black text-neutral-950 hover:text-violet-700 transition-colors inline-flex items-center gap-1.5 leading-snug"
                  >
                    <span>{collab.school}</span>
                    <FiExternalLink className="text-base shrink-0" />
                  </a>
                ) : (
                  <h3 className="font-general text-xl sm:text-2xl font-black text-neutral-950 leading-snug">
                    {collab.school}
                  </h3>
                )}

                <div className="mt-5 pt-5 border-t border-neutral-200/80">
                  <h4 className="font-general text-lg sm:text-xl font-bold text-violet-900">
                    {collab.project}
                  </h4>
                  <p className="font-circular-web text-sm sm:text-base text-neutral-700 mt-2 leading-relaxed">
                    ({collab.topic})
                  </p>
                </div>
              </div>

              {collab.url && (
                <div className="mt-8 pt-5 border-t border-neutral-200/80">
                  <a
                    href={collab.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-general text-xs uppercase tracking-wider font-bold text-violet-700 hover:text-black transition-colors"
                  >
                    <span>Visit Official Website</span>
                    <FiArrowUpRight className="text-sm" />
                  </a>
                </div>
              )}
            </BentoTilt>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CLOSING CROSS-NAVIGATION CALL TO ACTION
      ========================================================================== */}
      <section className="ac-scroll-reveal relative z-10 py-16 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto">
        <BentoTilt className="relative overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-white via-white/80 to-violet-100/60 p-8 sm:p-12 shadow-xl text-center">
          <div className="relative z-10">
            <h3 className="font-zentry text-3xl sm:text-5xl font-black text-black leading-tight uppercase">
              EXPLORE OUR INSTITUTION
            </h3>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-admission-popup"))}
                className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-neutral-800 cursor-pointer"
              >
                <span>Apply for Admission</span>
                <TiLocationArrow className="text-base" />
              </button>

              <a
                href="#our-advisory-panel"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-neutral-900 shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:scale-105"
              >
                <span>Our Advisory Panel</span>
              </a>

              <a
                href="#directors-desk"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-neutral-900 shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:scale-105"
              >
                <span>Director’s Desk</span>
              </a>

              <a
                href="#our-management"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-neutral-900 shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:scale-105"
              >
                <span>Our Management</span>
              </a>
            </div>
          </div>
        </BentoTilt>
      </section>
    </div>
  );
};

export default AffiliationsCollaborations;
