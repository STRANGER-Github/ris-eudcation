import React from "react";
import AnimatedTitle from "./AnimatedTitle";

const stats = [
  { value: "23+", label: "AWARDS" },
  { value: "6+", label: "CITIES" },
  { value: "57+", label: "INSTITUTIONS" },
  { value: "33+", label: "INTERNATIONAL TIE UPS" },
  { value: "70000+", label: "STUDENTS" },
];

const cities = [
  { name: "MUMBAI", src: "/img/City_Mumbai.png" },
  { name: "PUNE", src: "/img/City_Pune.png" },
  { name: "VARANASI", src: "/img/City_Varanasi.png" },
  { name: "GUJARAT", src: "/img/City_Gujrat.png" },
];

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden shadow-2xl border border-white/10">

        {/* Decorative background glows */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-blue-600/20 blur-[100px]" />

        <div className="relative z-10 flex flex-col items-center px-4 md:px-12">

          {/* Top Center Legacy Text */}
          <p className="mb-16 font-general text-[12px] font-bold uppercase tracking-widest text-blue-100 text-center">
            Our Legacy of Excellence
          </p>

          {/* Heading Left, Stats Right */}
          <div className="flex w-full max-w-[90rem] flex-col xl:flex-row items-center justify-between gap-10 mb-24">
            <div className="flex justify-start text-left shrink-0">
              <h2 className="special-font font-zentry text-5xl font-black leading-[.9] md:text-[4.5rem] lg:text-[5rem] whitespace-nowrap">
                A Gr<b>o</b>wing C<b>o</b>mmunity
              </h2>
            </div>

            <div className="flex w-full xl:w-auto xl:flex-1 xl:justify-end overflow-hidden mt-10 xl:mt-0 xl:ml-10">
              <div className="flex w-full items-start justify-between gap-4 md:gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center space-y-2 text-center"
                  >
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-lg font-zentry tracking-wider">
                      {stat.value}
                    </h3>
                    <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-blue-50/70">
                      {stat.label === "INTERNATIONAL TIE UPS" ? "INTL. TIE UPS" : stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section: Our Presence */}
          <div className="w-full max-w-[90rem] border-t border-white/10 pt-16 flex flex-col items-center">
            <AnimatedTitle
              title="O<b>u</b>r Pres<b>e</b>nce"
              containerClass="mb-16 w-full text-center !text-4xl md:!text-5xl tracking-widest"
            />

            <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-20 w-full max-w-7xl px-4">
              {cities.map((city, index) => (
                <div key={index} className="flex flex-col items-center justify-center space-y-6 group cursor-pointer">
                  <div className="h-20 w-24 md:h-28 md:w-32 relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
                    <img
                      src={city.src}
                      alt={city.name}
                      className="object-contain size-full drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] opacity-80 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <p className="text-sm md:text-base font-bold tracking-widest uppercase text-blue-50/90 group-hover:text-white transition-colors">
                    {city.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
