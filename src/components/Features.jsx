import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
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
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      {src.endsWith('.mp4') || src.endsWith('.webm') ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      ) : (
        <img
          src={src}
          alt=""
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      )}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const facilities = [
  { id: 1, src: "videos/library.webp", title: "Library" },
  { id: 2, src: "videos/swimming-pool.webp", title: "Swimming Pool" },
  { id: 3, src: "videos/music-room.webp", title: "Music Room" },
  { id: 4, src: "videos/biology-lab.webp", title: "Biology Lab" },
  { id: 5, src: "videos/physics-lab.webp", title: "Physics Lab" },
  { id: 6, src: "videos/chemistry-lab.webp", title: "Chemistry Lab" },
];

const FacilitiesGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % facilities.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute left-0 top-0 size-full overflow-hidden bg-black">
      {facilities.map((fac, idx) => (
        <div
          key={fac.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          <img
            src={fac.src}
            alt={fac.title}
            className={`size-full object-cover object-center transition-transform duration-[4000ms] ease-out ${idx === currentIndex ? "scale-110" : "scale-100"
              }`}
          />
        </div>
      ))}
      {/* Current facility badge */}
      <div className="absolute bottom-6 right-6 z-30 border-hsla flex w-fit items-center gap-2 rounded-full bg-black/50 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all">
        {facilities[currentIndex].title}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <h2 className="bento-title special-font mb-10 text-5xl md:text-7xl text-blue-50">
          Why Ch<b>o</b>ose R<b>I</b>S
        </h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold uppercase tracking-widest text-white">Holistic Development</h3>
            <p className="font-circular-web text-base leading-relaxed text-blue-50 opacity-70">
              We focus on holistic learning and the essence of engaging all aspects of the learner including mind, body and emotion.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold uppercase tracking-widest text-white">Quality Education</h3>
            <p className="font-circular-web text-base leading-relaxed text-blue-50 opacity-70">
              We aim to provide quality academic as well as co-curricular education to promote the intellectual and emotional growth.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold uppercase tracking-widest text-white">Nurturing Environment</h3>
            <p className="font-circular-web text-base leading-relaxed text-blue-50 opacity-70">
              We provide a nurturing environment for all our learners in order to help them reach their full potential and excel in all fields.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold uppercase tracking-widest text-white">Modern Infrastructure</h3>
            <p className="font-circular-web text-base leading-relaxed text-blue-50 opacity-70">
              Our schools are equipped with state-of-the-art infrastructure and facilities to help learners learn in the best surroundings.
            </p>
          </div>
        </div>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <div className="relative size-full overflow-hidden">
          <FacilitiesGallery />

          <div className="relative z-30 flex size-full flex-col justify-end items-start text-left p-4 pointer-events-none">
            <h1
              className="bento-title special-font  leading-none text-white"
              style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0px 4px 10px rgba(0,0,0,0.5)" }}
            >
              W<b>o</b>rld Class Facilities
            </h1>
          </div>
        </div>
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        {/* <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                zig<b>m</b>a
              </>
            }
            description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            isComingSoon
          />
        </BentoTilt> */}

        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <div className="relative size-full overflow-hidden">
            <img
              src="videos/image.jpg"
              alt="Admission Open"
              className="absolute left-0 top-0 size-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="relative z-10 flex size-full flex-col justify-end p-4 md:p-6 text-blue-50">
              <div className="flex w-full flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="bento-title special-font mb-2 leading-none">
                    Admissi<b>o</b>n Op<b>e</b>n
                  </h1>
                  <p className="mt-2 text-xl md:text-3xl font-semibold tracking-widest text-white-200 uppercase drop-shadow-md">
                    2026 Batch
                  </p>
                </div>
                <div className="self-end md:self-auto md:mb-1 shrink-0">
                  <a
                    href="https://ris.education"
                    target="_blank"
                    rel="noreferrer"
                    className="border-hsla flex w-fit items-center gap-2 rounded-full bg-black/50 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
                  >
                    Visit us at ris.education
                  </a>
                </div>
              </div>
            </div>
          </div>
        </BentoTilt>

        {/* <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                n<b>e</b>xus
              </>
            }
            description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            isComingSoon
          />
        </BentoTilt> */}

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <div className="relative size-full overflow-hidden">
            <img
              src="videos/infrastructure.jpg"
              alt="School Life"
              className="absolute left-0 top-0 size-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            {/* Elegant dark gradient for perfect text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 flex size-full flex-col justify-end p-2 text-blue-50">
              <div className="flex items-center justify-between gap-6">
                <h1 className="bento-title special-font leading-none m-0 flex-shrink-0">
                  Infrastr<b>u</b>cture
                </h1>
                <p className="max-w-lg text-sm md:text-base font-medium leading-relaxed text-blue-100 drop-shadow-md">
                  Top-tier facilities and education equipping students to ‘Be the Best.’
                </p>
              </div>
            </div>
          </div>
        </BentoTilt>

        {/* <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                az<b>u</b>l
              </>
            }
            description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            isComingSoon
          />
        </BentoTilt> */}

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <div className="relative size-full overflow-hidden">
            <img
              src="videos/school life.jpg"
              alt="Infrastructure"
              className="absolute left-0 top-0 size-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            {/* Elegant dark gradient for perfect text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 flex size-full flex-col justify-end p-2 text-blue-50">
              <div className="flex items-center justify-between gap-6">
                <h1 className="bento-title special-font leading-none m-0 flex-shrink-0">
                  Sch<b>o</b>ol L<b>i</b>fe
                </h1>
                <p className="max-w-lg text-sm md:text-base font-medium leading-relaxed text-blue-100 drop-shadow-md">
                  Beyond academics, we nurture holistic development with a global curriculum in a supportive environment.
                </p>
              </div>
            </div>
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        {/* <BentoTilt className="bento-tilt_2">
          <video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt> */}

        <BentoTilt className="bento-tilt_2">
          <div className="relative size-full overflow-hidden">
            <img
              src="videos/featured image.jpg"
              alt="Curriculum"
              className="absolute left-0 top-0 size-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            {/* Elegant dark gradient for perfect text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 flex size-full flex-col justify-end p-2 text-blue-50">
              <div className="flex items-center justify-between gap-6">
                <h1 className="bento-title special-font leading-none m-0 flex-shrink-0">
                  C<b>u</b>rric<b>u</b>lum
                </h1>
                <p className="max-w-lg text-sm md:text-base font-medium leading-relaxed text-blue-100 drop-shadow-md">
                  Our ‘SIX SIGMA’ program fosters practical learning, innovation, compassion, values, health, and community.
                </p>
              </div>
            </div>
          </div>
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
