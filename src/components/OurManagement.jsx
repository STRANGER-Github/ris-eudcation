import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { FaQuoteLeft, FaGraduationCap, FaAward, FaBuildingColumns } from "react-icons/fa6";
import { TiLocationArrow } from "react-icons/ti";
import clsx from "clsx";

import AnimatedTitle from "./AnimatedTitle";
import { BentoTilt } from "./Features";

gsap.registerPlugin(ScrollTrigger);

// Executive Leader Card Component with alternating editorial presentation
const LeaderShowcaseCard = ({
  id,
  name,
  role,
  image,
  quote,
  highlight,
  qualifications = [],
  badge,
  isReversed = false,
  accentColor = "violet",
}) => {
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
    <div id={id} className="management-card w-full scroll-mt-28">
      <BentoTilt className="w-full">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHoverOpacity(1)}
          onMouseLeave={() => setHoverOpacity(0)}
          className={clsx(
            "group relative overflow-hidden rounded-[32px] border border-neutral-300/80 bg-white/95 p-6 sm:p-9 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-700 hover:border-violet-400 hover:shadow-[0_25px_60px_rgba(85,66,255,0.12)]",
            "flex flex-col gap-8 lg:gap-12 items-center",
            isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
          )}
        >
          {/* Subtle cursor-following spotlight glow */}
          <div
            className="pointer-events-none absolute -inset-px transition duration-300"
            style={{
              opacity: hoverOpacity,
              background: `radial-gradient(450px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(85,66,255,0.08), transparent 70%)`,
            }}
          />

          {/* Portrait Column */}
          <div className="w-full lg:w-[42%] shrink-0 flex flex-col items-center">
            <div className="relative w-full max-w-[380px] aspect-square rounded-3xl overflow-hidden bg-[#0c0f1d] shadow-[0_15px_35px_rgba(0,0,0,0.15)] border border-neutral-800/40 group-hover:border-violet-500/40 transition-all duration-700">
              <img
                src={image}
                alt={name}
                className="size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Status Badge */}
              {badge && (
                <div className="absolute top-4 left-4 z-10 rounded-md border border-white/10 bg-black/80 px-3 py-1 font-general text-[11px] font-semibold uppercase tracking-wider text-yellow-300 backdrop-blur-md shadow-md">
                  <span>{badge}</span>
                </div>
              )}

              {/* Ambient image corner lighting */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
            </div>

            {/* Sub-label under portrait for mobile clarity */}
            <div className="mt-4 text-center lg:hidden">
              <h3 className="font-zentry text-2xl font-bold uppercase text-neutral-900 tracking-wide">
                {name}
              </h3>
              <p className="font-general text-xs font-semibold uppercase tracking-wider text-violet-700 mt-1">
                {role}
              </p>
            </div>
          </div>

          {/* Editorial Content & Quote Column */}
          <div className="w-full lg:w-[58%] flex flex-col justify-between text-left relative z-10">
            {/* Header / Identity (visible on desktop) */}
            <div className="hidden lg:block border-b border-neutral-200/80 pb-5">
              <div className="flex items-center gap-2">
                <span className="font-general text-xs uppercase tracking-[0.25em] text-violet-700 font-semibold">
                  Executive Message
                </span>
                <span className="text-neutral-400 text-xs">•</span>
                <span className="font-general text-xs uppercase tracking-widest text-neutral-500">
                  Rahul Education
                </span>
              </div>
              <h3 className="mt-2 font-zentry text-3xl xl:text-4xl font-black uppercase text-neutral-900 tracking-wide leading-tight">
                {name}
              </h3>
              <p className="font-general text-sm sm:text-base font-bold uppercase tracking-wider text-violet-800 mt-1">
                {role}
              </p>
            </div>

            {/* Core Quote Section */}
            <div className="relative mt-5 lg:mt-6">
              {/* Decorative quotation mark */}
              {/* <div className="text-violet-400/25 absolute -top-4 -left-3 text-5xl sm:text-6xl select-none pointer-events-none">
                <FaQuoteLeft />
              </div> */}

              {/* Key Highlight Hook */}
              {highlight && (
                <p className="relative font-circular-web text-base sm:text-lg font-semibold text-neutral-900 leading-snug italic mb-4 pl-6 border-l-2 border-violet-500">
                  “{highlight}”
                </p>
              )}

              {/* Full Detailed Message */}
              <p className="font-circular-web text-sm sm:text-base lg:text-[16px] xl:text-[17px] leading-relaxed text-neutral-700 font-medium pl-6">
                ‘{quote}’
              </p>
            </div>

            {/* Academic Qualifications & Credentials */}
            {qualifications.length > 0 && (
              <div className="mt-6 pt-5 border-t border-neutral-200/80">
                <div className="flex items-center gap-2 mb-2.5">
                  <FaGraduationCap className="text-violet-600 text-sm" />
                  <span className="font-general text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                    Academic Qualifications & Fellowships
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {qualifications.map((qual, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-lg border border-violet-200 bg-violet-50/80 px-2.5 py-1 font-general text-xs font-semibold text-violet-900 shadow-sm"
                    >
                      {qual}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Signature Line */}
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-neutral-200/60">
              <span className="font-zentry text-xs font-bold uppercase tracking-widest text-neutral-500">
                Rahul International School Leadership
              </span>
              <span className="inline-flex items-center gap-1.5 font-general text-xs font-semibold text-violet-700">
                {/* <span>Verified Authority</span> */}
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </span>
            </div>
          </div>

          {/* Bottom Accent Glow Strip */}
          <div
            className={clsx(
              "absolute bottom-0 left-0 right-0 h-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
              accentColor === "gold"
                ? "bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600"
                : "bg-gradient-to-r from-violet-600 via-indigo-500 to-yellow-400"
            )}
          />
        </div>
      </BentoTilt>
    </div>
  );
};

const OurManagement = () => {
  const containerRef = useRef(null);

  const managementMembers = [
    {
      id: "shri-lr-tiwari",
      name: "Shri L. R. Tiwari",
      role: "Founder Chairman, Rahul Education",
      badge: "Founder Chairman",
      accentColor: "gold",
      image: "/img/People/Management/Shri_Lallan_Tiwari_Chairman.webp",
      highlight:
        "In my 30+ years as an educator, I have realized that good education is the path to success.",
      quote:
        "In my 30+ years as an educator, I have realized that good education is the path to success, and every child has a right to an education that offers them quality academic knowledge and all-around development. At RIS, our academic heritage is important to us, and we wish to pass it on to our learners to make them better citizens of the world. I hereby warmly welcome you to the RIS family.",
      qualifications: [],
    },
    {
      id: "smt-kl-tiwari",
      name: "Smt. K. L. Tiwari",
      role: "President, Rahul Education",
      badge: "President",
      accentColor: "gold",
      image: "/img/People/Management/Shri-Kanti-Tiwari_President.jpg",
      highlight:
        "We strongly believe in the transformative power of good education and the changes it can bring with it.",
      quote:
        "We founded RIS more than two decades ago, with a vision to bring all-round, quality education to learners across the country. What began as one school has now expanded and emerged as one of the leading educational institutes within the country. We aim to continue our years of dedication and further our legacy within the field of education, by providing our learners with the best academic, moral and extra-curricular knowledge. We strongly believe in the transformative power of good education and the changes it can bring with it.",
      qualifications: [],
    },
    {
      id: "shri-rahul-tiwari",
      name: "Shri. Rahul L. Tiwari",
      role: "Secretary, Rahul Education",
      badge: "Secretary",
      accentColor: "violet",
      image: "/img/People/Management/Mr_Rahul_Tiwari_Secretary.webp",
      highlight:
        "Tech-enabled learning, specialized teaching and digital platforms depict the future of education at RIS.",
      quote:
        "RIS has represented quality education and I am pleased with everything we have achieved. Our motto has always been the pursuance of all-round excellence in education, and we aim to further this heritage with the same belief system. With changing times, our goal is to encourage flexibility within the school system in order to accommodate the transforming academic codes of the country. Tech-enabled learning, specialized teaching and digital platforms depict the future of education at RIS.",
      qualifications: [],
    },
    {
      id: "smt-krishna-tiwari",
      name: "Smt. Krishna R. Tiwari",
      role: "Jt. Secretary, Rahul Education",
      badge: "Joint Secretary",
      accentColor: "violet",
      image: "/img/People/Management/Mrs_Krishna_Tiwari_JointSecretary.webp",
      highlight:
        "Our dedication to quality education remains unchanged, while our methods will constantly evolve.",
      quote:
        "At RIS, we have maintained our mission of empowering the young minds of our country with excellent all-round education. Our aim going forward is to reorganize our teaching and learning methods to fit the changing times. We believe that education in the country is drastically changing, and it is our responsibility to prepare our learners for the future with the best tools available now. Although our dedication to quality education remains unchanged, our methods will be constantly evolving to provide our learners what they deserve.",
      qualifications: ["M.Sc.", "M.Ed.", "P.G.D.Ed.M.", "D.D.H.M.", "D.FS.M."],
    },
    {
      id: "mr-utsav-tiwari",
      name: "Mr. Utsav Tiwari",
      role: "COO, Rahul Education",
      badge: "Chief Operating Officer",
      accentColor: "violet",
      image: "/img/People/Management/Mr_Utsav_Tiwari_COO.webp",
      highlight:
        "A focus on creativity, critical thinking, and all-round growth continues to define the educational experience at RIS.",
      quote:
        "RIS has always stood for excellence in education, and I am proud of all that we have achieved together. Our motto has been to nurture holistic development and academic rigor in every student, and we remain committed to this vision. In today’s rapidly changing world, our goal is to integrate innovative teaching methods, technology-enabled learning, and modern pedagogies to prepare students for the challenges of the future. A focus on creativity, critical thinking, and all-round growth continues to define the educational experience at RIS.",
      qualifications: ["M.Sc.", "M.Ed.", "P.G.D.Ed.M.", "D.D.H.M.", "D.FS.M."],
    },
  ];

  useGSAP(
    () => {
      // Hero entrance reveal
      gsap.fromTo(
        ".mgmt-hero-reveal",
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

      // Management cards scroll reveal
      gsap.utils.toArray(".management-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
          clearProps: "transform",
        });
      });

      // Quick-jump bar reveal
      gsap.fromTo(
        ".mgmt-quicknav-btn",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.5)",
          delay: 0.4,
          clearProps: "all",
        }
      );

      // Visibility guarantee on refresh
      const guaranteeVisibilityOnRefresh = () => {
        document
          .querySelectorAll(".mgmt-hero-reveal, .management-card, .mgmt-quicknav-btn")
          .forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.95) {
              gsap.set(el, { opacity: 1, y: 0, scale: 1, clearProps: "all" });
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

  const scrollToLeader = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div
      ref={containerRef}
      id="our-management-page"
      className="relative flex-1 w-full bg-[#dfdff0] selection:bg-violet-600 selection:text-white"
    >
      {/* =========================================================================
          HERO SECTION: Monumental Headline & Quick Navigation Pills
      ========================================================================== */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-36 pb-2 px-6 sm:px-10 lg:px-20 text-center text-black overflow-hidden border-b border-neutral-300/40">
        {/* Subtle radial ambient wash */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-violet-400/15 blur-[160px]" />

        {/* Monumental Headline */}
        <div className="mgmt-hero-reveal w-full max-w-7xl">
          <AnimatedTitle
            title="OUR M<b>A</b>NAGEMENT"
            containerClass="!text-black text-center !text-6xl sm:!text-8xl md:!text-9xl lg:!text-[11vw] !leading-[0.8] tracking-tight uppercase"
          />
          <div className="mt-4 sm:mt-6 text-center">
            <span className="font-general text-xs sm:text-sm uppercase tracking-[0.25em] text-violet-700 font-semibold block">
              Visionary Leadership &bull; Rahul Education Governance
            </span>
            <p className="mt-3 max-w-2xl mx-auto font-circular-web text-sm sm:text-base text-neutral-600">
              Meet the educational pioneers, strategists, and executive mentors
              whose shared vision inspires excellence across every Rahul International School campus.
            </p>
          </div>
        </div>

        {/* Quick Jump Pills for Immediate Executive Access */}
        <div className="mgmt-hero-reveal mt-10 w-full max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {managementMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => scrollToLeader(member.id)}
              className="mgmt-quicknav-btn group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 font-general text-xs font-semibold uppercase tracking-wider text-neutral-800 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500 hover:bg-black hover:text-white hover:shadow-md cursor-pointer"
            >
              {/* <span>{member.name}</span> */}
              <span className="text-violet-600 group-hover:text-yellow-300 transition-colors duration-300">
                &bull;
              </span>
              <span className="text-neutral-500 group-hover:text-neutral-300 text-[11px]">
                {member.badge}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SHOWCASE SECTION: High-Fashion Alternating Editorial Masterpieces
      ========================================================================== */}
      <section className="relative z-10 py-16 sm:py-24 px-6 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl space-y-12 sm:space-y-16">
          {managementMembers.map((member, index) => (
            <LeaderShowcaseCard
              key={member.id}
              id={member.id}
              name={member.name}
              role={member.role}
              badge={member.badge}
              image={member.image}
              highlight={member.highlight}
              quote={member.quote}
              qualifications={member.qualifications}
              accentColor={member.accentColor}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          BOTTOM VISION BANNER: Institutional Legacy & Admission CTA
      ========================================================================== */}
      <section className="relative z-10 py-20 px-6 sm:px-10 lg:px-20 bg-gradient-to-b from-[#dfdff0] to-[#d2d2ea] border-t border-neutral-300/60 text-center">
        <div className="mx-auto max-w-4xl">
          <BentoTilt className="w-full">
            <div className="rounded-[36px] border border-black/10 bg-white/95 p-8 sm:p-14 shadow-[0_25px_60px_rgba(85,66,255,0.08)] backdrop-blur-xl">
              <span className="font-general text-xs uppercase tracking-[0.25em] text-violet-700 font-semibold block mb-3">
                Legacy of Excellence
              </span>
              <h2 className="special-font font-zentry text-3xl sm:text-5xl font-black uppercase text-neutral-900 tracking-wide leading-tight">
                BUILDING W<b>O</b>RLD CITIZENS T<b>O</b>GETHER
              </h2>
              <p className="mt-5 font-circular-web text-base sm:text-lg text-neutral-700 font-medium leading-relaxed max-w-2xl mx-auto">
                Under the seasoned direction of our management, Rahul International School equips every learner with intellectual rigor, creative confidence, and global citizenship.
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
                  href="#about-ris"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-neutral-900 shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:scale-105"
                >
                  <span>Explore About RIS</span>
                </a>
              </div>
            </div>
          </BentoTilt>
        </div>
      </section>
    </div>
  );
};

export default OurManagement;
