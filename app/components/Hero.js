"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import data from "../data/siteData.json";
import { useTheme } from "../providers/ThemeProvider";

export default function Hero() {
  const [text, setText] = useState("");
  const idx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);
  const phrases = data.typewriterPhrases;
  const { theme } = useTheme();
  const isLight = theme === "light";

  /* typewriter */
  useEffect(() => {
    const timer = setTimeout(() => {
      const curr = phrases[idx.current];
      if (deleting.current) {
        charIdx.current--;
        setText(curr.substring(0, charIdx.current));
        if (charIdx.current === 0) { deleting.current = false; idx.current = (idx.current + 1) % phrases.length; }
      } else {
        charIdx.current++;
        setText(curr.substring(0, charIdx.current));
        if (charIdx.current === curr.length) { deleting.current = true; return; }
      }
    }, deleting.current ? 38 : (charIdx.current === phrases[idx.current]?.length ? 2400 : 58));
    return () => clearTimeout(timer);
  }, [text, phrases]);

  /* counters */
  const [counts, setCounts] = useState(data.heroStats.map(() => 0));
  const statsRef = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const targets = data.heroStats.map((s) => s.value);
    const startCount = () => {
      if (started.current) return;
      started.current = true;
      let frame = 0;
      const interval = setInterval(() => {
        frame++;
        setCounts(targets.map((t) => Math.min(Math.floor((t / 70) * frame), t)));
        if (frame >= 70) clearInterval(interval);
      }, 22);
    };

    // Start immediately after a short delay (Hero is always visible on load)
    const timer = setTimeout(startCount, 600);

    // Also use IntersectionObserver as backup
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) startCount();
    }, { threshold: 0.1 });
    if (statsRef.current) obs.observe(statsRef.current);

    return () => { obs.disconnect(); clearTimeout(timer); };
  }, []);

  const p = data.personal;

  const sectionBg = isLight ? "#ffffff" : "#000000";



  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 pt-28 pb-20 overflow-hidden"
      style={{ background: sectionBg, transition: "background 0.35s ease" }}
    >
      {/* Content */}
      <div className="relative z-10 max-w-[640px] text-center lg:text-left animate-fadeDown">
        {/* Court Badge */}
        <div className={`inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[3px] uppercase px-5 py-2 border rounded-full badge-glow mb-7 font-[family-name:var(--font-inter)] ${
          isLight
            ? "border-black/15 text-black bg-black/[0.04]"
            : "border-white/15 text-white bg-white/[0.04]"
        }`}>
          <i className="fas fa-gavel opacity-75" /> {p.court}&nbsp;|&nbsp;{p.location}
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.7rem,6.5vw,5.4rem)] font-extrabold leading-[1.04] mb-3">
          <span className="name-shimmer">{p.name}</span>
        </h1>

        <p className={`font-[family-name:var(--font-inter)] text-[clamp(0.82rem,2vw,1.05rem)] tracking-[3.5px] uppercase font-semibold mb-7 ${
          isLight ? "text-black" : "text-white"
        }`}>
          {p.title}
        </p>

        <div className="neon-line w-28 mb-7 hidden lg:block" />

        {/* Typewriter text */}
        <p className={`text-lg min-h-[32px] mb-10 font-bold font-[family-name:var(--font-inter)] ${
          isLight ? "text-black" : "text-white"
        }`}>
          <span className="typewriter-cursor">{text}</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-14">
          <a
            href="/contact"
            id="hero-consult-btn"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-[0.92rem] font-[family-name:var(--font-inter)] shadow-md transition-all duration-300 hover:-translate-y-1"
            style={{
              background: isLight ? "#000000" : "#ffffff",
              color: isLight ? "#ffffff" : "#000000",
            }}
          >
            <i className="fas fa-phone-alt text-[0.82rem]" style={{ color: isLight ? "#ffffff" : "#000000" }} /> {data.ui.buttons.bookConsultation}
          </a>
          <a
            href="#about"
            id="hero-about-btn"
            className={`inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-[0.92rem] font-[family-name:var(--font-inter)] border hover:-translate-y-1 transition-all duration-300 ${
              isLight
                ? "text-black border-black/15 hover:border-black/50 hover:bg-black/[0.02]"
                : "text-white border-white/15 hover:border-white/50 hover:bg-white/[0.04]"
            }`}
          >
            {data.ui.buttons.knowMore} <i className="fas fa-arrow-down text-[0.78rem]" />
          </a>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="flex items-center justify-center lg:justify-start glass rounded-2xl p-6">
          {data.heroStats.map((stat, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && <div className={`w-px h-14 hidden sm:block ${isLight ? "bg-black/10" : "bg-white/10"}`} />}
              <div className="text-center px-3 sm:px-7 md:px-10">
                <div className="flex items-end justify-center gap-0.5">
                  <span className={`font-[family-name:var(--font-display)] text-[2.1rem] sm:text-[2.6rem] font-extrabold leading-none ${
                    isLight ? "text-black" : "text-white"
                  }`}>
                    {counts[i]}
                  </span>
                  <span className={`text-[1.3rem] sm:text-2xl font-bold leading-none mb-1 ${
                    isLight ? "text-black" : "text-white"
                  }`}>{stat.suffix}</span>
                </div>
                <p className={`text-[0.55rem] sm:text-[0.7rem] uppercase tracking-[1.5px] sm:tracking-[2px] mt-1.5 font-bold font-[family-name:var(--font-inter)] ${
                  isLight ? "text-[#555558]" : "text-gray-muted"
                }`}>
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image with circular text */}
      <div className="relative z-10 w-[260px] h-[260px] sm:w-[290px] sm:h-[290px] lg:w-[410px] lg:h-[410px] flex-shrink-0 mt-16 lg:mt-0 animate-fadeLeft" style={{ overflow: "visible" }}>

        {/* Circular SVG Text — rotates slowly */}
        <div className="absolute inset-[-25px] animate-spin-slow" style={{ animationDuration: "25s", overflow: "visible" }}>
          <svg viewBox="0 0 200 200" width="100%" height="100%" overflow="visible">
            <defs>
              <path
                id="circleText"
                d="M 100,100 m -92,0 a 92,92 0 1,1 184,0 a 92,92 0 1,1 -184,0"
              />
            </defs>
            
            {/* Text tightly hugging the image but not touching */}
            <text
              fontSize="7.8"
              fontFamily="var(--font-inter), Inter, sans-serif"
              fontWeight="600"
              letterSpacing="3.5"
              fill="#8e8e93"
            >
              <textPath href="#circleText">
                {data.ui.heroBadge}
              </textPath>
            </text>
          </svg>
        </div>

        {/* Photo */}
        <Image
          src="/hero.png"
          alt={`${p.name} – ${p.court} Advocate`}
          fill
          className="rounded-full object-cover border-[2.5px] border-transparent hero-img-glow"
          priority
          unoptimized
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className={`text-[0.58rem] tracking-[3px] uppercase font-[family-name:var(--font-inter)] ${isLight ? "text-black/50" : "text-white/50"}`}>
          {data.ui.buttons.scroll}
        </span>
        <div
          className="scroll-dot relative w-6 h-11 border rounded-[20px]"
          style={{ borderColor: isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)" }}
        />
      </div>
    </section>
  );
}
