"use client";
import data from "../data/siteData.json";
import { useTheme } from "../providers/ThemeProvider";

const linkMap = {
  "Home":           "#home",
  "About":          "#about",
  "Practice Areas": "#practice",
  "Milestones":     "#milestones",
  "Contact":        "/contact",
};

export default function Footer() {
  const p = data.personal;
  const s = data.socialLinks;
  const f = data.footer;
  const { theme } = useTheme();
  const isLight = theme === "light";

  const socialIcons = [
    { icon: "fab fa-linkedin-in", href: s.linkedin },
    { icon: "fab fa-facebook-f",  href: s.facebook },
    { icon: "fab fa-x-twitter",   href: s.twitter },
    { icon: "fas fa-envelope",    href: s.email },
    { icon: "fab fa-whatsapp",    href: s.whatsapp },
  ];

  const textColor = isLight ? "text-[#333336]" : "text-gray-muted";

  return (
    <footer
      className="relative"
      style={{
        background: isLight ? "#f5f5f7" : "#000000",
        borderTop: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
        transition: "background 0.35s ease",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border ${
                isLight
                  ? "bg-[#f2f2f7] border-[#d2d2d7] text-[#1d1d1f]"
                  : "bg-white border-transparent text-black"
              }`}>
                <i className="fas fa-balance-scale text-[0.85rem]" />
              </div>
              <span className={`font-[family-name:var(--font-display)] font-extrabold text-[1rem] ${
                isLight ? "text-black" : "text-white"
              }`}>
                {p.name}
              </span>
            </div>
            <p className={`text-[0.85rem] leading-[1.8] font-semibold font-[family-name:var(--font-inter)] ${textColor}`}>
              Advocate at {p.court}, {p.location}.<br />{f.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-[family-name:var(--font-display)] text-[0.82rem] font-bold tracking-[2px] uppercase mb-6 ${
              isLight ? "text-black" : "text-white"
            }`}>
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {f.quickLinks.map((l) => (
                <li key={l}>
                  <a
                    href={linkMap[l] || `#${l.toLowerCase()}`}
                    className={`text-[0.85rem] font-semibold font-[family-name:var(--font-inter)] hover:underline transition-colors flex items-center gap-2 ${textColor}`}
                  >
                    <span className={`w-1 h-1 rounded-full ${isLight ? "bg-black/35" : "bg-white/35"}`} />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className={`font-[family-name:var(--font-display)] text-[0.82rem] font-bold tracking-[2px] uppercase mb-6 ${
              isLight ? "text-black" : "text-white"
            }`}>
              Practice Areas
            </h4>
            <ul className="flex flex-col gap-3">
              {f.practiceList.map((l) => (
                <li key={l} className={`flex items-center gap-2 text-[0.85rem] font-semibold font-[family-name:var(--font-inter)] ${textColor}`}>
                  <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isLight ? "bg-black/20" : "bg-white/20"}`} />
                  {l}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className={`font-[family-name:var(--font-display)] text-[0.82rem] font-bold tracking-[2px] uppercase mb-6 ${
              isLight ? "text-black" : "text-white"
            }`}>
              Connect
            </h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialIcons.map((si, i) => (
                <a
                  key={i}
                  href={si.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[0.88rem] hover:scale-105 transition-all duration-300"
                  style={{
                    background: isLight ? "#f2f2f7" : "rgba(255,255,255,0.025)",
                    border: `1px solid ${isLight ? "#d2d2d7" : "rgba(255,255,255,0.15)"}`,
                    color: isLight ? "#1d1d1f" : "#ffffff",
                  }}
                >
                  <i className={si.icon} />
                </a>
              ))}
            </div>
            <p className={`text-[0.78rem] font-[family-name:var(--font-inter)] font-semibold leading-[1.7] ${isLight ? "text-[#555558]" : "text-gray-muted"}`}>
              {p.consultationHours}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-7 flex flex-col sm:flex-row items-center justify-between gap-3 border-t"
          style={{ borderTopColor: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)" }}
        >
          <p className={`text-[0.8rem] font-semibold font-[family-name:var(--font-inter)] ${textColor}`}>{f.copyright}</p>
          <p className={`text-[0.73rem] font-semibold font-[family-name:var(--font-inter)] ${isLight ? "text-black/45" : "text-white/45"}`}>{f.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
