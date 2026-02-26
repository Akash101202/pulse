"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      className="relative max-w-4xl mx-auto px-6 py-16 space-y-10"
    >
      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/20 blur-3xl rounded-full -z-10" />
      <div className="absolute top-40 -right-20 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full -z-10" />

      {/* Heading */}
      <div className="space-y-3 fade-up">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to Pulse
        </h1>
        <p className="text-muted-foreground text-lg">
          Build a job-winning AI-powered resume in minutes.
        </p>
      </div>

      {/* Resume Card */}
      <div className="rounded-2xl border bg-background/60 backdrop-blur-xl p-8 flex items-center justify-between shadow-sm fade-up">
        <div className="space-y-2">
          <p className="text-lg font-semibold">Create your resume</p>
          <p className="text-sm text-muted-foreground">
            Answer a few smart questions and let AI generate a professional resume tailored for you.
          </p>
        </div>

        <Link
          href="/resume/ai"
          className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-md transition-transform hover:scale-105"
        >
          Build Resume →
        </Link>
      </div>
    </div>
  );
}