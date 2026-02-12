"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero timeline
      const tl = gsap.timeline();

      tl.from(".hero-title", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      })
        .from(
          ".hero-sub",
          {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".cta-btn",
          {
            scale: 0.6,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        );

      // Floating blobs animation
      gsap.to(".blob-1", {
        x: 100,
        y: 60,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".blob-2", {
        x: -80,
        y: -40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Cards stagger animation
      gsap.from(".card", {
        scrollTrigger: {
          trigger: ".card-section",
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // How it works stagger
      gsap.from(".step", {
        scrollTrigger: {
          trigger: ".steps-section",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={container}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Animated Background Blobs */}
      <div className="blob-1 absolute w-72 h-72 bg-purple-500/30 rounded-full blur-3xl top-10 left-10" />
      <div className="blob-2 absolute w-72 h-72 bg-blue-500/30 rounded-full blur-3xl bottom-10 right-10" />

      <div className="relative w-full max-w-5xl space-y-16 z-10">
        {/* Hero */}
        <section className="text-center space-y-6">
          <h1 className="hero-title text-5xl md:text-6xl font-bold tracking-tight">
            Build a professional resume in minutes
          </h1>

          <p className="hero-sub text-muted-foreground max-w-2xl mx-auto text-lg">
            Pulse helps students and developers turn their skills and projects
            into a clean, structured resume using AI.
          </p>

          <div className="cta-btn inline-block">
            <Button
              asChild
              className="text-lg px-8 py-6 rounded-xl transition-transform hover:scale-105"
            >
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </section>

        {/* Cards */}
        <section className="card-section grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card rounded-xl border p-6 backdrop-blur bg-white/5">
            <h3 className="text-lg font-semibold">Build Resume</h3>
            <p className="text-sm text-muted-foreground">
              Generate a structured resume with AI guidance.
            </p>
          </div>

          <div className="card rounded-xl border p-6 backdrop-blur bg-white/5">
            <h3 className="text-lg font-semibold">Job Search</h3>
            <p className="text-sm text-muted-foreground">
              Discover roles and tailor your resume accordingly.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="steps-section space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            How Pulse works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="step rounded-xl border p-6 backdrop-blur bg-white/5">
              <p className="font-medium">1. Describe yourself</p>
              <p className="text-sm text-muted-foreground">
                Share your skills, experience, and projects.
              </p>
            </div>

            <div className="step rounded-xl border p-6 backdrop-blur bg-white/5">
              <p className="font-medium">2. AI structures your resume</p>
              <p className="text-sm text-muted-foreground">
                Pulse converts your input into resume sections.
              </p>
            </div>

            <div className="step rounded-xl border p-6 backdrop-blur bg-white/5">
              <p className="font-medium">3. Preview & export</p>
              <p className="text-sm text-muted-foreground">
                Review your resume and export it when ready.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
