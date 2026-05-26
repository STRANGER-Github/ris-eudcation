import React from "react";
import { FiPhone, FiMail, FiArrowUpRight } from "react-icons/fi";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-screen bg-gradient-to-b from-[#5542ff] to-[#b59cff] pt-24 pb-12 text-black px-6 sm:px-12 md:px-20 lg:px-28">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 w-full">
        {/* Logo and Contact Column */}
        <div className="md:w-1/4 flex flex-col items-start">
          <img
            src="https://ris.education/wp-content/uploads/2025/03/RIS-logo-10x10-01-1-300x231.png"
            alt="RIS Logo"
            className="h-64 md:h-[264px] w-auto object-contain select-none mb-5"
          />
          
          {/* Contact Details */}
          <div className="space-y-2.5 font-general text-[13px] text-black/70 font-medium">
            <a
              href="tel:+918291609368"
              className="flex items-center gap-2 hover:text-black transition-colors duration-300"
            >
              <FiPhone className="text-black/50 size-3.5" />
              <span>+91-8291609368</span>
            </a>
            <a
              href="mailto:rismr@rahuleducation.com"
              className="flex items-center gap-2 hover:text-black transition-colors duration-300 break-all"
            >
              <FiMail className="text-black/50 size-3.5" />
              <span>rismr@rahuleducation.com</span>
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 w-full md:w-3/4">
          {/* About Us Column */}
          <div>
            <span className="font-general text-[10px] uppercase tracking-[0.2em] text-black/50 mb-5 block font-semibold">
              About Us
            </span>
            <ul className="space-y-4">
              <li>
                <a
                  href="#about-ris"
                  className="font-circular-web text-[19px] md:text-[21px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-[#5542ff] hover:-rotate-[2deg] hover:scale-105 inline-flex items-center px-2.5 py-0.5 -ml-2.5 rounded-md w-fit"
                >
                  About RIS
                </a>
              </li>
              <li>
                <a
                  href="#management-desk"
                  className="font-circular-web text-[19px] md:text-[21px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-[#5542ff] hover:-rotate-[2deg] hover:scale-105 inline-flex items-center px-2.5 py-0.5 -ml-2.5 rounded-md w-fit"
                >
                  Management Desk
                </a>
              </li>
              <li>
                <a
                  href="#about-rahul-education"
                  className="font-circular-web text-[19px] md:text-[21px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-[#5542ff] hover:-rotate-[2deg] hover:scale-105 inline-flex items-center px-2.5 py-0.5 -ml-2.5 rounded-md w-fit"
                >
                  About Rahul Education
                </a>
              </li>
            </ul>
          </div>

          {/* Boards Offered Column */}
          <div>
            <span className="font-general text-[10px] uppercase tracking-[0.2em] text-black/50 mb-5 block font-semibold">
              Boards Offered
            </span>
            <ul className="space-y-4">
              <li>
                <a
                  href="#cbse"
                  className="group font-circular-web text-[19px] md:text-[21px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-[#5542ff] hover:-rotate-[2deg] hover:scale-105 inline-flex items-center gap-1 px-2.5 py-0.5 -ml-2.5 rounded-md w-fit"
                >
                  <span>CBSE</span>
                  <FiArrowUpRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="#igcse"
                  className="group font-circular-web text-[19px] md:text-[21px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-[#5542ff] hover:-rotate-[2deg] hover:scale-105 inline-flex items-center gap-1 px-2.5 py-0.5 -ml-2.5 rounded-md w-fit"
                >
                  <span>IGCSE</span>
                  <FiArrowUpRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="#cisce"
                  className="group font-circular-web text-[19px] md:text-[21px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-[#5542ff] hover:-rotate-[2deg] hover:scale-105 inline-flex items-center gap-1 px-2.5 py-0.5 -ml-2.5 rounded-md w-fit"
                >
                  <span>CISCE</span>
                  <FiArrowUpRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Academics Column */}
          <div>
            <span className="font-general text-[10px] uppercase tracking-[0.2em] text-black/50 mb-5 block font-semibold">
              Academics
            </span>
            <ul className="space-y-4">
              <li>
                <a
                  href="#curriculum"
                  className="font-circular-web text-[19px] md:text-[21px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-[#5542ff] hover:-rotate-[2deg] hover:scale-105 inline-flex items-center px-2.5 py-0.5 -ml-2.5 rounded-md w-fit"
                >
                  Curriculum
                </a>
              </li>
              <li>
                <a
                  href="#pre-primary"
                  className="font-circular-web text-[19px] md:text-[21px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-[#5542ff] hover:-rotate-[2deg] hover:scale-105 inline-flex items-center px-2.5 py-0.5 -ml-2.5 rounded-md w-fit"
                >
                  Pre-Primary
                </a>
              </li>
              <li>
                <a
                  href="#lower-primary"
                  className="font-circular-web text-[19px] md:text-[21px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-[#5542ff] hover:-rotate-[2deg] hover:scale-105 inline-flex items-center px-2.5 py-0.5 -ml-2.5 rounded-md w-fit"
                >
                  Lower Primary
                </a>
              </li>
              <li>
                <a
                  href="#upper-primary"
                  className="font-circular-web text-[19px] md:text-[21px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-[#5542ff] hover:-rotate-[2deg] hover:scale-105 inline-flex items-center px-2.5 py-0.5 -ml-2.5 rounded-md w-fit"
                >
                  Upper Primary
                </a>
              </li>
              <li>
                <a
                  href="#lower-secondary"
                  className="font-circular-web text-[19px] md:text-[21px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-[#5542ff] hover:-rotate-[2deg] hover:scale-105 inline-flex items-center px-2.5 py-0.5 -ml-2.5 rounded-md w-fit"
                >
                  Lower Secondary
                </a>
              </li>
              <li>
                <a
                  href="#upper-secondary"
                  className="font-circular-web text-[19px] md:text-[21px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-[#5542ff] hover:-rotate-[2deg] hover:scale-105 inline-flex items-center px-2.5 py-0.5 -ml-2.5 rounded-md w-fit"
                >
                  Upper Secondary
                </a>
              </li>
            </ul>
          </div>

          {/* Admissions Column */}
          <div>
            <span className="font-general text-[10px] uppercase tracking-[0.2em] text-black/50 mb-5 block font-semibold">
              Admissions
            </span>
            <ul className="space-y-4">
              <li>
                <a
                  href="#admission-process"
                  className="font-circular-web text-[19px] md:text-[21px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-[#5542ff] hover:-rotate-[2deg] hover:scale-105 inline-flex items-center px-2.5 py-0.5 -ml-2.5 rounded-md w-fit"
                >
                  Admission Process
                </a>
              </li>
              <li>
                <a
                  href="#admission-criteria"
                  className="font-circular-web text-[19px] md:text-[21px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-[#5542ff] hover:-rotate-[2deg] hover:scale-105 inline-flex items-center px-2.5 py-0.5 -ml-2.5 rounded-md w-fit"
                >
                  Admission Criteria
                </a>
              </li>
              <li>
                <a
                  href="#admission-enquiry"
                  className="font-circular-web text-[19px] md:text-[21px] font-medium text-black transition-all duration-300 hover:bg-black hover:text-[#5542ff] hover:-rotate-[2deg] hover:scale-105 inline-flex items-center px-2.5 py-0.5 -ml-2.5 rounded-md w-fit"
                >
                  Admission Enquiry
                </a>
              </li>
            </ul>

            {/* Downloads Buttons */}
            <div className="mt-8 flex flex-col gap-2.5">
              <span className="font-general text-[10px] uppercase tracking-[0.2em] text-black/50 mb-1 block font-semibold">
                Downloads
              </span>
              <a
                href="#app-store"
                className="bg-blue-50 text-black rounded-lg px-3 py-2 flex items-center gap-2.5 hover:bg-black hover:text-white transition-all duration-300 w-[170px] border border-black/5 shadow-sm select-none cursor-pointer group hover:scale-[1.02]"
              >
                <div className="w-6 flex justify-center items-center select-none">
                  <FaApple className="text-[22px] text-black group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] uppercase tracking-wider text-black/50 group-hover:text-white/60 transition-colors duration-300 leading-none mb-0.5">Available on</span>
                  <span className="text-[12px] font-bold leading-tight font-circular-web text-black group-hover:text-white transition-colors duration-300">App Store</span>
                </div>
              </a>
              <a
                href="#play-store"
                className="bg-blue-50 text-black rounded-lg px-3 py-2 flex items-center gap-2.5 hover:bg-black hover:text-white transition-all duration-300 w-[170px] border border-black/5 shadow-sm select-none cursor-pointer group hover:scale-[1.02]"
              >
                <div className="w-6 flex justify-center items-center select-none">
                  <FaGooglePlay className="text-[15px] text-black group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] uppercase tracking-wider text-black/50 group-hover:text-white/60 transition-colors duration-300 leading-none mb-0.5">Get it on</span>
                  <span className="text-[12px] font-bold leading-tight font-circular-web text-black group-hover:text-white transition-colors duration-300">Play Store</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="mt-28 flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
        <span className="font-general text-[10px] uppercase tracking-wider text-black/60 text-center sm:text-left select-none">
          ©RIS 2026. ALL RIGHTS RESERVED
        </span>
        <a
          href="#privacy-policy"
          className="font-general text-[10px] uppercase tracking-wider text-black/60 hover:text-black transition-colors duration-300"
        >
          PRIVACY POLICY
        </a>
      </div>
    </footer>
  );
};

export default Footer;
