import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import {
  FaGraduationCap,
  FaPenToSquare,
  FaPhoneVolume,
  FaHeartPulse,
  FaSteam,
  FaSnowflake,
} from "react-icons/fa6";

import AnimatedTitle from "./AnimatedTitle";
import { BentoTilt } from "./Features";

gsap.registerPlugin(ScrollTrigger);

// Ambient Floating Particles for the Dark Vision/Mission section
const CosmicParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      tx: Math.random(),
      ty: Math.random(),
      duration: Math.random() * 5 + 6,
      delay: Math.random() * 3,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen opacity-40">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            "--tx": p.tx,
            "--ty": p.ty,
            animation: `float-particle ${p.duration}s ease-in-out infinite alternate ${p.delay}s`,
            boxShadow: "0 0 6px 1px rgba(255, 255, 255, 0.4)",
          }}
        />
      ))}
    </div>
  );
};

// Official Brand Card for Guiding Principles with Left-Aligned Icon
const EditorialPrincipleCard = ({ title, description, icon: Icon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <BentoTilt className="h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHoverOpacity(1)}
        onMouseLeave={() => setHoverOpacity(0)}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-300/70 bg-white/95 p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-violet-400 hover:bg-white hover:shadow-[0_20px_45px_rgba(85,66,255,0.12)]"
      >
        {/* Subtle light spotlight effect */}
        <div
          className="pointer-events-none absolute -inset-px transition duration-300"
          style={{
            opacity: hoverOpacity,
            background: `radial-gradient(350px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(85,66,255,0.07), transparent 70%)`,
          }}
        />

        {/* Content Container */}
        <div className="relative z-10">
          {/* Header with Icon on Left + Title on Right */}
          <div className="flex items-center gap-4">
            <div className="text-3xl sm:text-4xl text-[#1a1446] shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Icon />
            </div>
            <h3 className="font-circular-web text-lg sm:text-[1.25rem] font-semibold text-neutral-900 leading-snug transition-colors duration-300 group-hover:text-violet-900">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="mt-4 font-circular-web text-sm sm:text-[15px] leading-relaxed text-neutral-600 transition-colors duration-300 group-hover:text-neutral-800">
            {description}
          </p>
        </div>

        {/* Bottom accent glow strip */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-500 to-yellow-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </BentoTilt>
  );
};

const AboutRis = () => {
  const containerRef = useRef(null);

  const guidingPrinciples = [
    {
      title: "Knowledgeable and Skilled learners",
      description:
        "Who are open to new knowledge and skills while also developing an overall understanding of a broad range of subjects.",
      icon: FaGraduationCap,
    },
    {
      title: "Self-directed and Balanced Individuals",
      description:
        "Who strive to achieve their personal best and understand the importance of intellectual, physical, and emotional balance.",
      icon: FaPenToSquare,
    },
    {
      title: "Effective Communicators",
      description:
        "Who can interact well with others, through different modes of communication and for a variety of purposes.",
      icon: FaPhoneVolume,
    },
    {
      title: "Responsible, Caring and Ethical contributors",
      description:
        "Who can empathize and be tolerant of differences, and are committed to making a positive impact on their communities and the environment.",
      icon: FaHeartPulse,
    },
    {
      title: "Inquiring and Reflective Problem Solvers",
      description:
        "Who strive to achieve their personal best and understand the importance of intellectual, physical, and emotional balance.",
      icon: FaSteam,
    },
    {
      title: "Balanced Approach to Learning and Assessment",
      description:
        "Who strive to appraise learners, using multi-faceted methods to create a well-rounded understanding of both the level each child is at and what type of learner each is.",
      icon: FaSnowflake,
    },
  ];

  useGSAP(
    () => {
      // Hero elements reveal
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "all",
        }
      );

      // Overview cards reveal on scroll
      gsap.fromTo(
        ".overview-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#institutional-overview",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          clearProps: "all",
        }
      );

      // Dark Vision & Mission section reveal
      gsap.fromTo(
        ".vision-mission-box",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#vision-mission-section",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          clearProps: "all",
        }
      );

      // Guiding principles staggered grid entrance
      gsap.fromTo(
        ".principle-item",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#principles-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          clearProps: "all",
        }
      );

      // If page was refreshed while scrolled down, ensure cards already in view are immediately visible
      const guaranteeVisibilityOnRefresh = () => {
        document
          .querySelectorAll(".overview-card, .vision-mission-box, .principle-item")
          .forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.95) {
              gsap.set(el, { opacity: 1, y: 0, clearProps: "all" });
            }
          });
        ScrollTrigger.refresh();
      };

      guaranteeVisibilityOnRefresh();
      const timer = setTimeout(guaranteeVisibilityOnRefresh, 150);

      return () => clearTimeout(timer);
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="about-ris-page"
      className="relative min-h-screen w-screen overflow-x-hidden selection:bg-violet-600 selection:text-white"
    >
      {/* =========================================================================
          PART 1: HERO HEADER (Iconic Zentry Light Luxury Aesthetic)
      ========================================================================== */}
      <section className="relative z-10 flex min-h-[85vh] flex-col items-center justify-center bg-[#dfdff0] px-6 pt-36 pb-20 text-center sm:px-10 lg:px-20 text-black overflow-hidden">
        {/* Subtle radial ambient wash */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-violet-400/15 blur-[160px]" />

        {/* Monumental Headline: ABOUT RIS (Matching Image 2 style) */}
        <div className="hero-reveal w-full max-w-7xl">
          <AnimatedTitle
            title="AB<b>O</b>UT R<b>I</b>S"
            containerClass="!text-black text-center !text-6xl sm:!text-8xl md:!text-9xl lg:!text-[12vw] !leading-[0.8] tracking-tight uppercase"
          />
        </div>

        {/* 3D Floating Official Logo Emblem (Vibrant Violet Anchor matching Image 2) */}
        <div className="hero-reveal relative mt-8 sm:mt-12 w-full max-w-md sm:max-w-lg">
          <BentoTilt className="relative w-full">
            <div className="group relative flex flex-col items-center justify-center rounded-[32px] border border-violet-500/20 bg-gradient-to-br from-[#5542ff] via-[#4d32f5] to-[#391fe0] p-8 sm:p-12 text-white shadow-[0_25px_60px_rgba(85,66,255,0.3)] transition-all duration-700 hover:shadow-[0_35px_80px_rgba(85,66,255,0.45)]">
              {/* Outer delicate pulse border */}
              <div className="pointer-events-none absolute inset-0 -m-3 rounded-[38px] border border-violet-400/25 animate-pulse" />

              {/* RIS Official Logo Image */}
              <div className="relative size-32 sm:size-40 md:size-44 flex items-center justify-center">
                <img
                  src="/img/RIS logo 10x10.png"
                  alt="RIS Logo"
                  className="size-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Institutional Motto Pill */}
              <div className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-full border border-yellow-300/40 bg-black/40 px-5 py-1.5 backdrop-blur-md shadow-md">
                <span className="font-zentry text-sm font-bold uppercase tracking-wider text-yellow-300">
                  ‘Be The Best’
                </span>
                <span className="text-white/40 text-xs">•</span>
                <span className="font-general text-xs uppercase tracking-widest text-blue-50/90">
                  Rahul Education Initiative
                </span>
              </div>
            </div>
          </BentoTilt>
        </div>
      </section>

      {/* =========================================================================
          PART 2: INSTITUTIONAL OVERVIEW (Clean, Prestigious Light Editorial Luxury)
      ========================================================================== */}
      <section
        id="institutional-overview"
        className="relative z-10 bg-[#dfdff0] py-24 px-6 sm:px-10 lg:px-20 text-black border-b border-neutral-300/40"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section Sub-heading */}
          <div className="mb-14 text-center">
            <span className="font-general text-xs uppercase tracking-[0.25em] text-violet-700 font-semibold block mb-2">
              Institutional Overview
            </span>
            <h2 className="special-font font-zentry text-3xl sm:text-5xl font-black uppercase text-neutral-900 tracking-wide">
              MULTI-FACETED HOL<b>I</b>STIC DEVEL<b>O</b>PMENT
            </h2>
          </div>

          {/* Two-Column Editorial Presentation */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Column 1: Foundation & Infrastructure */}
            <BentoTilt className="h-full">
              <div className="overview-card flex h-full flex-col justify-center rounded-3xl border border-black/10 bg-white/90 p-8 sm:p-12 shadow-[0_15px_35px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-500 hover:border-violet-400 hover:shadow-[0_20px_50px_rgba(85,66,255,0.1)]">
                <p className="font-circular-web text-base sm:text-lg leading-relaxed text-neutral-800 font-medium">
                  RIS is an initiative by Rahul Education, and was founded to
                  encourage every learner to ‘Be The Best.’ We provide quality
                  education and focus on multi-faceted holistic development,
                  with the help of our skill-based learning and potential-based
                  teaching module. Our world-class infrastructure includes
                  modern campuses and facilities like functional Science labs,
                  Music, Art & Design rooms that promote new-age learning for
                  our learners.
                </p>
              </div>
            </BentoTilt>

            {/* Column 2: Staff & Academic Excellence */}
            <BentoTilt className="h-full">
              <div className="overview-card flex h-full flex-col justify-center rounded-3xl border border-black/10 bg-white/90 p-8 sm:p-12 shadow-[0_15px_35px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-500 hover:border-violet-400 hover:shadow-[0_20px_50px_rgba(85,66,255,0.1)]">
                <p className="font-circular-web text-base sm:text-lg leading-relaxed text-neutral-800 font-medium">
                  Our highly experienced staff proudly reflects our shared
                  vision of all-around academic excellence, necessary to ensure
                  the individual success of every learner. While we focus on
                  academic excellence, we also believe in the importance of the
                  positive mental and emotional growth of a child. We aim to
                  provide the direction, counsel, and support required by each
                  learner in order to full his/her potential.
                </p>
              </div>
            </BentoTilt>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PART 3: OUR VISION & OUR MISSION (Deep Velvet Dark Architectural Contrast)
      ========================================================================== */}
      <section
        id="vision-mission-section"
        className="relative z-10 bg-[#0c0d16] py-24 px-6 sm:px-10 lg:px-20 text-white overflow-hidden"
      >
        <CosmicParticles />

        {/* Ambient radial lighting */}
        <div className="pointer-events-none absolute -left-20 top-1/3 size-[500px] rounded-full bg-violet-600/15 blur-[160px]" />
        <div className="pointer-events-none absolute -right-20 top-1/2 size-[500px] rounded-full bg-yellow-400/10 blur-[160px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="font-general text-xs uppercase tracking-[0.3em] text-yellow-300 font-semibold block mb-2">
              Strategic Direction
            </span>
            <AnimatedTitle
              title="OUR VIS<b>I</b>ON & MISS<b>I</b>ON"
              containerClass="!text-white text-center mt-2"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* OUR VISION */}
            <BentoTilt className="h-full">
              <div className="vision-mission-box group relative flex h-full flex-col justify-center overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950/40 via-black/80 to-[#120f26]/60 p-8 sm:p-12 lg:p-14 backdrop-blur-2xl transition-all duration-700 hover:border-violet-400 hover:shadow-[0_20px_60px_rgba(87,36,255,0.25)]">
                {/* Ambient radial glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-violet-600/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />

                <div className="relative z-10">
                  <h3 className="special-font font-zentry text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wide text-white">
                    O<b>U</b>R VISI<b>O</b>N
                  </h3>

                  <p className="mt-6 font-circular-web text-base sm:text-lg lg:text-xl leading-relaxed text-blue-50/90 font-medium">
                    A culturally diverse international school, where learners
                    can learn the skills of global citizenship, leadership,
                    communication, emotional intelligence, entrepreneurship,
                    problem solving and team spirit for future preparedness.
                  </p>
                </div>
              </div>
            </BentoTilt>

            {/* OUR MISSION */}
            <BentoTilt className="h-full">
              <div className="vision-mission-box group relative flex h-full flex-col justify-center overflow-hidden rounded-3xl border border-yellow-300/30 bg-gradient-to-br from-yellow-950/20 via-black/80 to-[#191508]/60 p-8 sm:p-12 lg:p-14 backdrop-blur-2xl transition-all duration-700 hover:border-yellow-300 hover:shadow-[0_20px_60px_rgba(237,255,102,0.2)]">
                {/* Ambient radial glow */}
                <div className="pointer-events-none absolute -left-16 -bottom-16 size-48 rounded-full bg-yellow-400/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />

                <div className="relative z-10">
                  <h3 className="special-font font-zentry text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wide text-white">
                    O<b>U</b>R MISS<b>I</b>ON
                  </h3>

                  <p className="mt-6 font-circular-web text-base sm:text-lg lg:text-xl leading-relaxed text-blue-50/90 font-medium">
                    To empower learners with quality education in order to unfold
                    their potential as whole and unique people, and through them
                    create a peaceful world community.
                  </p>
                </div>
              </div>
            </BentoTilt>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PART 4: GUIDING PRINCIPLES (Pristine Light Bento Grid - Editorial Styling)
      ========================================================================== */}
      <section
        id="guiding-principles-section"
        className="relative z-10 bg-[#dfdff0] py-24 px-6 sm:px-10 lg:px-20 text-black"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="font-general text-xs uppercase tracking-[0.25em] text-violet-700 font-semibold block mb-2">
              Foundational Standards
            </span>
            <AnimatedTitle
              title="GUID<b>I</b>NG <br /> PR<b>I</b>NCIPLES"
              containerClass="!text-neutral-900 text-center mt-2"
            />
            <p className="mx-auto mt-4 max-w-2xl font-circular-web text-sm sm:text-base text-neutral-600">
              The guiding pillars that define every learner’s intellectual,
              personal, and ethical journey at Rahul International School.
            </p>
          </div>

          {/* 6 Guiding Principles Editorial Bento Grid */}
          <div
            id="principles-grid"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {guidingPrinciples.map((principle, index) => (
              <div key={index} className="principle-item">
                <EditorialPrincipleCard
                  title={principle.title}
                  description={principle.description}
                  icon={principle.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutRis;
