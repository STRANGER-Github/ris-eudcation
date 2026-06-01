import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import gsap from "gsap";
import Button from "./Button";

const AdmissionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-admission-popup", handleOpen);
    return () => window.removeEventListener("open-admission-popup", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        "#admission-modal-content",
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        "#admission-modal-backdrop",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      
      gsap.fromTo(
        ".animate-left-element",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to("#admission-modal-content", {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: "power3.in",
    });
    gsap.to("#admission-modal-backdrop", {
      opacity: 0,
      duration: 0.4,
      onComplete: () => setIsOpen(false),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
      {/* Backdrop */}
      <div
        id="admission-modal-backdrop"
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        id="admission-modal-content"
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10 flex flex-col md:flex-row"
      >
        {/* Left Side: Branding / Info */}
        <div className="relative flex flex-col justify-between bg-blue-75 p-8 md:w-5/12 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-violet-300 blur-[80px] opacity-50" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-yellow-300 blur-[80px] opacity-30" />

          <div className="relative flex flex-col justify-center items-center z-10">
            <img src="/img/RIS logo 10x10.png" alt="logo" className="w-60 mb-6 animate-left-element opacity-0" />
            <h2 className="special-font uppercase font-zentry font-black text-4xl leading-[0.9] text-black animate-left-element opacity-0">
              ADMISSIONS O<b>P</b>EN
            </h2>
            <div className="mt-4 inline-flex items-center justify-center rounded-full bg-black px-5 py-1.5 shadow-md animate-left-element opacity-0">
              <span className="font-general text-xs font-medium uppercase tracking-[0.2em] text-white/90">
                For AY 2026-27
              </span>
            </div>

            <p className="mt-12 text-center font-robert-medium text-xl text-black/80 max-w-xs leading-snug animate-left-element opacity-0">
              Bringing <span className="font-bold text-black border-b-2 border-violet-400 pb-0.5">Global Education</span> closer to your child.
            </p>
          </div>


        </div>

        {/* Right Side: Form */}
        <div className="relative bg-zinc-950 p-8 md:w-7/12">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors focus:outline-none bg-white/5 rounded-full p-2 hover:bg-white/10"
          >
            <FiX className="size-5" />
          </button>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-1">
              Enquire Now
            </h3>
            <p className="text-sm text-white/50 font-robert-regular">
              Fill this form to get Fee and other details
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Parent Name */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wide ml-1">Parent Name</label>
                <input
                  type="text"
                  placeholder="Enter parent's name"
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-violet-300 focus:outline-none focus:ring-1 focus:ring-violet-300 transition-all"
                  required
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wide ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-violet-300 focus:outline-none focus:ring-1 focus:ring-violet-300 transition-all"
                  required
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-white/70 uppercase tracking-wide ml-1">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-violet-300 focus:outline-none focus:ring-1 focus:ring-violet-300 transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Select School */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wide ml-1">Select School</label>
                <select
                  className="w-full rounded-lg bg-zinc-900 border border-white/10 px-4 py-2.5 text-white focus:border-violet-300 focus:outline-none focus:ring-1 focus:ring-violet-300 transition-all appearance-none cursor-pointer"
                  required
                  defaultValue=""
                >
                  <option value="" disabled className="text-white/30">Select a branch</option>
                  <option value="Mira Road">Mira Road</option>
                  <option value="Shreeprastha Nalasopara">Shreeprastha Nalasopara</option>
                  <option value="Patankar Park Nalasopara">Patankar Park Nalasopara</option>
                  <option value="Boisar">Boisar</option>
                  <option value="Varnasi">Varnasi</option>
                  <option value="Hinjwadi Pune">Hinjwadi Pune</option>
                  <option value="Nanded">Nanded</option>
                  <option value="Latur">Latur</option>
                </select>
              </div>

              {/* Select Grade */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wide ml-1">Select Grade</label>
                <select
                  className="w-full rounded-lg bg-zinc-900 border border-white/10 px-4 py-2.5 text-white focus:border-violet-300 focus:outline-none focus:ring-1 focus:ring-violet-300 transition-all appearance-none cursor-pointer"
                  required
                  defaultValue=""
                >
                  <option value="" disabled className="text-white/30">Select grade</option>
                  <option value="Nursery">Nursery</option>
                  <option value="K1">K1</option>
                  <option value="K2">K2</option>
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                  <option value="Grade 3">Grade 3</option>
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <Button
                id="submit-enquiry"
                title="Enquire Now"
                containerClass="w-full bg-violet-300 flex-center text-black py-3 rounded-lg font-bold hover:bg-violet-400 transition-colors"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPopup;
