import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import { FiArrowUpRight, FiPlay, FiExternalLink } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
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

const DirectorsDesk = () => {
  const containerRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useGSAP(
    () => {
      // Hero elements reveal
      gsap.fromTo(
        ".dd-hero-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
        }
      );

      // Section scroll reveal
      gsap.utils.toArray(".dd-scroll-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          clearProps: "transform",
        });
      });

      // Guarantee visibility on reload
      const guaranteeVisibility = () => {
        document.querySelectorAll(".dd-hero-reveal, .dd-scroll-reveal").forEach((el) => {
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

  return (
    <div
      ref={containerRef}
      id="directors-desk-page"
      className="relative flex-1 w-full overflow-x-hidden bg-[#dfdff0] selection:bg-violet-600 selection:text-white"
    >
      {/* =========================================================================
          HERO SECTION: Monumental Headline
      ========================================================================== */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-36 pb-4 px-6 sm:px-10 lg:px-20 text-center text-black overflow-hidden border-b border-neutral-300/40">
        {/* Subtle ambient wash */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-violet-400/15 blur-[160px]" />
        <div className="pointer-events-none absolute top-48 right-12 size-72 rounded-full bg-blue-400/10 blur-[130px]" />

        <div className="dd-hero-reveal w-full max-w-7xl">
          <AnimatedTitle
            title="DIRECT<b>O</b>R’S D<b>E</b>SK"
            containerClass="!text-black text-center !text-6xl sm:!text-8xl md:!text-9xl lg:!text-[11vw] !leading-[0.8] tracking-tight uppercase"
          />
          <div className="mt-4 sm:mt-6 text-center">
            <span className="font-general text-xs sm:text-sm uppercase tracking-[0.25em] text-violet-700 font-semibold block">
              Know Us Better
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EXECUTIVE SHOWCASE: Spatial 3-Part Composition (ZERO DUPLICATION)
          - Top Left: Executive Director Role & Name
          - Center: Pure Executive Portrait in 3D BentoTilt
          - Bottom Right: Inspirational Quote & LinkedIn Button
      ========================================================================== */}
      <section className="relative z-10 py-16 sm:py-20 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ===================================================================
              TOP LEFT: Role & Name (Only introduced once here)
          ==================================================================== */}
          <div className="dd-hero-reveal lg:col-span-3 flex flex-col justify-start text-left lg:self-start lg:pt-8 order-1">

            <span className="font-general text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-violet-700 block mt-2">
              Executive Director
            </span>
            <span className="font-circular-web text-xs sm:text-sm text-neutral-600 font-medium block mt-0.5">
              (Academics and Curriculum Planning)
            </span>

            <h2 className="font-zentry text-2xl sm:text-3xl lg:text-4xl font-black text-black mt-4 tracking-tight">
              MR. YIGAL S. BANKER
            </h2>

            <div className="mt-6 w-16 h-1 bg-violet-600 rounded-full" />

            <p className="mt-6 font-circular-web text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Spearheading transformative academic excellence, progressive pedagogical frameworks, and holistic
              curriculum architecture across all Rahul International Schools.
            </p>
          </div>

          {/* ===================================================================
              CENTRE: Photo of Mr. Yigal Banker (Pure, unblemished portrait)
          ==================================================================== */}
          <div className="dd-hero-reveal lg:col-span-5 flex justify-center items-center order-2">
            <BentoTilt className="relative w-full max-w-sm sm:max-w-md rounded-3xl border border-black/10 bg-white/95 p-3 sm:p-4 shadow-2xl backdrop-blur-md group overflow-hidden">
              {/* Subtle ambient lighting */}
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 rounded-full bg-violet-500/15 blur-[90px] group-hover:scale-125 transition-transform duration-700" />

              <div className="relative z-10 overflow-hidden rounded-2xl aspect-[4/5] bg-neutral-100 shadow-inner">
                <img
                  src="/img/People/Yigal%20Banker%20(Director)"
                  alt="Mr. Yigal S. Banker"
                  className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                  loading="eager"
                />

                {/* Subtle bottom gradient for depth */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-500" />
              </div>
            </BentoTilt>
          </div>

          {/* ===================================================================
              BOTTOM RIGHT: Inspiring Quote & LinkedIn Link
          ==================================================================== */}
          <div className="dd-hero-reveal lg:col-span-4 flex flex-col justify-end text-left lg:self-end lg:pb-4 order-3">
            <BentoTilt className="relative rounded-3xl border border-black/10 bg-white/95 p-7 sm:p-9 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-violet-400 hover:shadow-2xl overflow-hidden">
              <span className="font-general text-xs uppercase tracking-[0.25em] text-violet-700 font-bold block mb-4">
                Director’s Vision
              </span>

              {/* Quote text */}
              <blockquote className="font-circular-web text-sm sm:text-base lg:text-[15px] xl:text-base text-neutral-800 leading-relaxed font-medium">
                &lsquo;We believe that if the students are taught motivation, time management, stress management, and
                all of the other essential helpful life skills, they will naturally become successful in life. Our motto
                is to help our students become the best version of themselves, to encourage their talents and
                ambitions, in order to help them grow and prosper into responsible citizens of the country. As
                educators, it is our responsibility to encourage new talent and give it the right direction&rsquo;
              </blockquote>

              {/* Single Official LinkedIn Button */}
              <div className="mt-8 pt-6 border-t border-neutral-200/80">
                <a
                  href="https://www.linkedin.com/in/yigal-banker-14407715b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0a66c2] px-6 py-3 font-general text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#004182] hover:scale-105 w-fit"
                >
                  <FaLinkedin className="text-base" />
                  <span>Connect on LinkedIn</span>
                  <FiArrowUpRight className="text-sm" />
                </a>
              </div>
            </BentoTilt>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: WELCOME TO RIS & VIDEO ADDRESS SHOWCASE
      ========================================================================== */}
      <section className="dd-scroll-reveal relative z-10 py-20 px-6 sm:px-10 lg:px-20 max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <span className="font-general text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-violet-700 block mb-3">
            Video Address &bull; Executive Perspective
          </span>

          <h3 className="font-zentry text-4xl sm:text-6xl md:text-7xl font-black text-black leading-[0.9] tracking-tight">
            WELCOME TO <span className="text-violet-700">RIS</span>
          </h3>

          <p className="mt-6 font-circular-web text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed max-w-3xl mx-auto">
            Here is our Executive Director Mr. Yigal Banker speaking about quality learning and education at RIS - Where the journey of learning is celebrated every day, and where students are empowered to extend their learning beyond the walls of a classroom.
          </p>
        </div>

        {/* Cinematic Video Showcase Card */}
        <BentoTilt className="relative overflow-hidden rounded-3xl border border-black/15 bg-black p-3 sm:p-5 shadow-2xl group">
          {/* Ambient violet flare behind video */}
          <div className="pointer-events-none absolute -top-20 -left-20 size-80 rounded-full bg-violet-600/30 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 size-80 rounded-full bg-blue-600/30 blur-[100px]" />

          <div className="relative z-10 overflow-hidden rounded-2xl bg-neutral-900 aspect-video w-full shadow-2xl">
            {!isVideoPlaying ? (
              <div className="relative size-full cursor-pointer group/video" onClick={() => setIsVideoPlaying(true)}>
                {/* YouTube Video Thumbnail */}
                <img
                  src="https://img.youtube.com/vi/GXsv7bogWKQ/maxresdefault.jpg"
                  alt="Mr. Yigal Banker Welcome to RIS Video"
                  className="size-full object-cover transition-transform duration-700 group-hover/video:scale-105"
                  onError={(e) => {
                    e.target.src = "https://img.youtube.com/vi/GXsv7bogWKQ/hqdefault.jpg";
                  }}
                />

                {/* Dark cinematic gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 group-hover/video:opacity-70 transition-opacity duration-300" />

                {/* Centered Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="size-20 sm:size-24 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-2xl group-hover/video:scale-110 group-hover/video:bg-violet-600 transition-all duration-300">
                    <FiPlay className="size-8 sm:size-10 text-white ml-1 fill-white" />
                  </div>
                  <span className="mt-4 font-general text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-white drop-shadow">
                    Watch Executive Director’s Message
                  </span>
                  <span className="mt-1 font-circular-web text-xs text-white/70">
                    Duration: ~2 mins &bull; YouTube
                  </span>
                </div>
              </div>
            ) : (
              <iframe
                src="https://www.youtube-nocookie.com/embed/GXsv7bogWKQ?autoplay=1&rel=0&modestbranding=1"
                title="Mr. Yigal Banker - Welcome to RIS"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="size-full border-0"
              />
            )}
          </div>
        </BentoTilt>

        {/* Video Link & Caption Footer */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <p className="font-circular-web text-xs sm:text-sm text-neutral-600">
            Official Rahul International School Video Presentation &bull; Academic Year 2026&ndash;27
          </p>

          <a
            href="https://www.youtube.com/watch?v=GXsv7bogWKQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-general text-xs font-semibold text-neutral-800 hover:text-violet-700 transition-colors uppercase tracking-wider"
          >
            <span>Open in YouTube</span>
            <FiExternalLink className="text-sm" />
          </a>
        </div>
      </section>

      {/* =========================================================================
          CLOSING CROSS-NAVIGATION CALL TO ACTION
      ========================================================================== */}
      <section className="dd-scroll-reveal relative z-10 py-16 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto">
        <BentoTilt className="relative overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-white via-white/80 to-violet-100/60 p-8 sm:p-12 shadow-xl text-center">
          <div className="relative z-10">
            <span className="font-general text-xs font-semibold uppercase tracking-[0.25em] text-violet-700 block mb-3">
              Explore Our Institution
            </span>

            <h3 className="font-zentry text-3xl sm:text-5xl font-black text-black leading-tight">
              INSPIRED BY <span className="text-violet-700">EXCELLENCE</span>
            </h3>

            <p className="mt-4 max-w-xl mx-auto font-circular-web text-neutral-700 text-sm sm:text-base leading-relaxed">
              Discover how our academic philosophy translates into holistic development, global curriculums, and a
              nurturing environment for every student.
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
                href="#our-advisory-panel"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-neutral-900 shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:scale-105"
              >
                <span>Our Advisory Panel</span>
              </a>

              <a
                href="#our-management"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-neutral-900 shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:scale-105"
              >
                <span>Meet Our Management</span>
              </a>

              <a
                href="#about-ris"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-neutral-900 shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:scale-105"
              >
                <span>About RIS</span>
              </a>
            </div>
          </div>
        </BentoTilt>
      </section>
    </div>
  );
};

export default DirectorsDesk;
