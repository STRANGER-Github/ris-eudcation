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
// Academic Disciplines Data with Official External Links
// ============================================================================
const academicDisciplines = [
  {
    category: "Engineering, Tech & Polytechnic",
    tag: "Technical Excellence",
    description:
      "Cutting-edge engineering research, AI-era computer and data sciences, and foundational polytechnic technical diplomas.",
    links: [
      { name: "Engineering (SLRTCE)", url: "https://slrtce.in/", note: "AICTE & DTE Approved, Affiliated to Mumbai Univ." },
      { name: "Polytechnic (PTRJTPOLY)", url: "https://ptrjtpoly.com/", note: "Pravin Patil College of Diploma Engg." },
      { name: "Computer Science", url: "https://slrtdc.in/programmes/science-courses/b-sc-computer-science/", note: "B.Sc. Computer Science" },
      { name: "Data Science", url: "https://slrtdc.in/programmes/science-courses/data-science/", note: "B.Sc. Data Science" },
      { name: "B.Sc.-IT", url: "https://slrtdc.in/programmes/science-courses/bachelor-of-science-in-information-technology/", note: "Information Technology" },
    ],
  },
  {
    category: "Management, Commerce & Law",
    tag: "Corporate & Legal Leadership",
    description:
      "Premier management diplomas, recognized legal education, and professional commerce degrees preparing future-ready leaders.",
    links: [
      { name: "PGDM & MMS", url: "https://slrtce.in/admission", note: "Post-Graduate Business Administration" },
      { name: "Law College (SLRTCL)", url: "https://slrtcl.in/", note: "3-Yr & 5-Yr Integrated Law Degrees" },
      { name: "BMS", url: "https://slrtdc.in/programmes/commerce-courses/bachelor-of-management-studies-b-m-s/", note: "Bachelor of Management Studies" },
      { name: "BAF", url: "https://slrtdc.in/programmes/commerce-courses/bachelor-of-commerce-in-accounting-finance/", note: "Accounting & Finance" },
      { name: "B.Com", url: "https://slrtdc.in/programmes/commerce-courses/bachelor-of-commerce/", note: "General & Advanced Commerce" },
      { name: "M.Com in Management", url: "https://slrtdc.in/master-of-commerce/", note: "Post-Graduate Commerce" },
      { name: "M.Com in Accountancy", url: "https://slrtdc.in/master-of-commerce/", note: "Specialized Financial Accounting" },
    ],
  },
  {
    category: "Architecture & Design Studies",
    tag: "Creative Built Environment",
    description:
      "Council of Architecture (COA) certified architectural degree programs fostering sustainable urban design and aesthetic ingenuity.",
    links: [
      { name: "Architecture (SKLTCA)", url: "https://skltca.in/", note: "Shree K. L. Tiwari College of Architecture (B.Arch)" },
      { name: "Design Studies", url: "https://rahuleducation.org/", note: "Interior, Spatial & Modern Design Curricula" },
    ],
  },
  {
    category: "Specialized & Applied Sciences",
    tag: "Industry-Centric Disciplines",
    description:
      "High-demand vocational and scientific specializations spanning commercial aviation, hospitality, and actuarial analytics.",
    links: [
      { name: "Aviation Studies", url: "http://aviation.slrtdc.in/", note: "Aviation Operations & Cabin Crew Training" },
      { name: "Hospitality Studies", url: "https://slrtdc.in/programmes/science-courses/hospitality-studies/", note: "Culinary & Hotel Administration" },
      { name: "Actuarial Sciences", url: "https://slrtdc.in/programmes/science-courses/actuarial-science/", note: "Mathematical Risk & Financial Modeling" },
      { name: "BMM / BAMMC & BA", url: "https://slrtdc.in/programmes/art-courses/bachelor-of-arts-in-multimedia-and-mass-communication-b-a-m-m-c/", note: "Multimedia & Mass Communication" },
    ],
  },
  {
    category: "Colleges of Teacher Education",
    tag: "Pedagogical Heritage",
    description:
      "Empowering educators through premier university-affiliated teacher training programs from early childhood care to master’s degrees.",
    links: [
      { name: "B.Ed. (College of Education)", url: "http://rahul-edr.org/", note: "Bachelor of Education (NCTE Recognized)" },
      { name: "D.Ed. / D.El.Ed.", url: "http://rahul-edr.org/", note: "Diploma in Elementary Education" },
      { name: "M.A. in Education", url: "http://rahul-edr.org/", note: "Advanced Master’s Degree in Pedagogy" },
      { name: "E.C.C.Ed.", url: "http://rahul-edr.org/", note: "Early Childhood Care & Education Diploma" },
    ],
  },
  {
    category: "Schools & Junior Colleges",
    tag: "Foundational K-12 Ecosystem",
    description:
      "Comprehensive multi-board schooling across CBSE, ICSE, Cambridge CAIE (IGCSE), and Maharashtra SSC, plus vibrant Junior Colleges.",
    links: [
      { name: "CBSE Curriculum", url: "https://www.ris.education/", note: "Rahul International School (CBSE)" },
      { name: "ICSE Curriculum", url: "https://www.ris.education/", note: "Rahul International School (ICSE)" },
      { name: "CAIE / IGCSE Curriculum", url: "https://www.ris.education/", note: "Cambridge International Education" },
      { name: "SSC Curriculum", url: "http://rahuleducation.org/state-board-schools/", note: "Maharashtra State Board Schools" },
      { name: "Junior Colleges", url: "http://rahuleducation.org/junior-colleges/", note: "Science, Commerce & Arts Streams" },
    ],
  },
];

const AboutRahulEducation = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Hero elements reveal
      gsap.fromTo(
        ".re-hero-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
        }
      );

      // Section scroll reveals
      gsap.utils.toArray(".re-scroll-reveal").forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            once: true,
          },
          clearProps: "transform",
        });
      });

      // Quick guarantee on refresh
      const guaranteeVisibility = () => {
        document.querySelectorAll(".re-hero-reveal, .re-scroll-reveal").forEach((el) => {
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
      id="about-rahul-education-page"
      className="relative flex-1 w-full overflow-x-hidden bg-[#dfdff0] selection:bg-red-600 selection:text-white"
    >
      {/* =========================================================================
          HERO SECTION: Monumental Headline & Conglomerate Identity
      ========================================================================== */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-36 pb-12 px-6 sm:px-10 lg:px-20 text-center text-black overflow-hidden border-b border-neutral-300/40">
        {/* Soft ambient wash */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-red-400/10 blur-[160px]" />
        <div className="pointer-events-none absolute top-40 right-10 size-72 rounded-full bg-violet-400/10 blur-[130px]" />

        {/* Monumental Headline */}
        <div className="re-hero-reveal w-full max-w-7xl">
          <AnimatedTitle
            title="ABOUT RAH<b>U</b>L ED<b>U</b>CATI<b>O</b>N"
            containerClass="!text-black text-center !text-5xl sm:!text-7xl md:!text-8xl lg:!text-[9.5vw] !leading-[0.85] tracking-tight uppercase"
          />
          <div className="mt-4 sm:mt-6 text-center">
            <span className="font-general text-xs sm:text-sm uppercase tracking-[0.25em] text-red-600 font-semibold block">
              Our Parent Conglomerate &bull; Imparting Knowledge for 30+ Years
            </span>
          </div>
        </div>

        {/* Subtitle statement */}
        <p className="re-hero-reveal mt-6 max-w-3xl font-circular-web text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed">
          From a pioneering school in Bhayandar in 1992 to 57+ renowned institutions nurturing over 70,000 learners
          across Maharashtra and Uttar Pradesh with 360° quality education.
        </p>

        {/* Quick External Anchor Buttons */}
        <div className="re-hero-reveal mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://rahuleducation.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 font-general text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-neutral-800"
          >
            <span>Visit Rahuleducation.org</span>
            <FiExternalLink className="text-sm" />
          </a>
          <a
            href="#disciplines"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("disciplines");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/80 px-6 py-3 font-general text-xs font-bold uppercase tracking-wider text-neutral-800 shadow-sm backdrop-blur transition-all duration-300 hover:bg-white hover:scale-105"
          >
            <span>Explore 57+ Institutions</span>
            <TiLocationArrow className="text-base" />
          </a>
        </div>
      </section>

      {/* =========================================================================
          KEY STATS STRIP: Monumental Impact Counters
      ========================================================================== */}
      <section className="relative z-10 py-10 px-6 sm:px-10 lg:px-20 border-b border-neutral-300/40 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 text-center">
          <div className="re-hero-reveal flex flex-col items-center">
            <span className="font-zentry text-4xl sm:text-5xl md:text-6xl font-black text-black">
              57<span className="text-red-600">+</span>
            </span>
            <span className="mt-1 font-general text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Institutions
            </span>
          </div>

          <div className="re-hero-reveal flex flex-col items-center">
            <span className="font-zentry text-4xl sm:text-5xl md:text-6xl font-black text-black">
              30<span className="text-red-600">+</span>
            </span>
            <span className="mt-1 font-general text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Years of Legacy
            </span>
          </div>

          <div className="re-hero-reveal flex flex-col items-center">
            <span className="font-zentry text-4xl sm:text-5xl md:text-6xl font-black text-black">
              70K<span className="text-red-600">+</span>
            </span>
            <span className="mt-1 font-general text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Students Nurtured
            </span>
          </div>

          <div className="re-hero-reveal flex flex-col items-center">
            <span className="font-zentry text-4xl sm:text-5xl md:text-6xl font-black text-black">
              5<span className="text-red-600"></span>
            </span>
            <span className="mt-1 font-general text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Registered Societies
            </span>
          </div>

          <div className="re-hero-reveal col-span-2 md:col-span-1 flex flex-col items-center">
            <span className="font-zentry text-4xl sm:text-5xl md:text-6xl font-black text-black">
              4<span className="text-red-600"></span>
            </span>
            <span className="mt-1 font-general text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Key Districts (MH & UP)
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOUNDATIONAL LEGACY & LOGO SHOWCASE
      ========================================================================== */}
      <section className="relative z-10 py-16 sm:py-20 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: Official Rahul Education Emblem Card */}
          <div className="re-scroll-reveal lg:col-span-5 flex flex-col">
            <BentoTilt className="relative flex-1 flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl bg-white border border-black/10 shadow-xl overflow-hidden group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 rounded-full bg-red-500/10 blur-[80px] pointer-events-none group-hover:scale-125 transition-transform duration-700" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <img
                  src="/img/rahul-education-logo.png"
                  alt="Rahul Education Logo"
                  className="max-h-72 sm:max-h-80 w-auto object-contain select-none drop-shadow-md group-hover:scale-[1.03] transition-transform duration-500"
                />

                <div className="mt-8 pt-6 border-t border-neutral-200 w-full flex flex-col items-center">
                  <span className="font-general text-[11px] uppercase tracking-[0.2em] font-bold text-red-600">
                    Parent Organization
                  </span>
                  <p className="mt-1 font-circular-web text-xs text-neutral-500">
                    Shree Rahul Education Society & Allied Trusts
                  </p>
                  <p className="mt-2 font-general text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Est. 1992 &bull; Bhayandar, Maharashtra
                  </p>
                </div>
              </div>
            </BentoTilt>
          </div>

          {/* Right: Legacy Narrative */}
          <div className="re-scroll-reveal lg:col-span-7 flex flex-col justify-between">
            <div className="rounded-3xl bg-white/70 backdrop-blur-md border border-black/10 p-8 sm:p-10 shadow-lg flex flex-col justify-between h-full">
              <div>
                <span className="font-general text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-red-600 block mb-3">
                  Our Legacy
                </span>

                <h2 className="font-zentry text-3xl sm:text-4xl md:text-5xl font-black text-black leading-tight">
                  IMPARTING KNOWLEDGE FOR OVER <span className="text-red-600">30 YEARS</span>
                </h2>

                <div className="mt-6 space-y-4 font-circular-web text-neutral-700 text-sm sm:text-base leading-relaxed">
                  <p>
                    Our parent company,{" "}
                    <a
                      href="http://rahuleducation.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-black underline decoration-red-500 underline-offset-4 hover:text-red-600 transition-colors"
                    >
                      Rahul Education
                    </a>
                    , is a conglomerate of <strong>57+ institutions</strong> imparting knowledge across diverse
                    disciplines for over 30 years. With <strong>five registered educational societies</strong>, it
                    proudly nurtures a family of <strong>70,000+ students</strong> across Maharashtra and Uttar Pradesh.
                  </p>

                  <p>
                    Beginning with its first school in <strong>Bhayandar in 1992</strong>, Rahul Education has expanded
                    exponentially into streams such as Engineering, Architecture, Design Studies, Polytechnic, Law,
                    Degree Programs, College of Education, and Junior Colleges. Under the aegis of schools, it offers{" "}
                    <strong>CBSE, ICSE, CAIE (IGCSE), and SSC</strong> curriculums, establishing its strong presence
                    across <strong>Thane, Palghar, Pune, and Chandauli</strong> districts.
                  </p>

                  <p>
                    Ever since the commencement of its first school in Bhayandar, Rahul Education has diligently followed
                    the path of delivering <strong>360° quality education</strong>. It has come a long way with a deeper{" "}
                    <a
                      href="http://rahuleducation.org/vision-mission/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-black underline decoration-violet-500 underline-offset-4 hover:text-violet-700 transition-colors"
                    >
                      vision and mission
                    </a>
                    , unfurling great potential through institutions strategically positioned to empower learners of
                    every demographic.
                  </p>
                </div>
              </div>

              {/* Geographic Footprint - Clean Editorial Strip */}
              <div className="mt-8 pt-6 border-t border-neutral-200/80 flex flex-wrap items-center gap-x-8 gap-y-3 font-circular-web">
                <div>
                  <span className="block font-bold text-sm text-black">Thane</span>
                  <span className="block text-xs text-neutral-500">Maharashtra</span>
                </div>
                <div className="hidden sm:block h-7 w-px bg-neutral-300" />
                <div>
                  <span className="block font-bold text-sm text-black">Palghar</span>
                  <span className="block text-xs text-neutral-500">Maharashtra</span>
                </div>
                <div className="hidden sm:block h-7 w-px bg-neutral-300" />
                <div>
                  <span className="block font-bold text-sm text-black">Pune</span>
                  <span className="block text-xs text-neutral-500">Maharashtra</span>
                </div>
                <div className="hidden sm:block h-7 w-px bg-neutral-300" />
                <div>
                  <span className="block font-bold text-sm text-black">Chandauli</span>
                  <span className="block text-xs text-neutral-500">Uttar Pradesh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SILVER JUBILEE MILESTONE: RAHUL KNOWLEDGE CITY (UTTAR PRADESH)
      ========================================================================== */}
      <section className="re-scroll-reveal relative z-10 py-16 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
        <BentoTilt className="relative overflow-hidden rounded-3xl border border-black/15 bg-gradient-to-br from-neutral-900 via-zinc-900 to-black p-8 sm:p-14 text-white shadow-2xl">
          <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-red-600/20 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-violet-600/20 blur-[120px]" />

          <div className="relative z-10 max-w-4xl">
            <span className="font-general text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300 block mb-3">
              Silver Jubilee Milestone &bull; 2018
            </span>

            <h3 className="font-zentry text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              RAHUL KNOWLEDGE CITY, <span className="text-red-400">UTTAR PRADESH</span>
            </h3>

            <p className="mt-2 font-general text-xs sm:text-sm uppercase tracking-[0.2em] text-neutral-400">
              Fulfilling the Lifelong Dream of Founder Shri Ramadhar J. Tiwari in Mahuar Kalan
            </p>

            <div className="mt-8 space-y-4 font-circular-web text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                As the year 2018 marked a quarter of a century since the Group’s inception, the educational
                organization decided to commemorate the occasion by establishing{" "}
                <a
                  href="http://rahuleducation.org/knowledge-city-up/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white underline decoration-red-400 underline-offset-4 hover:text-red-300 transition-colors"
                >
                  Rahul Knowledge City
                </a>{" "}
                in the state of Uttar Pradesh. The underlying goal behind such a step was to elevate the standard of
                education within the country and spread its benefits to all.
              </p>

              <p>
                <a
                  href="http://rahuleducation.org/knowledge-city-up/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white underline decoration-red-400 underline-offset-4 hover:text-red-300 transition-colors"
                >
                  Rahul Knowledge City
                </a>{" "}
                is fully equipped with state-of-the-art{" "}
                <a
                  href="http://rahuleducation.org/infrastructure-facilities/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-yellow-300 underline underline-offset-4 hover:text-yellow-200 transition-colors"
                >
                  infrastructure and modern equipment
                </a>
                , bringing world-class educational standards to the people of Uttar Pradesh. This landmark initiative
                enabled the group to fulfill the lifelong dream of its founder,{" "}
                <strong className="text-white">Shri Ramadhar J. Tiwari</strong>, of establishing a thriving educational
                institution in his native place of <strong>Mahuar Kalan</strong>.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <a
                href="http://rahuleducation.org/knowledge-city-up/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-general text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-105 hover:bg-red-500"
              >
                <span>Explore Rahul Knowledge City</span>
                <FiArrowUpRight className="text-base" />
              </a>

              <a
                href="http://rahuleducation.org/infrastructure-facilities/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-general text-xs font-bold uppercase tracking-wider text-white backdrop-blur transition-all duration-300 hover:bg-white/20 hover:scale-105"
              >
                <span>View Campus Facilities</span>
                <FiExternalLink className="text-sm" />
              </a>
            </div>
          </div>
        </BentoTilt>
      </section>

      {/* =========================================================================
          ACADEMIC DISCIPLINES DIRECTORY
      ========================================================================== */}
      <section id="disciplines" className="relative z-10 py-16 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="re-scroll-reveal text-center max-w-3xl mx-auto mb-14">
          <span className="font-general text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-red-600 block mb-3">
            Academic Ecosystem
          </span>

          <h2 className="font-zentry text-3xl sm:text-5xl md:text-6xl font-black text-black leading-tight">
            COMPREHENSIVE ACADEMIC <span className="text-red-600">STREAMS</span>
          </h2>

          <p className="mt-4 font-circular-web text-neutral-600 text-sm sm:text-base leading-relaxed">
            From kindergarten to doctoral research, Rahul Education delivers accredited degree programs, professional
            colleges, and prestigious global school curricula.
          </p>
        </div>

        {/* 6 Category Bento Grid - Clean Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {academicDisciplines.map((item, index) => {
            return (
              <div key={index} className="re-scroll-reveal flex">
                <BentoTilt
                  className="relative flex-1 flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm hover:shadow-xl hover:border-black/30 transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative z-10">
                    {/* Clean Architectural Card Header */}
                    <div className="flex items-baseline justify-between border-b border-black/10 pb-3 mb-5">
                      <span className="font-general text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                        {item.tag}
                      </span>
                      {/* <span className="font-zentry text-lg font-bold text-neutral-400">
                        0{index + 1}
                      </span> */}
                    </div>

                    <h3 className="font-circular-web text-xl font-bold text-black group-hover:text-red-600 transition-colors">
                      {item.category}
                    </h3>

                    <p className="mt-2 font-circular-web text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Program links */}
                    <div className="mt-6 space-y-2.5 pt-5 border-t border-neutral-100">
                      {item.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-start justify-between gap-2 p-2 rounded-xl hover:bg-neutral-50 transition-colors"
                        >
                          <div className="flex flex-col">
                            <span className="font-circular-web text-xs font-bold text-neutral-900 group-hover/link:text-red-600 group-hover/link:underline underline-offset-2 flex items-center gap-1.5">
                              {link.name}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-general">{link.note}</span>
                          </div>
                          <FiArrowUpRight className="size-4 text-neutral-400 group-hover/link:text-red-600 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform shrink-0 mt-0.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </BentoTilt>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          UNIFIED VISION & MISSION BANNER
      ========================================================================== */}
      <section className="re-scroll-reveal relative z-10 py-12 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-white border border-black/10 p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-general text-xs uppercase tracking-[0.2em] text-red-600 font-bold block mb-2">
              Our Core Philosophy
            </span>
            <h3 className="font-zentry text-2xl sm:text-4xl font-black text-black leading-tight">
              EDUCATION FOR ALL &bull; PROGRESS THROUGH QUALITY
            </h3>
            <p className="mt-3 font-circular-web text-neutral-600 text-sm sm:text-base leading-relaxed">
              Each individual at Rahul Education works with the unified vision of providing education for all and
              achieving the mission of bringing progress through comprehensive, 360° quality education.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="http://rahuleducation.org/vision-mission/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-neutral-800 transition-all hover:scale-105"
            >
              <span>Vision & Mission</span>
              <FiArrowUpRight className="text-base" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLOSING CONNECT & HUB CTA
      ========================================================================== */}
      <section className="re-scroll-reveal relative z-10 py-16 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto">
        <BentoTilt className="relative overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-white via-white/80 to-red-100/50 p-8 sm:p-14 shadow-xl text-center">
          <div className="relative z-10 flex flex-col items-center">
            <span className="font-general text-xs font-semibold uppercase tracking-[0.25em] text-red-600 block mb-3">
              Official Web Portal
            </span>

            <h3 className="font-zentry text-3xl sm:text-5xl font-black text-black leading-tight">
              WANNA KNOW MORE ABOUT <span className="text-red-600">RAHUL EDUCATION</span>?
            </h3>

            <p className="mt-4 max-w-xl font-circular-web text-neutral-700 text-sm sm:text-base leading-relaxed">
              Explore our full institutional network, campus locations, admissions, and 30+ year milestones at the
              official Rahul Education portal.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://rahuleducation.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 font-general text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-red-600/30 transition-all duration-300 hover:scale-105 hover:bg-red-700 cursor-pointer"
              >
                <span>Visit Rahuleducation.org</span>
                <FiExternalLink className="text-base" />
              </a>

              <a
                href="#our-management"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-neutral-900 shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:scale-105"
              >
                <span>Meet Our Management</span>
                <TiLocationArrow className="text-base" />
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

export default AboutRahulEducation;
