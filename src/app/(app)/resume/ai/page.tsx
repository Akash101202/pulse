"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { generateResumeFromPrompt } from "@/lib/ai/generateResume";
import { useResumeStore } from "@/lib/store/resumeStore";

export default function AIResumePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const setResume = useResumeStore((state) => state.setResume);

  const containerRef = useRef<HTMLDivElement>(null);

  const minChars = 50;
  const isValid = input.length >= minChars;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Make sure elements are visible first
      gsap.set(".fade-item", { opacity: 1 });

      gsap.fromTo(
        ".fade-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const generated = await generateResumeFromPrompt(input);
      setResume(generated);

      router.push("/resume/preview");
    } catch (error) {
      console.error("Resume generation failed:", error);
      alert("Something went wrong while generating resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="max-w-3xl mx-auto px-6 py-12 space-y-8"
    >
      {/* Header */}
      <div className="space-y-2 fade-item">
        <h1 className="text-3xl font-bold">
          Build your resume with AI
        </h1>
        <p className="text-muted-foreground">
          Describe your skills, projects, education, and experience.
          Pulse will structure it into a professional resume.
        </p>
      </div>

      {/* Helper Card */}
      <Card className="fade-item">
        <CardContent className="p-5 space-y-2">
          <p className="text-sm font-semibold">What can you write?</p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Your degree and college</li>
            <li>Skills (e.g. MERN stack, Java, Python)</li>
            <li>Projects you’ve worked on</li>
            <li>Internships or work experience</li>
          </ul>
        </CardContent>
      </Card>

      {/* Textarea */}
      <div className="space-y-3 fade-item">
        <Textarea
          placeholder="Example: I am a final year MCA student skilled in MERN stack..."
          className="min-h-[180px]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <p className="text-sm text-muted-foreground">
          {input.length < minChars
            ? `Write at least ${minChars} characters to continue`
            : "Looks good! You can generate your resume now."}
        </p>
      </div>

      {/* Action */}
      <div className="flex justify-end fade-item">
        <Button
          disabled={!isValid || loading}
          onClick={handleGenerate}
          className="transition-transform hover:scale-105"
        >
          {loading ? "Generating..." : "Generate Resume"}
        </Button>
      </div>
    </div>
  );
}