import gsap from "gsap";
import { useRef, useState } from "react";
import { BentoTilt } from "./Features";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {
  const frameRef = useRef(null);
  const cardRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);

  const handleCardMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          holistic learning
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="O<b>u</b>r 6 Sig<b>m</b>a <br /> Appr<b>o</b>ach"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="relative flex w-full justify-center mt-10 md:mt-12">
            <img
              ref={frameRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseLeave}
              onMouseEnter={handleMouseLeave}
              src="/videos/6-sigma-approch.webp"
              alt="6 Sigma Approach"
              className="max-h-[50vh] md:max-h-[60vh] object-contain relative z-20"
            />
          </div>
        </div>

        <div className="mt-10 flex w-full justify-center px-4 md:px-10">
          <BentoTilt className="w-full max-w-4xl">
            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseEnter={() => setHoverOpacity(1)}
              onMouseLeave={() => setHoverOpacity(0)}
              className="relative flex w-full flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md md:p-12 cursor-pointer"
            >

              {/* Custom Hover Cursor Glow */}
              <div
                className="pointer-events-none absolute -inset-px transition duration-300 z-0"
                style={{
                  opacity: hoverOpacity,
                  background: `radial-gradient(400px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(93, 63, 211, 0.4), transparent 40%)`,
                }}
              />

              {/* Subtle glowing orbs for premium feel */}
              <div className="pointer-events-none absolute -left-1/4 -top-1/4 h-[50%] w-[50%] rounded-full bg-violet-600/20 blur-[80px]" />
              <div className="pointer-events-none absolute -bottom-1/4 -right-1/4 h-[50%] w-[50%] rounded-full bg-blue-600/20 blur-[80px]" />

              <div className="relative z-10 flex flex-col items-center">
                <p className="mb-6 text-center font-circular-web text-lg leading-relaxed text-blue-50 md:text-xl">
                  At RIS, we advocate a well-rounded and holistic curriculum that encourages our learners to have a multi-faceted learning experience.
                </p>
                <p className="mb-10 text-center font-circular-web text-lg leading-relaxed text-blue-50/70 md:text-xl">
                  Our curriculum revolves around our <strong className="font-bold tracking-wider text-white">‘SIX SIGMA’</strong> program that enables our learners in the better understanding and application concepts, while signifying the importance of innovation, compassion, values, health and community.
                </p>

                <Button
                  id="realm-btn"
                  title="explore curriculum"
                  containerClass="w-full md:w-auto"
                />
              </div>
            </div>
          </BentoTilt>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
