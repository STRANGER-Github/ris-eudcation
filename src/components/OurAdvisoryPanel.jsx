import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";
import advisoryImg from "../assets/advisory-Panel.webp";

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

const OurAdvisoryPanel = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Reveal animation
      gsap.fromTo(
        ".ap-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="our-advisory-panel-page"
      className="relative flex-1 w-full bg-[#dfdff0] selection:bg-violet-600 selection:text-white"
    >
      {/* =========================================================================
          HERO SECTION: Monumental Headline
      ========================================================================== */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-36 pb-6 px-6 sm:px-10 lg:px-20 text-center text-black overflow-hidden border-b border-neutral-300/40">
        {/* Subtle ambient wash */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-violet-400/15 blur-[160px]" />
        <div className="pointer-events-none absolute top-48 right-12 size-72 rounded-full bg-blue-400/10 blur-[130px]" />

        <div className="ap-reveal w-full max-w-7xl">
          <AnimatedTitle
            title="OUR ADVIS<b>O</b>RY P<b>A</b>NEL"
            containerClass="!text-black text-center !text-5xl sm:!text-7xl md:!text-8xl lg:!text-[9.5vw] !leading-[0.82] tracking-tight uppercase"
          />
          <div className="mt-4 sm:mt-6 text-center">
            <span className="font-general text-xs sm:text-sm uppercase tracking-[0.25em] text-violet-700 font-semibold block">
              Know Us Better
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EXECUTIVE ADVISOR SHOWCASE: Pure, Unrepeated Editorial Layout
          - Photo on Left (Pure, dignified portrait without duplicate text)
          - Identity & Narrative on Right (Official Role, Name & Authentic Journey)
      ========================================================================== */}
      <section className="relative z-10 py-16 sm:py-20 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ===================================================================
              LEFT: Dignified Advisor Portrait (Pure presentation)
          ==================================================================== */}
          <div className="ap-reveal lg:col-span-5 flex justify-center items-center">
            <BentoTilt className="relative w-full max-w-md rounded-3xl border border-black/10 bg-white/95 p-6 sm:p-8 shadow-2xl backdrop-blur-md group overflow-hidden">
              {/* Subtle ambient lighting */}
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 rounded-full bg-violet-500/15 blur-[90px] group-hover:scale-125 transition-transform duration-700" />

              <div className="relative mx-auto size-64 sm:size-72 lg:size-80 rounded-full p-2 bg-gradient-to-tr from-violet-600 via-indigo-500 to-amber-400 shadow-xl">
                <div className="size-full rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center shadow-inner">
                  <img
                    src={advisoryImg}
                    alt="Mr. Abdelaziz Elyas"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                    loading="eager"
                  />
                </div>
              </div>
            </BentoTilt>
          </div>

          {/* ===================================================================
              RIGHT: Editorial Identity & Authentic Biography
          ==================================================================== */}
          <div className="ap-reveal lg:col-span-7 flex flex-col justify-center text-left">
            <BentoTilt className="relative rounded-3xl border border-black/10 bg-white/95 p-8 sm:p-10 lg:p-12 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-violet-400 hover:shadow-2xl overflow-hidden">
              {/* Official Designation */}
              <span className="font-general text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-violet-700 block">
                Director of International Collaborations
              </span>

              {/* Name - Ultra-Readable, Authoritative font-general */}
              <h2 className="font-general text-3xl sm:text-4xl lg:text-[42px] font-black uppercase text-neutral-950 tracking-tight leading-tight mt-2">
                MR. ABDELAZIZ ELYAS
              </h2>

              <div className="mt-6 w-16 h-1 bg-violet-600 rounded-full" />

              {/* Authentic User-Provided Biography (No filler, No duplicate cards) */}
              <div className="mt-6 space-y-4 font-circular-web text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                <p>
                  He steadily endeavoured in the field of education, commencing his journey from being an English teacher to being a vice-principal and then as a Principal of the school for 7 uninterrupted years.
                </p>

                <p>
                  His great understanding, skills, and diligent efforts led him to be promoted as Head of Examinations for the Sharjah Private Education Authority. The Sharjah Private Education Authority was established by Emiri Decree No. 45 of 2018 issued by His Highness Sheikh Dr Sultan bin Muhammad Al Qasimi, Member of the Supreme Council/Ruler of the Emirate of Sharjah. The authority represents the local authority responsible for the affairs of private education institutions (nurseries, schools, centres and institutes).
                </p>

                <p>
                  He served as the head for 5 years. Later he was given the additional responsibility as the Head of Quality Management in the same Authority. Abdelaziz Elyas contributed more than 30 years of his life in the field of education, laying down a foundation of knowledge, and got retired in 2017. Now he serves on the advisory board panel of RIS as the Director of International Collaborations.
                </p>
              </div>
            </BentoTilt>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLOSING CROSS-NAVIGATION CALL TO ACTION
      ========================================================================== */}
      <section className="ap-reveal relative z-10 py-16 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto">
        <BentoTilt className="relative overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-white via-white/80 to-violet-100/60 p-8 sm:p-12 shadow-xl text-center">
          <div className="relative z-10">
            <span className="font-general text-xs font-semibold uppercase tracking-[0.25em] text-violet-700 block mb-3">
              Explore Our Institution
            </span>

            <h3 className="font-zentry text-3xl sm:text-5xl font-black text-black leading-tight">
              INSPIRED BY <span className="text-violet-700">LEADERSHIP</span>
            </h3>

            <p className="mt-4 max-w-xl mx-auto font-circular-web text-neutral-700 text-sm sm:text-base leading-relaxed">
              Discover how our distinguished advisory panel, executive leadership, and parent conglomerate unite to deliver world-class schooling across Maharashtra and Uttar Pradesh.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-admission-popup"))}
                className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-neutral-800 cursor-pointer"
              >
                <span>Apply for Admission</span>
                <TiLocationArrow className="text-base" />
              </button>

              <a
                href="#affiliations-collaborations"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-neutral-900 shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:scale-105"
              >
                <span>Affiliations &amp; Collaborations</span>
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

              <a
                href="#about-rahul-education"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-neutral-900 shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:scale-105"
              >
                <span>About Rahul Education</span>
              </a>
            </div>
          </div>
        </BentoTilt>
      </section>
    </div>
  );
};

export default OurAdvisoryPanel;
