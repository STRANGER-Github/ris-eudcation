import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiArrowUpRight,
  FiCalendar,
  FiAward,
  FiBookOpen,
} from "react-icons/fi";
import {
  FaGraduationCap,
  FaSchool,
  FaHeartPulse,
  FaUsers,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import { TiLocationArrow } from "react-icons/ti";
import { BentoTilt } from "./Features";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

// Ambient floating particles matching the Home page & About section
const AmbientParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 1,
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
            boxShadow: "0 0 8px 1px rgba(255, 255, 255, 0.5)",
          }}
        />
      ))}
    </div>
  );
};

// Interactive Glowing Bento Card with cursor-following radial gradient
const GlowingBentoCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <BentoTilt className={`h-full ${className}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHoverOpacity(1)}
        onMouseLeave={() => setHoverOpacity(0)}
        className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-violet-500/40 group"
      >
        {/* Dynamic Cursor Radial Glow */}
        <div
          className="pointer-events-none absolute -inset-px transition duration-300 z-0"
          style={{
            opacity: hoverOpacity,
            background: `radial-gradient(350px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(101, 111, 226, 0.35), transparent 60%)`,
          }}
        />
        {/* Ambient subtle corner glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-violet-600/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          {children}
        </div>
      </div>
    </BentoTilt>
  );
};

const MiraRoadCbse = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Hero reveal
      gsap.fromTo(
        ".mr-hero-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      // Scroll reveal sections
      const sections = gsap.utils.toArray(".mr-scroll-reveal");
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
              start: "top 85%",
              toggleActions: "play none none none",
            },
            clearProps: "all",
          }
        );
      });

      // Refresh scroll positions
      const guaranteeVisibility = () => {
        document
          .querySelectorAll(".mr-hero-reveal, .mr-scroll-reveal")
          .forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.95) {
              gsap.set(el, { opacity: 1, y: 0, clearProps: "all" });
            }
          });
        ScrollTrigger.refresh();
      };

      guaranteeVisibility();
      const timer = setTimeout(guaranteeVisibility, 150);
      return () => clearTimeout(timer);
    },
    { scope: containerRef }
  );

  // Core pedagogical pillars
  const pillars = [
    {
      title: "Multi-Faceted Holistic Development",
      description:
        "We provide quality education and focus on multi-faceted holistic development, with the help of our skill-based learning and potential-based teaching module.",
      icon: FaGraduationCap,
      tag: "Skill & Potential Module",
    },
    {
      title: "Experienced Faculty & Shared Vision",
      description:
        "Our highly experienced staff proudly reflects our shared vision of all-round academic excellence, necessary to ensure the individual success of every learner within the CBSE curriculum.",
      icon: FaUsers,
      tag: "Academic Prowess",
    },
    {
      title: "Mental & Emotional Wellbeing",
      description:
        "While we focus on academic excellence, we also believe in the importance of the positive mental and emotional growth of a child, providing the direction, counsel, and support required to fulfill their potential.",
      icon: FaHeartPulse,
      tag: "Care & Guidance",
    },
    {
      title: "Creativity, Innovation & Discipline",
      description:
        "While we have established high standards for academic achievement, our educational programme has been crafted with an emphasis on the overall development of personality including creativity, innovation, and discipline.",
      icon: FiAward,
      tag: "Character & Leadership",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      url: "https://www.facebook.com/RahulInternationalSchool/",
      color: "hover:bg-[#1877F2]",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://www.instagram.com/rahulinternationalschool/",
      color: "hover:bg-[#E4405F]",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      url: "https://www.linkedin.com/company/rahul-international-school/",
      color: "hover:bg-[#0A66C2]",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      url: "https://www.youtube.com/@RahulInternationalSchool",
      color: "hover:bg-[#FF0000]",
    },
  ];

  return (
    <div
      ref={containerRef}
      id="mira-road-cbse-page"
      className="relative flex-1 w-full bg-[#dfdff0] selection:bg-violet-600 selection:text-white"
    >
      {/* =========================================================================
          1. HERO SECTION: Monumental Awwwards-Inspired Opening
      ========================================================================== */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-36 pb-16 px-6 sm:px-10 lg:px-20 text-center text-black overflow-hidden border-b border-neutral-300/40">
        {/* Ambient atmospheric lighting */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-violet-400/20 blur-[160px]" />
        <div className="pointer-events-none absolute top-48 right-12 size-72 rounded-full bg-blue-400/15 blur-[130px]" />

        <div className="mr-hero-reveal w-full max-w-[96vw] xl:max-w-7xl mx-auto flex flex-col items-center">
          {/* Monumental Headline */}
          <AnimatedTitle
            title="MIRA R<b>O</b>AD CAMP<b>U</b>S"
            containerClass="!text-black text-center !text-[10.5vw] sm:!text-7xl md:!text-8xl lg:!text-[8.2vw] xl:!text-[8.8vw] !leading-none tracking-tight uppercase whitespace-nowrap [&_.flex-center]:flex-nowrap"
          />

          <h2 className="mt-5 font-general text-sm sm:text-base md:text-lg uppercase tracking-[0.25em] text-violet-800 font-bold">
            Best CBSE Schools in Mira Road &bull; Rahul Education Initiative
          </h2>

          <p className="mt-5 max-w-3xl mx-auto font-circular-web text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed font-medium">
            RIS is the Best CBSE School in Mira Road. It’s an initiative by Rahul Education,
            and was founded with a goal to encourage every learner to <strong>‘Be The Best.’</strong>
          </p>

          {/* Rolling-Text Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

            <a
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-admission-popup"))
              }
              className="group z-10 w-fit cursor-pointer overflow-hidden rounded-full border border-violet-600/30 bg-violet-600 px-7 py-3 text-white shadow-md shadow-violet-600/25 transition-all duration-300 hover:scale-105 hover:bg-violet-700 inline-flex items-center gap-2"
            >
              <span className="font-general text-xs uppercase tracking-wider font-bold">
                Enquire Online
              </span>
              <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="http://ris.education/campuses/mumbai/mira-road-igcse/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full border border-black/15 bg-white px-7 py-3 text-neutral-900 shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:scale-105 hover:border-violet-400 inline-flex items-center gap-2"
            >
              <FaSchool className="text-violet-700" />
              <span className="font-general text-xs uppercase tracking-wider font-bold">
                Visit RIS Mira Road CAIE (IGCSE)
              </span>
              <FiArrowUpRight className="text-sm text-neutral-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. AT-A-GLANCE CAMPUS SUMMARY RIBBON (High-End Metric Block)
      ========================================================================== */}
      <section className="relative z-10 -mt-7 max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-2xl border border-black/10 bg-white/95 p-5 shadow-lg backdrop-blur-md text-left transition-transform duration-300 hover:-translate-y-1">
            <span className="font-general text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-1">
              Curriculum Board
            </span>
            <div className="font-zentry text-xl sm:text-2xl font-black text-black">
              CBSE
            </div>
            <span className="font-circular-web text-xs text-violet-700 font-semibold block mt-1">
              Aff. No. 1130926
            </span>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/95 p-5 shadow-lg backdrop-blur-md text-left transition-transform duration-300 hover:-translate-y-1">
            <span className="font-general text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-1">
              Class Structure
            </span>
            <div className="font-zentry text-xl sm:text-2xl font-black text-black">
              NURSERY - XII
            </div>
            <span className="font-circular-web text-xs text-neutral-600 block mt-1">
              Science &bull; Commerce &bull; Arts
            </span>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/95 p-5 shadow-lg backdrop-blur-md text-left transition-transform duration-300 hover:-translate-y-1">
            <span className="font-general text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-1">
              Campus Location
            </span>
            <div className="font-zentry text-xl sm:text-2xl font-black text-black">
              MIRA ROAD (E)
            </div>
            <span className="font-circular-web text-xs text-neutral-600 block mt-1">
              Shree LR Tiwari Campus
            </span>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/95 p-5 shadow-lg backdrop-blur-md text-left transition-transform duration-300 hover:-translate-y-1">
            <span className="font-general text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-1">
              Academic Session
            </span>
            <div className="font-zentry text-xl sm:text-2xl font-black text-emerald-700">
              OPEN 2026-27
            </div>
            <span className="font-circular-web text-xs text-emerald-800 font-semibold block mt-1">
              Direct Inquiries Active
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MASTER CAMPUS SHOWCASE & ACCREDITATION HUB
          - Full-Width Centered Building Showcase (Maximum Presence)
          - CBSE Board & Grades Offered Cards side-by-side underneath
      ========================================================================== */}
      <section className="mr-scroll-reveal relative z-10 py-10 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto flex flex-col gap-8">
        {/* Full-Width Centered Master Campus Building Bento */}
        <div className="w-full">
          <BentoTilt className="relative w-full overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-xl group">
            <div className="relative w-full overflow-hidden bg-neutral-900">
              <img
                src="https://ris.education/wp-content/uploads/2022/08/rahul-international-school-Mira-Road-IGCSE-CBSE-1.webp"
                alt="Rahul International School Mira Road CBSE Campus"
                className="w-full h-auto block object-contain object-center transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

              <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                <span className="rounded-full bg-black/70 backdrop-blur-md px-4 py-2 font-general text-[11px] font-bold uppercase tracking-wider text-white border border-white/20">
                  Shree LR Tiwari Educational Campus
                </span>
                <span className="rounded-full bg-violet-600/95 backdrop-blur-md px-4 py-2 font-general text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                  CBSE Affiliated
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="font-zentry text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide">
                  RAHUL INTERNATIONAL SCHOOL &bull; MIRA ROAD
                </h3>
                <p className="mt-2 font-circular-web text-sm sm:text-base text-neutral-200 max-w-2xl">
                  Modern multi-storey educational infrastructure providing holistic K-12 learning in Mira Road.
                </p>
              </div>
            </div>

            {/* Campus Location Footbar */}
            <div className="p-5 sm:p-6 bg-white flex flex-wrap items-center justify-between gap-4 border-t border-black/5">
              <div className="flex items-center gap-3.5 text-left">
                <div className="size-11 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-700 font-bold shrink-0">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <span className="block font-general text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Campus Location
                  </span>
                  <span className="font-circular-web text-xs sm:text-sm text-neutral-600 mt-0.5 block">
                    Shree LR Tiwari Educational Campus, Mira Road, Thane - 401107
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href="tel:+918291609368"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-neutral-50 px-5 py-2.5 font-general text-xs font-bold uppercase tracking-wider text-neutral-800 hover:bg-black hover:text-white transition-colors"
                >
                  <FiPhone />
                  <span>+91 8291609368</span>
                </a>
                <a
                  href="https://maps.google.com/?q=Shree+LR+Tiwari+Educational+Campus+Mira+Road"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-neutral-50 px-4 py-2.5 font-general text-xs font-bold uppercase tracking-wider text-neutral-800 hover:bg-black hover:text-white transition-colors"
                >
                  <span>Directions</span>
                  <FiArrowUpRight className="text-xs" />
                </a>
              </div>
            </div>
          </BentoTilt>
        </div>

        {/* 2-Column Accreditation & Grades Offered Grid directly below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: CBSE Affiliation */}
          <BentoTilt className="relative flex flex-col justify-center rounded-[32px] border border-black/10 bg-white/95 p-7 sm:p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-violet-400 text-left h-full">
            <div className="flex items-start sm:items-center gap-5 sm:gap-6">
              <div className="size-24 sm:size-28 lg:size-48 shrink-0 rounded-3xl bg-neutral-50 border border-black/10 p-2 sm:p-2.5 flex items-center justify-center shadow-inner overflow-hidden">
                <img
                  src="https://ris.education/wp-content/uploads/2022/08/cbse-1-1.webp"
                  alt="CBSE Logo"
                  onError={(e) => {
                    e.currentTarget.src = "https://ris.education/wp-content/uploads/2022/08/cbse-1-1-150x150.webp";
                  }}
                  className="size-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-general text-lg sm:text-xl font-black text-black uppercase tracking-tight">
                  CENTRAL BOARD OF SECONDARY EDUCATION
                </h4>
                <span className="text-violet-800 font-bold font-general text-xs uppercase tracking-wider block mt-1">
                  Affiliation No : 1130926
                </span>
                <p className="font-circular-web text-xs sm:text-sm text-neutral-600 leading-relaxed mt-2.5">
                  RIS is a CBSE affiliated School in Mira Road. We follow the rigorous and nationally recognized CBSE curriculum, fostering critical thinking, conceptual clarity, and readiness for national competitive examinations.
                </p>
              </div>
            </div>
          </BentoTilt>

          {/* Card 2: Grades Offered */}
          <BentoTilt className="relative flex flex-col justify-center rounded-[32px] border border-black/10 bg-white/95 p-7 sm:p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-violet-400 text-left h-full">
            <div className="flex items-start sm:items-center gap-5 sm:gap-6">
              <div className="size-24 sm:size-28 lg:size-48 shrink-0 rounded-3xl bg-neutral-50 border border-black/10 p-2 sm:p-2.5 flex items-center justify-center shadow-inner overflow-hidden">
                <img
                  src="/img/RIS-logooo.png"
                  alt="RIS Logo"
                  onError={(e) => {
                    e.currentTarget.src = "/img/RIS logo.png";
                  }}
                  className="size-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-general text-lg sm:text-xl font-black text-black uppercase tracking-tight">
                  GRADES OFFERED
                </h4>
                <span className="text-neutral-900 font-bold font-general text-xs uppercase tracking-wider block mt-1">
                  Nursery to Grade XII
                </span>
                <p className="font-circular-web text-xs sm:text-sm text-neutral-600 leading-relaxed mt-2.5">
                  Comprehensive academic progression encompassing Foundational Early Years, Primary, Middle School, Secondary (Class X), and Senior Secondary (Class XII) with dedicated Science, Commerce, and Humanities streams.
                </p>
              </div>
            </div>
          </BentoTilt>
        </div>
      </section>

      {/* =========================================================================
          4. CINEMATIC DARK ARCHITECTURAL HUB: The 4 Pedagogical Pillars
          (Matches Features.jsx & Story.jsx from the Home Page)
      ========================================================================== */}
      <section className="mr-scroll-reveal relative z-10 bg-[#0c0d16] py-24 px-6 sm:px-10 lg:px-20 text-white overflow-hidden border-y border-white/10">
        <AmbientParticles />

        {/* Ambient atmospheric lighting */}
        <div className="pointer-events-none absolute -left-20 top-1/4 size-[500px] rounded-full bg-violet-600/20 blur-[160px]" />
        <div className="pointer-events-none absolute -right-20 bottom-1/4 size-[500px] rounded-full bg-blue-600/15 blur-[160px]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-general text-xs uppercase tracking-[0.3em] text-yellow-300 font-semibold block mb-2">
              Pedagogical Framework
            </span>
            <AnimatedTitle
              title="THE RIS ED<b>U</b>CATI<b>O</b>NAL APPR<b>O</b>ACH"
              containerClass="!text-white text-center mt-2"
            />
            <p className="mt-4 max-w-2xl mx-auto font-circular-web text-base text-blue-50/80 leading-relaxed">
              A harmonious integration of skill-based learning, world-class infrastructure, and compassionate mentorship.
            </p>
          </div>

          {/* 4 Glowing Bento Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 text-left">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <GlowingBentoCard key={idx}>
                  <div>
                    {/* Icon on left, Title on right of the icon */}
                    <div className="flex items-center gap-4 sm:gap-5 mb-4">
                      <div className="size-12 sm:size-14 rounded-2xl bg-violet-600/20 border border-violet-400/30 flex items-center justify-center text-violet-300 group-hover:scale-110 transition-transform shrink-0 shadow-inner">
                        <Icon className="text-2xl sm:text-3xl" />
                      </div>

                      <h3 className="font-general text-lg sm:text-xl md:text-xl font-black text-white uppercase tracking-tight leading-snug">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="mt-3 font-circular-web text-sm sm:text-base text-blue-50/85 leading-relaxed font-medium">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Moved tag to core pedagogical standard with core pedagogical design */}
                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 font-general text-xs font-semibold uppercase tracking-wider text-yellow-300">
                    <span className="size-1.5 rounded-full bg-yellow-300 shadow-[0_0_8px_rgba(253,224,71,0.8)] shrink-0" />
                    <span>{pillar.tag}</span>
                  </div>
                </GlowingBentoCard>
              );
            })}
          </div>
        </div>
      </section>



      {/* =========================================================================
          6. PRINCIPAL'S LEADERSHIP FEATURE: Mr. Yigal S. Banker
      ========================================================================== */}
      <section className="mr-scroll-reveal relative z-10 py-16 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
        <BentoTilt className="relative overflow-hidden rounded-[36px] border border-black/10 bg-white/95 p-8 sm:p-12 lg:p-14 shadow-2xl backdrop-blur-xl">
          {/* Subtle ambient corner glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Big Photo Aside Message */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-[32px] overflow-hidden border-2 border-black/10 shadow-2xl bg-neutral-900 group">
                <img
                  src="/img/People/Yigal%20Banker%20(Director)"
                  alt="Mr. Yigal S. Banker"
                  className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Message Aside Photo */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              {/* 1. Large Quote Mark & Role Badge */}
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="text-violet-600 font-serif text-6xl sm:text-7xl leading-none select-none -mb-3">
                  “
                </div>
                <span className="font-general text-xs font-bold uppercase tracking-[0.2em] text-violet-800 bg-violet-50 border border-violet-200/80 px-4 py-1.5 rounded-full shadow-sm">
                  Principal (Mira Road)
                </span>
              </div>

              {/* 2. Authentic Principal Quote */}
              <blockquote className="relative z-10 font-circular-web text-base sm:text-lg lg:text-xl text-neutral-800 leading-relaxed font-medium italic mt-2">
                ‘We believe that if the students are taught motivation, time management, stress management, and all of the other essential helpful life skills, they will naturally become successful in life. Our motto is to help our students become the best version of themselves, to encourage their talents and ambitions, in order to help them grow and prosper into responsible citizens of the country. As educators, it is our responsibility to encourage new talent and give it the right direction’
              </blockquote>

              {/* 3. Mr. Yigal S. Banker Signature */}
              <div className="relative z-10 mt-7 pt-5 border-t border-black/10">
                <h4 className="font-general text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                  Mr. Yigal S. Banker
                </h4>
              </div>
            </div>
          </div>
        </BentoTilt>
      </section>

      {/* =========================================================================
          7. ADMISSIONS & SPECIAL EVENT CALLOUT (Cinematic Dark Section)
      ========================================================================== */}
      <section className="mr-scroll-reveal relative z-10 py-16 px-6 sm:px-10 lg:px-20 max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#0c0d16] via-[#1a1c32] to-[#0c0d16] p-8 sm:p-14 lg:p-16 text-white shadow-2xl border border-white/10 text-center">
          <AmbientParticles />
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-96 rounded-full bg-violet-600/25 blur-[140px]" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-300/30 bg-yellow-400/10 px-4 py-1.5 font-general text-xs font-bold uppercase tracking-wider text-yellow-300 backdrop-blur-md mb-4">
              <FiCalendar className="text-sm" />
              Join Special Event &bull; Admissions Open
            </span>

            <AnimatedTitle
              title="GET REAL EXPERI<b>E</b>NCE <br /> IN OUR CAMP<b>U</b>S"
              containerClass="!text-white text-center tracking-wide leading-tight"
            />

            <p className="mt-5 font-circular-web text-base sm:text-lg text-blue-50/90 leading-relaxed font-medium">
              New-term admission open. Visit RIS Mira Road to explore our state-of-the-art Science labs, Music, Art &amp; Design rooms, and discover how our skill-based CBSE learning empowers your child.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                id="apply-admissions-banner-btn"
                title="Apply Now"
                leftIcon={<TiLocationArrow className="size-4 mr-1" />}
                containerClass="!bg-white !text-black shadow-xl hover:!bg-yellow-300 hover:scale-105"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-admission-popup"))
                }
              />

              <a
                href="https://admission.ris.education/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-8 py-3.5 text-white shadow-md transition-all duration-300 hover:bg-white/20 hover:scale-105 inline-flex items-center gap-2"
              >
                <span className="font-general text-xs font-bold uppercase tracking-wider">
                  Enquire Online
                </span>
                <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="tel:+918291609368"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-6 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
              >
                <FiPhone className="text-violet-400" />
                <span>+91 8291609368</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. CAMPUS CONTACT & SISTER NETWORK: Clean Structured Two-Column Hub
      ========================================================================== */}
      <section className="mr-scroll-reveal relative z-10 py-16 px-6 sm:px-10 lg:px-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          {/* Left Column: Direct Campus Contact */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-black/10 bg-white/95 p-8 sm:p-10 shadow-xl backdrop-blur-md">
            <div>
              <span className="font-general text-xs font-bold uppercase tracking-[0.25em] text-violet-700 block mb-2">
                Connect Directly
              </span>
              <h3 className="font-zentry text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
                CONTACT US &bull; RIS MIRA ROAD
              </h3>

              <div className="mt-8 space-y-6">
                {/* Campus Address */}
                <div className="flex items-start gap-4">
                  <div className="size-11 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-700 shrink-0 mt-0.5">
                    <FiMapPin className="text-xl" />
                  </div>
                  <div>
                    <span className="block font-general text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Campus Address
                    </span>
                    <p className="font-circular-web text-sm sm:text-base text-neutral-700 mt-1 leading-relaxed">
                      <strong>RIS Mira Road</strong>
                      <br />
                      Shree LR Tiwari Educational Campus,
                      <br />
                      Mira Road, Thane, Maharashtra 401107.
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="size-11 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                    <FiPhone className="text-xl" />
                  </div>
                  <div>
                    <span className="block font-general text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Admissions Helpline
                    </span>
                    <div className="mt-1 flex flex-col gap-1 font-circular-web text-sm sm:text-base text-neutral-800 font-semibold">
                      <a
                        href="tel:+918291609368"
                        className="hover:text-violet-700 transition-colors"
                      >
                        +91 8291609368
                      </a>
                      <a
                        href="tel:+919321455874"
                        className="hover:text-violet-700 transition-colors"
                      >
                        +91 9321455874
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="size-11 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                    <FiMail className="text-xl" />
                  </div>
                  <div>
                    <span className="block font-general text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Official Inquiries
                    </span>
                    <a
                      href="mailto:rismr@rahuleducation.com"
                      className="font-circular-web text-sm sm:text-base text-neutral-800 font-semibold hover:text-violet-700 transition-colors mt-1 block"
                    >
                      rismr@rahuleducation.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-black/10">
              <a
                href="https://maps.google.com/?q=Shree+LR+Tiwari+Educational+Campus+Mira+Road"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black py-3.5 font-general text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-800 transition-all shadow-md"
              >
                <span>Get Directions on Google Maps</span>
                <FiArrowUpRight className="text-sm" />
              </a>
            </div>
          </div>

          {/* Right Column: Social Channels & Explore Links */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Stay Updated Card */}
            <BentoTilt className="rounded-3xl border border-black/10 bg-white/95 p-8 shadow-xl backdrop-blur-md">
              <span className="font-general text-xs font-bold uppercase tracking-[0.25em] text-violet-700 block mb-2">
                Stay Updated
              </span>
              <h3 className="font-zentry text-2xl font-black text-black uppercase tracking-tight">
                SOCIAL INFO &bull; CONNECT WITH CAMPUS LIFE
              </h3>
              <p className="mt-2.5 font-circular-web text-sm text-neutral-600 leading-relaxed">
                We regularly post student activities and events on our Social media pages. Like us and stay updated with student achievements, sports events, science exhibitions, and campus announcements.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-neutral-100 px-5 py-2.5 font-general text-xs font-bold uppercase tracking-wider text-neutral-800 transition-all duration-300 hover:text-white hover:scale-105 ${social.color}`}
                    >
                      <Icon className="text-sm" />
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </BentoTilt>

            {/* Explore Rahul Education Network */}
            <div className="rounded-3xl border border-black/10 bg-white/95 p-8 shadow-xl backdrop-blur-md">
              <span className="font-general text-xs font-bold uppercase tracking-[0.25em] text-violet-700 block mb-2">
                About Us &amp; Governance
              </span>
              <h4 className="font-zentry text-xl font-black text-black uppercase tracking-tight mb-4">
                EXPLORE RAHUL EDUCATION NETWORK
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <a
                  href="#about-ris"
                  className="flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-neutral-50 p-4 text-center font-circular-web text-xs font-bold text-neutral-800 transition-all hover:bg-black hover:text-white hover:scale-105"
                >
                  <FaSchool className="text-lg mb-1.5 text-violet-600" />
                  <span>About RIS</span>
                </a>

                <a
                  href="#our-management"
                  className="flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-neutral-50 p-4 text-center font-circular-web text-xs font-bold text-neutral-800 transition-all hover:bg-black hover:text-white hover:scale-105"
                >
                  <FaUsers className="text-lg mb-1.5 text-violet-600" />
                  <span>Management Desk</span>
                </a>

                <a
                  href="#about-rahul-education"
                  className="flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-neutral-50 p-4 text-center font-circular-web text-xs font-bold text-neutral-800 transition-all hover:bg-black hover:text-white hover:scale-105"
                >
                  <FiAward className="text-lg mb-1.5 text-violet-600" />
                  <span>About Rahul Education</span>
                </a>

                <a
                  href="#privacy-policy"
                  className="flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-neutral-50 p-4 text-center font-circular-web text-xs font-bold text-neutral-800 transition-all hover:bg-black hover:text-white hover:scale-105"
                >
                  <FiBookOpen className="text-lg mb-1.5 text-violet-600" />
                  <span>Privacy Policy</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MiraRoadCbse;
