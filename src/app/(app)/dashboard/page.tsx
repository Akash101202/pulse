"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { useResumeStore } from "@/lib/store/resumeStore";
import ResumeDocument from "@/components/pdf/ResumeDocument";

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const resume = useResumeStore((state) => state.resume);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".fade-up",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative max-w-5xl mx-auto px-6 py-16 space-y-10"
    >
      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/20 blur-3xl rounded-full -z-10" />
      <div className="absolute top-40 -right-20 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full -z-10" />

      {/* Heading */}
      <div className="space-y-3 fade-up">
        <h1 className="text-3xl font-bold tracking-tight">
          Your Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your resume and get job-ready.
        </p>
      </div>

      {/* 🔥 CONDITIONAL UI */}

      {!resume ? (
        /* ---------------- NO RESUME ---------------- */
        <div className="rounded-2xl border bg-background/60 backdrop-blur-xl p-8 flex items-center justify-between shadow-sm fade-up">
          <div className="space-y-2">
            <p className="text-lg font-semibold">Create your resume</p>
            <p className="text-sm text-muted-foreground">
              Answer a few smart questions and let AI generate a professional resume.
            </p>
          </div>

          <Link
            href="/resume/ai"
            className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-md transition-transform hover:scale-105"
          >
            Build Resume →
          </Link>
        </div>
      ) : (
        /* ---------------- HAS RESUME ---------------- */
        <div className="space-y-6 fade-up">

          {/* Resume Info Card */}
          <div className="rounded-2xl border bg-background/60 backdrop-blur-xl p-8 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">
                {resume?.name ?? "Your Resume"}
              </p>
              <p className="text-sm text-muted-foreground">
                {resume?.summary?.slice(0, 100) ?? "No summary added"}
              </p>
            </div>

            <div className="flex gap-3">

              {/* Edit */}
              <Link
                href="/resume/preview"
                className="px-4 py-2 rounded-md border hover:bg-muted"
              >
                Edit
              </Link>

              {/* Download */}
              <PDFDownloadLink
                document={<ResumeDocument resume={resume} />}
                fileName="resume.pdf"
              >
                {({ loading }) => (
                  <button className="px-4 py-2 bg-primary text-white rounded-md">
                    {loading ? "Preparing..." : "Download"}
                  </button>
                )}
              </PDFDownloadLink>

            </div>
          </div>

          {/* 🔥 FUTURE SECTION (Job Suggestions Placeholder) */}
          <div className="rounded-2xl border p-6 text-center text-muted-foreground">
            Job recommendations coming soon 🚀
          </div>

        </div>
      )}
    </div>
  );
}