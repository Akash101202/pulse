"use client";

import { useLayoutEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useRouter } from "next/navigation";

import { Resume } from "@/types/resume";
import { useResumeStore } from "@/lib/store/resumeStore";

import ResumeEditorLayout from "@/components/resume/ResumeEditorLayout";
import ResumeDocument from "@/components/pdf/ResumeDocument";

export default function ResumePreviewPage() {
  const resume = useResumeStore((state) => state.resume);
  const setResume = useResumeStore((state) => state.setResume);

  const router = useRouter();

  const [localResume, setLocalResume] = useState<Resume | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync store → local
  useLayoutEffect(() => {
    if (resume) setLocalResume(resume);
  }, [resume]);

  // Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fade",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!localResume) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No resume data found.
      </div>
    );
  }

  // 🔥 FIXED: PARTIAL UPDATE + MERGE HERE
  const updateResume = (updatedFields: Partial<Resume>) => {
    const updated = {
      ...localResume,
      ...updatedFields,
    };

    setLocalResume(updated);
    setResume(updated); // global sync
  };

  return (
    <div
      ref={containerRef}
      className="max-w-7xl mx-auto px-6 py-10 space-y-6 fade"
    >
      {/* TOP BAR */}
      <div className="flex justify-between items-center gap-4">

        {/* LEFT SIDE */}
        <div className="flex gap-3">

          {/* 🔁 Regenerate */}
          <button
            onClick={() => router.push("/resume/ai")}
            className="px-4 py-2 rounded-md border hover:bg-muted"
          >
            Regenerate with AI
          </button>

        </div>

        {/* RIGHT SIDE */}
        <PDFDownloadLink
          document={<ResumeDocument resume={localResume} />}
          fileName="resume.pdf"
        >
          {({ loading }) => (
            <button className="px-4 py-2 bg-primary text-white rounded-md">
              {loading ? "Preparing..." : "Download PDF"}
            </button>
          )}
        </PDFDownloadLink>

      </div>

      {/* EDITOR + PREVIEW */}
      <ResumeEditorLayout
        resume={localResume}
        setLocalResume={updateResume} // ✅ FIXED
      />

    </div>
  );
}