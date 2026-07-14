"use client";
import { useState } from "react";
import Link from "next/link";
import data from "../data/siteData.json";
import { useTheme } from "../providers/ThemeProvider";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.append("access_key", "23fc6ab8-a66d-4492-a773-5c6154e9d704");
    formData.append("subject", "New Consultation Request from Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        console.error("Error", result);
        alert(data.ui.sections.contact.formError);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert(data.ui.sections.contact.networkError);
    }
  };

  const p = data.personal;
  const s = data.socialLinks;

  const contactItems = [
    { icon: "fas fa-map-marker-alt", label: "Chamber Address",    value: p.address },
    { icon: "fas fa-phone-alt",      label: "Phone",              value: p.phone,   href: p.phoneHref },
    { icon: "fas fa-envelope",       label: "Email",              value: p.email,   href: `mailto:${p.email}` },
    { icon: "fas fa-clock",          label: "Consultation Hours", value: p.consultationHours },
  ];

  const socialBtns = [
    { icon: "fab fa-linkedin-in", label: "LinkedIn",  href: s.linkedin,  cls: isLight ? "border-black/20 text-black hover:bg-black hover:text-white" : "border-white/20 text-white hover:bg-white hover:text-black" },
    { icon: "fab fa-facebook-f",  label: "Facebook",  href: s.facebook,  cls: isLight ? "border-black/20 text-black hover:bg-black hover:text-white" : "border-white/20 text-white hover:bg-white hover:text-black" },
    { icon: "fab fa-x-twitter",   label: "X",         href: s.twitter,   cls: isLight ? "border-black/20 text-black hover:bg-black hover:text-white" : "border-white/20 text-white hover:bg-white hover:text-black" },
    { icon: "fas fa-envelope",    label: "Email",     href: s.email,     cls: isLight ? "border-black/20 text-black hover:bg-black hover:text-white" : "border-white/20 text-white hover:bg-white hover:text-black" },
    { icon: "fab fa-whatsapp",    label: "WhatsApp",  href: s.whatsapp,  cls: isLight ? "border-black/20 text-black hover:bg-black hover:text-white" : "border-white/20 text-white hover:bg-white hover:text-black" },
  ];

  const inputBase = `w-full px-4 py-3 rounded-xl text-[0.92rem] font-[family-name:var(--font-inter)] font-semibold outline-none transition-all duration-300`;
  const inputStyle = isLight
    ? { background: "#ffffff", border: "1px solid rgba(0,0,0,0.18)", color: "#000000" }
    : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff" };

  const itemBorder = { border: `1px solid ${isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.08)"}` };
  const itemBg = isLight ? "#ffffff" : "#0a0a0c";

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: isLight ? "#ffffff" : "#000000",
        transition: "background 0.35s ease",
      }}
    >
      {/* Back Button - fixed top-left */}
      <div className="sticky top-0 z-50 px-6 py-4" style={{
        background: isLight ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
      }}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[0.85rem] font-bold font-[family-name:var(--font-inter)] border transition-all duration-300 hover:-translate-y-0.5 ${
              isLight
                ? "border-black/15 text-black hover:bg-black hover:text-white"
                : "border-white/15 text-white hover:bg-white hover:text-black"
            }`}
          >
            <i className="fas fa-arrow-left text-[0.75rem]" />
            Back to Home
          </Link>
          <span className={`font-[family-name:var(--font-display)] font-extrabold text-[0.95rem] ${
            isLight ? "text-black" : "text-white"
          }`}>
            {p.name}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 py-20">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className={`text-[0.68rem] font-bold tracking-[4px] uppercase mb-4 font-[family-name:var(--font-inter)] ${
              isLight ? "text-black" : "text-white"
            }`}>
              {data.ui.sections.contact.subtitle}
            </p>
            <h1 className={`font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.8vw,3rem)] font-extrabold leading-tight ${
              isLight ? "text-black" : "text-white"
            }`}>
              {data.ui.sections.contact.title}
            </h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="header-line-left" />
              <div className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-black" : "bg-white"}`} />
              <div className="header-line-right" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-12 items-start">
            {/* Left info cards */}
            <div className="flex flex-col gap-3.5">
              {contactItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 px-6 py-5 rounded-2xl hover:translate-x-1.5 transition-transform duration-300"
                  style={{ background: itemBg, ...itemBorder }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border"
                    style={{
                      background: isLight ? "#f2f2f7" : "#ffffff",
                      borderColor: isLight ? "#d2d2d7" : "rgba(0,0,0,0.05)",
                    }}
                  >
                    <i className={`${item.icon} text-[0.9rem] ${isLight ? "text-[#1d1d1f]" : "text-black"}`} />
                  </div>
                  <div>
                    <strong className={`block text-[0.85rem] mb-0.5 font-bold font-[family-name:var(--font-display)] ${
                      isLight ? "text-black" : "text-white"
                    }`}>
                      {item.label}
                    </strong>
                    {item.href ? (
                      <a href={item.href} className={`text-[0.88rem] font-[family-name:var(--font-inter)] font-semibold hover:underline transition-colors ${
                        isLight ? "text-[#333336]" : "text-gray-muted"
                      }`}>
                        {item.value}
                      </a>
                    ) : (
                      <p className={`text-[0.88rem] font-[family-name:var(--font-inter)] font-semibold ${
                        isLight ? "text-[#333336]" : "text-gray-muted"
                      }`}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Social buttons */}
              <div className="flex flex-wrap gap-3 mt-2">
                {socialBtns.map((sb, i) => (
                  <a
                    key={i}
                    href={sb.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[0.82rem] font-bold font-[family-name:var(--font-inter)] border transition-all hover:-translate-y-0.5 ${sb.cls}`}
                    style={{ background: isLight ? "#ffffff" : "rgba(255,255,255,0.02)" }}
                  >
                    <i className={sb.icon} />
                    <span>{sb.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl p-10 border"
              style={{
                background: isLight ? "#f5f5f7" : "#0a0a0c",
                borderColor: isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)",
              }}
            >
              <h3 className={`font-[family-name:var(--font-display)] text-[1.3rem] font-bold mb-7 flex items-center gap-3 ${
                isLight ? "text-black" : "text-white"
              }`}>
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center border"
                  style={{
                    background: isLight ? "#f2f2f7" : "#ffffff",
                    borderColor: isLight ? "#d2d2d7" : "rgba(0,0,0,0.05)",
                  }}
                >
                  <i className={`fas fa-paper-plane text-[0.85rem] ${isLight ? "text-[#1d1d1f]" : "text-black"}`} />
                </span>
                {data.ui.sections.contact.formTitle}
              </h3>

              {[
                { id: "name",  label: data.ui.sections.contact.fields.name.label,  type: "text",  placeholder: data.ui.sections.contact.fields.name.placeholder,  required: true },
                { id: "phone", label: data.ui.sections.contact.fields.phone.label, type: "tel",   placeholder: data.ui.sections.contact.fields.phone.placeholder },
                { id: "email", label: data.ui.sections.contact.fields.email.label, type: "email", placeholder: data.ui.sections.contact.fields.email.placeholder, required: true },
              ].map((f) => (
                <div key={f.id} className="flex flex-col gap-1.5 mb-4">
                  <label htmlFor={f.id} className={`text-[0.75rem] font-bold tracking-[1px] uppercase font-[family-name:var(--font-inter)] ${
                    isLight ? "text-[#555558]" : "text-gray-muted"
                  }`}>
                    {f.label}
                  </label>
                  <input id={f.id} name={f.id} type={f.type} placeholder={f.placeholder} required={f.required} className={inputBase} style={inputStyle} />
                </div>
              ))}

              <div className="flex flex-col gap-1.5 mb-4">
                <label htmlFor="subject" className={`text-[0.75rem] font-bold tracking-[1px] uppercase font-[family-name:var(--font-inter)] ${
                  isLight ? "text-[#555558]" : "text-gray-muted"
                }`}>
                  {data.ui.sections.contact.fields.subject.label}
                </label>
                <select id="subject" name="legal_matter" className={inputBase} style={{ ...inputStyle, WebkitAppearance: "none" }}>
                  <option value="" style={{ background: isLight ? "#ffffff" : "#000000" }}>{data.ui.sections.contact.fields.subject.placeholder}</option>
                  {data.practiceAreas.map((a) => (
                    <option key={a.title} style={{ background: isLight ? "#ffffff" : "#000000" }}>{a.title}</option>
                  ))}
                  <option style={{ background: isLight ? "#ffffff" : "#000000" }}>Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 mb-7">
                <label htmlFor="message" className={`text-[0.75rem] font-bold tracking-[1px] uppercase font-[family-name:var(--font-inter)] ${
                  isLight ? "text-[#555558]" : "text-gray-muted"
                }`}>
                  {data.ui.sections.contact.fields.message.label}
                </label>
                <textarea id="message" name="message" rows={4} placeholder={data.ui.sections.contact.fields.message.placeholder} className={`${inputBase} resize-y`} style={inputStyle} required />
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="contact-submit"
                className="w-full flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-[0.92rem] font-[family-name:var(--font-inter)] shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{
                  background: isLight ? "#000000" : "#ffffff",
                  color: isLight ? "#ffffff" : "#000000",
                }}
              >
                <i className="fas fa-paper-plane text-[0.82rem]" style={{ color: isLight ? "#ffffff" : "#000000" }} /> {data.ui.buttons.sendMessage}
              </button>

              {submitted && (
                <div className="flex items-center gap-2.5 mt-4 px-5 py-3.5 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 text-[0.86rem] font-bold font-[family-name:var(--font-inter)]">
                  <i className="fas fa-check-circle" /> {data.ui.sections.contact.formSuccess}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
