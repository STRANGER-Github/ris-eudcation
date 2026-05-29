import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FiChevronDown, FiChevronRight, FiMenu, FiX } from "react-icons/fi";

import Button from "./Button";

const menuConfig = [
  {
    title: "About Us",
    items: [
      { name: "About RIS", href: "#about-ris" },
      { name: "Our Management", href: "#our-management" },
      { name: "About Rahul Education", href: "#about-rahul-education" },
      { name: "Director’s Desk", href: "#directors-desk" },
      { name: "Our Advisory Panel", href: "#our-advisory-panel" },
      { name: "Affiliations & Collaborations", href: "#affiliations-collaborations" },
    ],
  },
  {
    title: "Campuses",
    items: [
      {
        name: "CBSE",
        items: [
          {
            name: "Mumbai",
            items: [
              { name: "Mira Road", href: "#cbse-mumbai-mira-road" },
              { name: "Nalasopara", href: "#cbse-mumbai-nalasopara" },
              { name: "Boisar", href: "#cbse-mumbai-boisar" },
            ],
          },
          {
            name: "Pune",
            items: [
              { name: "Hinjawadi", href: "#cbse-pune-hinjawadi" },
            ],
          },
          {
            name: "Varanasi",
            href: "#cbse-varanasi",
          },
          {
            name: "Latur",
            href: "#cbse-latur",
          },
        ],
      },
      {
        name: "ICSE",
        items: [
          {
            name: "Mumbai",
            items: [
              { name: "Shreeprastha Nalasopara", href: "#icse-mumbai-shreeprastha-nalasopara" },
            ],
          },
        ],
      },
      {
        name: "IGCSE",
        items: [
          {
            name: "Mumbai",
            items: [
              { name: "Mira Road", href: "#igcse-mumbai-mira-road" },
            ],
          },
          {
            name: "Pune",
            items: [
              { name: "Hinjawadi", href: "#igcse-pune-hinjawadi" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Bulletin",
    items: [
      { name: "Blogs", href: "#blogs" },
      { name: "Newsletter", href: "#newsletter" },
    ],
  },
  {
    title: "Admission",
    href: "#admission",
  },
  {
    title: "Professional Development",
    items: [
      {
        name: "Certification Programs",
        items: [
          { name: "Cambridge International Certificate in Teaching and Learning", href: "#pd-cambridge" },
          { name: "Early Childhood Care & Education Diploma", href: "#pd-ecc" },
        ],
      },
      {
        name: "Diploma Programs",
        items: [
          { name: "D.El.ED", href: "#pd-deled" },
        ],
      },
      {
        name: "Professional Programs",
        items: [
          {
            name: "Under Graduate",
            items: [
              { name: "B.Ed", href: "#pd-undergraduate-bed" },
            ],
          },
          {
            name: "Post Graduate",
            items: [
              { name: "MA – In Education", href: "#pd-postgraduate-ma" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Careers",
    href: "#careers",
  },
];

const NavBar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Mobile menu states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveSections, setMobileActiveSections] = useState({});

  // Sliding pill background states for desktop header menus
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, top: 0, height: 0 });

  const handleMouseEnter = (e, index) => {
    const trigger = e.currentTarget.querySelector("a, button") || e.currentTarget;
    if (trigger) {
      setHoveredIndex(index);
      const parentOffset = e.currentTarget.querySelector("a, button") ? e.currentTarget.offsetLeft : 0;
      const parentTop = e.currentTarget.querySelector("a, button") ? e.currentTarget.offsetTop : 0;
      setPillStyle({
        left: trigger.offsetLeft + parentOffset,
        width: trigger.offsetWidth,
        top: trigger.offsetTop + parentTop,
        height: trigger.offsetHeight,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle mobile accordion sections
  const toggleMobileSection = (title) => {
    setMobileActiveSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-4"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            {/* Logo and Apply Now button */}
            <div className="flex items-center gap-7">
              <img src="/img/RIS logo.png" alt="logo" className="w-10" />

              <Button
                id="apply-now-button"
                title="Apply Now"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-[#dfdff0] md:flex hidden items-center justify-center gap-1"
              />
            </div>

            {/* Navigation Links and Audio Button */}
            <div className="flex h-full items-center">
              {/* Desktop Navigation Links */}
              <div
                className="hidden md:flex items-center h-full relative"
                onMouseLeave={handleMouseLeave}
              >
                {/* Sliding Background Pill */}
                <div
                  className="absolute bg-blue-50 rounded-full transition-all duration-300 ease-out pointer-events-none z-0"
                  style={{
                    left: `${pillStyle.left}px`,
                    width: `${pillStyle.width}px`,
                    top: `${pillStyle.top}px`,
                    height: `${pillStyle.height}px`,
                    opacity: hoveredIndex !== null ? 1 : 0,
                  }}
                />

                {menuConfig.map((item, index) => {
                  if (!item.items) {
                    return (
                      <a
                        key={index}
                        href={item.href}
                        onMouseEnter={(e) => handleMouseEnter(e, index)}
                        className={clsx(
                          "relative ms-6 px-4 py-2 rounded-full font-general text-xs uppercase transition-all duration-300 cursor-pointer inline-flex items-center z-10",
                          hoveredIndex === index ? "text-black animate-none" : "text-blue-50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                        )}
                      >
                        {item.title}
                      </a>
                    );
                  }

                  // Determine dropdown display direction to prevent window overflow
                  const openLeft = index >= 3;

                  return (
                    <div
                      key={index}
                      className="relative group flex items-center h-full"
                      onMouseEnter={(e) => handleMouseEnter(e, index)}
                    >
                      <button
                        className={clsx(
                          "relative ms-6 px-4 py-2 rounded-full font-general text-xs uppercase transition-all duration-300 cursor-pointer flex items-center gap-1 focus:outline-none z-10",
                          hoveredIndex === index ? "text-black" : "text-blue-50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-medium"
                        )}
                      >
                        <span>{item.title}</span>
                        <FiChevronDown
                          className={clsx(
                            "transition-transform duration-300 group-hover:rotate-180 transition-colors duration-300",
                            hoveredIndex === index ? "text-black" : "text-blue-50"
                          )}
                        />
                      </button>

                      {/* Level 2 Dropdown */}
                      <div className="absolute top-full left-0 pt-7 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                        <div className="bg-black/95 backdrop-blur-md border border-white/10 rounded-xl p-3 w-60 shadow-2xl flex flex-col gap-1">
                          {item.items.map((sub, sIdx) => {
                            if (!sub.items) {
                              return (
                                <a
                                  key={sIdx}
                                  href={sub.href}
                                  className="text-white/70 hover:text-violet-300 hover:pl-1.5 transition-all duration-200 text-xs py-1.5 px-2 rounded hover:bg-white/5 text-left block"
                                >
                                  {sub.name}
                                </a>
                              );
                            }

                            return (
                              <div key={sIdx} className="relative group/l3">
                                <button className="text-white/70 hover:text-violet-300 font-medium text-xs transition-all duration-200 flex items-center justify-between w-full py-1.5 px-2 rounded hover:bg-white/5 focus:outline-none">
                                  <span>{sub.name}</span>
                                  <FiChevronRight className="text-[10px] text-white/40" />
                                </button>

                                {/* Level 3 Dropdown */}
                                <div
                                  className={clsx(
                                    "absolute -top-3 opacity-0 pointer-events-none group-hover/l3:opacity-100 group-hover/l3:pointer-events-auto transition-all duration-200 z-50",
                                    openLeft ? "right-full pr-4" : "left-full pl-4"
                                  )}
                                >
                                  <div className="relative bg-black/95 backdrop-blur-md border border-white/10 rounded-lg p-2 w-60 shadow-2xl flex flex-col gap-1">
                                    {sub.items.map((subSub, ssIdx) => {
                                      if (!subSub.items) {
                                        return (
                                          <a
                                            key={ssIdx}
                                            href={subSub.href}
                                            className="text-white/70 hover:text-violet-300 hover:pl-1 transition-all duration-200 text-xs py-1 px-2 rounded hover:bg-white/5 text-left block"
                                          >
                                            {subSub.name}
                                          </a>
                                        );
                                      }

                                      return (
                                        <div key={ssIdx} className="relative group/l4">
                                          <button className="text-white/70 hover:text-violet-300 font-medium text-xs transition-all duration-200 flex items-center justify-between w-full py-1 px-2 rounded hover:bg-white/5 focus:outline-none">
                                            <span>{subSub.name}</span>
                                            <FiChevronRight className="text-[10px] text-white/40" />
                                          </button>

                                          {/* Level 4 Dropdown */}
                                          <div
                                            className={clsx(
                                              "absolute -top-2 opacity-0 pointer-events-none group-hover/l4:opacity-100 group-hover/l4:pointer-events-auto transition-all duration-200 z-50",
                                              openLeft ? "right-full pr-[12px]" : "left-full pl-[12px]"
                                            )}
                                          >
                                            <div className="relative bg-black/95 backdrop-blur-md border border-white/10 rounded-lg p-2 w-60 shadow-2xl flex flex-col gap-1">
                                              {subSub.items.map((subSubSub, sssIdx) => (
                                                <a
                                                  key={sssIdx}
                                                  href={subSubSub.href}
                                                  className="text-white/70 hover:text-violet-300 hover:pl-1 transition-all duration-200 text-xs py-1 px-2 rounded hover:bg-white/5 text-left block"
                                                >
                                                  {subSubSub.name}
                                                </a>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Audio Button */}
              <button
                onClick={toggleAudioIndicator}
                className="ml-10 flex items-center space-x-0.5 focus:outline-none"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{
                      animationDelay: `${bar * 0.1}s`,
                    }}
                  />
                ))}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden ml-6 text-blue-50 p-2 focus:outline-none hover:text-violet-300 transition-colors duration-200"
              >
                <FiMenu className="size-6" />
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={clsx(
          "fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-black/95 backdrop-blur-lg border-l border-white/10 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out md:hidden shadow-2xl",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto pr-1">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <img src="/img/RIS logo 10x10.png" alt="logo" className="w-8" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white p-2 focus:outline-none hover:text-violet-300 transition-colors"
            >
              <FiX className="size-6" />
            </button>
          </div>

          {/* Drawer Content / Accordions */}
          <div className="flex-1 mt-6 space-y-4 text-left">
            {menuConfig.map((item, idx) => {
              if (!item.items) {
                return (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-lg font-semibold py-2 border-b border-white/5 block hover:text-violet-300 transition-colors"
                  >
                    {item.title}
                  </a>
                );
              }

              const isOpen = mobileActiveSections[item.title];
              return (
                <div key={idx} className="border-b border-white/5 py-2">
                  <button
                    onClick={() => toggleMobileSection(item.title)}
                    className="flex items-center justify-between w-full text-white text-lg font-semibold py-1 focus:outline-none"
                  >
                    <span>{item.title}</span>
                    <FiChevronDown
                      className={clsx(
                        "transition-transform duration-200 text-white/70",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="pl-4 mt-2 flex flex-col gap-2">
                      {item.items.map((sub, sIdx) => {
                        if (!sub.items) {
                          return (
                            <a
                              key={sIdx}
                              href={sub.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-white/70 hover:text-violet-300 py-1 block text-sm transition-colors text-left"
                            >
                              {sub.name}
                            </a>
                          );
                        }

                        const subKey = `${item.title}-${sub.name}`;
                        const isSubOpen = mobileActiveSections[subKey];
                        return (
                          <div key={sIdx} className="border-b border-white/5 pb-2 last:border-b-0">
                            <button
                              onClick={() => toggleMobileSection(subKey)}
                              className="flex items-center justify-between w-full text-white/90 text-sm font-medium py-1.5 focus:outline-none text-left"
                            >
                              <span>{sub.name}</span>
                              <FiChevronDown
                                className={clsx(
                                  "transition-transform duration-200 text-white/55",
                                  isSubOpen && "rotate-180"
                                )}
                              />
                            </button>

                            {isSubOpen && (
                              <div className="pl-3 mt-1 flex flex-col gap-1.5 border-l border-white/10">
                                {sub.items.map((subSub, ssIdx) => {
                                  if (!subSub.items) {
                                    return (
                                      <a
                                        key={ssIdx}
                                        href={subSub.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-white/60 hover:text-violet-300 py-1 block text-xs transition-colors text-left"
                                      >
                                        {subSub.name}
                                      </a>
                                    );
                                  }

                                  const subSubKey = `${item.title}-${sub.name}-${subSub.name}`;
                                  const isSubSubOpen = mobileActiveSections[subSubKey];
                                  return (
                                    <div key={ssIdx} className="flex flex-col gap-1">
                                      <button
                                        onClick={() => toggleMobileSection(subSubKey)}
                                        className="flex items-center justify-between w-full text-white/80 text-xs py-1 focus:outline-none text-left"
                                      >
                                        <span>{subSub.name}</span>
                                        <FiChevronDown
                                          className={clsx(
                                            "transition-transform duration-200 text-white/40",
                                            isSubSubOpen && "rotate-180"
                                          )}
                                        />
                                      </button>

                                      {isSubSubOpen && (
                                        <div className="pl-3 flex flex-col gap-1 border-l border-white/5">
                                          {subSub.items.map((subSubSub, sssIdx) => (
                                            <a
                                              key={sssIdx}
                                              href={subSubSub.href}
                                              onClick={() => setIsMobileMenuOpen(false)}
                                              className="text-white/50 hover:text-violet-300 py-0.5 block text-[11px] transition-colors text-left"
                                            >
                                              {subSubSub.name}
                                            </a>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Drawer Footer */}
          <div className="mt-8 pt-4 border-t border-white/10">
            <Button
              id="mobile-apply-now"
              title="Apply Now"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-[#dfdff0] flex items-center justify-center gap-1 w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
