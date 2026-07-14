"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import data from "../data/siteData.json";
import { useTheme } from "../providers/ThemeProvider";

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const cfg = data.reviewConfig;
  const p = data.personal;

  // Fetch existing reviews
  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setReviews(d); })
      .catch(() => {});
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    setSubmitting(true);
    setError("");

    const form = e.target;
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.reviewerName.value,
          location: form.location.value,
          rating,
          text: form.reviewText.value,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        setSubmitted(true);
        form.reset();
        setRating(0);
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setError(result.error || cfg.errorMessage);
      }
    } catch {
      setError(cfg.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase = `w-full px-4 py-3 rounded-xl text-[0.92rem] font-[family-name:var(--font-inter)] font-semibold outline-none transition-all duration-300`;
  const inputStyle = isLight
    ? { background: "#ffffff", border: "1px solid rgba(0,0,0,0.18)", color: "#000000" }
    : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff" };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: isLight ? "#ffffff" : "#000000",
        transition: "background 0.35s ease",
      }}
    >
      {/* Sticky Nav */}
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
            <i className="fas fa-arrow-left text-[0.75rem]" /> Back to Home
          </Link>
          <span className={`font-[family-name:var(--font-display)] font-extrabold text-[0.95rem] ${
            isLight ? "text-black" : "text-white"
          }`}>
            {p.name}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-20">
        <div className="max-w-[900px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className={`text-[0.68rem] font-bold tracking-[4px] uppercase mb-4 font-[family-name:var(--font-inter)] ${
              isLight ? "text-black" : "text-white"
            }`}>
              {cfg.pageSubtitle}
            </p>
            <h1 className={`font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.8vw,3rem)] font-extrabold leading-tight ${
              isLight ? "text-black" : "text-white"
            }`}>
              {cfg.pageTitle}
            </h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="header-line-left" />
              <div className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-black" : "bg-white"}`} />
              <div className="header-line-right" />
            </div>

            {/* Average rating badge */}
            {avgRating && (
              <div className={`inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-full border ${
                isLight ? "border-black/10 bg-black/[0.03]" : "border-white/10 bg-white/[0.03]"
              }`}>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <i key={s} className={`fas fa-star text-[0.85rem] ${
                      s <= Math.round(avgRating) ? (isLight ? "text-black" : "text-white") : (isLight ? "text-black/15" : "text-white/15")
                    }`} />
                  ))}
                </div>
                <span className={`text-[1.2rem] font-extrabold font-[family-name:var(--font-display)] ${
                  isLight ? "text-black" : "text-white"
                }`}>{avgRating}</span>
                <span className={`text-[0.78rem] font-semibold font-[family-name:var(--font-inter)] ${
                  isLight ? "text-[#555558]" : "text-gray-muted"
                }`}>({reviews.length} {reviews.length === 1 ? "review" : "reviews"})</span>
              </div>
            )}
          </div>

          {/* Review Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl p-10 border mb-16"
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
                <i className={`fas fa-star text-[0.85rem] ${isLight ? "text-[#1d1d1f]" : "text-black"}`} />
              </span>
              {cfg.pageTitle}
            </h3>

            {/* Star Rating */}
            <div className="mb-7">
              <label className={`block text-[0.75rem] font-bold tracking-[1px] uppercase mb-3 font-[family-name:var(--font-inter)] ${
                isLight ? "text-[#555558]" : "text-gray-muted"
              }`}>
                Your Rating
              </label>
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                    className="transition-all duration-200 hover:scale-125 cursor-pointer p-1"
                  >
                    <i className={`fas fa-star text-[1.8rem] transition-all ${
                      star <= (hover || rating)
                        ? (isLight ? "text-black" : "text-white")
                        : (isLight ? "text-black/15" : "text-white/15")
                    }`} />
                  </button>
                ))}
                {(hover || rating) > 0 && (
                  <span className={`ml-3 text-[0.85rem] font-bold font-[family-name:var(--font-inter)] ${
                    isLight ? "text-[#555558]" : "text-gray-muted"
                  }`}>
                    {cfg.ratingLabels[(hover || rating) - 1]}
                  </span>
                )}
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5 mb-4">
              <label htmlFor="reviewerName" className={`text-[0.75rem] font-bold tracking-[1px] uppercase font-[family-name:var(--font-inter)] ${
                isLight ? "text-[#555558]" : "text-gray-muted"
              }`}>
                {cfg.formFields.name.label}
              </label>
              <input id="reviewerName" name="reviewerName" type="text" placeholder={cfg.formFields.name.placeholder} required className={inputBase} style={inputStyle} />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5 mb-4">
              <label htmlFor="location" className={`text-[0.75rem] font-bold tracking-[1px] uppercase font-[family-name:var(--font-inter)] ${
                isLight ? "text-[#555558]" : "text-gray-muted"
              }`}>
                {cfg.formFields.location.label}
              </label>
              <input id="location" name="location" type="text" placeholder={cfg.formFields.location.placeholder} className={inputBase} style={inputStyle} />
            </div>

            {/* Review Text */}
            <div className="flex flex-col gap-1.5 mb-7">
              <label htmlFor="reviewText" className={`text-[0.75rem] font-bold tracking-[1px] uppercase font-[family-name:var(--font-inter)] ${
                isLight ? "text-[#555558]" : "text-gray-muted"
              }`}>
                {cfg.formFields.review.label}
              </label>
              <textarea id="reviewText" name="reviewText" rows={4} placeholder={cfg.formFields.review.placeholder} required className={`${inputBase} resize-y`} style={inputStyle} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              id="review-submit"
              className="w-full flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-[0.92rem] font-[family-name:var(--font-inter)] shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: isLight ? "#000000" : "#ffffff",
                color: isLight ? "#ffffff" : "#000000",
              }}
            >
              <i className="fas fa-paper-plane text-[0.82rem]" style={{ color: isLight ? "#ffffff" : "#000000" }} />
              {submitting ? cfg.submitting : cfg.submitButton}
            </button>

            {/* Success / Error */}
            {submitted && (
              <div className="flex items-center gap-2.5 mt-4 px-5 py-3.5 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 text-[0.86rem] font-bold font-[family-name:var(--font-inter)]">
                <i className="fas fa-check-circle" /> {cfg.successMessage}
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2.5 mt-4 px-5 py-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-[0.86rem] font-bold font-[family-name:var(--font-inter)]">
                <i className="fas fa-exclamation-circle" /> {error}
              </div>
            )}
          </form>

          {/* User Reviews List */}
          {reviews.length > 0 && (
            <div>
              <h2 className={`font-[family-name:var(--font-display)] text-[clamp(1.4rem,2.5vw,2rem)] font-extrabold mb-8 text-center ${
                isLight ? "text-black" : "text-white"
              }`}>
                {cfg.userReviewsTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {reviews.map((review, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: isLight ? "#f5f5f7" : "#0a0a0c",
                      borderColor: isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)",
                    }}
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4">
                      {[1,2,3,4,5].map((s) => (
                        <i key={s} className={`fas fa-star text-[0.78rem] ${
                          s <= review.rating ? (isLight ? "text-black" : "text-white") : (isLight ? "text-black/15" : "text-white/15")
                        }`} />
                      ))}
                    </div>

                    {/* Text */}
                    <p className={`text-[0.95rem] leading-[1.75] italic mb-5 font-medium font-[family-name:var(--font-inter)] ${
                      isLight ? "text-[#1d1d1f]" : "text-off-white"
                    }`}>
                      &ldquo;{review.text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[0.85rem] flex-shrink-0 border ${
                        isLight
                          ? "bg-[#f2f2f7] border-[#d2d2d7] text-[#1d1d1f]"
                          : "bg-white border-transparent text-black"
                      }`}>
                        <i className="fas fa-user" />
                      </div>
                      <div>
                        <strong className={`block text-[0.88rem] font-bold font-[family-name:var(--font-display)] ${
                          isLight ? "text-black" : "text-white"
                        }`}>
                          {review.name}
                        </strong>
                        {review.location && (
                          <span className={`text-[0.75rem] font-[family-name:var(--font-inter)] font-semibold ${
                            isLight ? "text-[#555558]" : "text-gray-muted"
                          }`}>
                            {review.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
