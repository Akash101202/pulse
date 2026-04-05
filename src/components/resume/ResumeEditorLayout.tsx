"use client";

import { Resume } from "@/types/resume";
import ResumeRenderer from "./ResumeRenderer";
import SkillsSection from "./sections/SkillsSection";
import SummarySection from "./sections/SummarySection";
import ExperienceSection from "./sections/ExperienceSection";

interface Props {
  resume: Resume;
  setLocalResume: (data: Partial<Resume>) => void; // ✅ FIXED
}

export default function ResumeEditorLayout({
  resume,
  setLocalResume,
}: Props) {

  // 🔥 SAFE UPDATE HELPER
  const updateResume = (updatedFields: Partial<Resume>) => {
    setLocalResume(updatedFields); // ✅ FIXED (no spreading here)
  };

  return (
    <div className="grid grid-cols-[420px_1fr] gap-10 text-stone-400">

      {/* LEFT SIDE — EDITOR PANEL */}
      <div className="bg-card border rounded-xl p-6 space-y-8 h-fit">

        {/* SKILLS */}
        <SkillsSection
          resume={resume}
          isEditing={true}
          setLocalResume={updateResume}
        />

        {/* SUMMARY */}
        <SummarySection
          resume={resume}
          isEditing={true}
          setLocalResume={updateResume}
        />

        {/* EXPERIENCE */}
        <ExperienceSection
          resume={resume}
          isEditing={true}
          setLocalResume={updateResume}
        />

      </div>

      {/* RIGHT SIDE — RESUME PREVIEW */}
      <div className="bg-muted rounded-xl p-8 flex justify-center items-start min-h-[700px]">

        <div className="sticky top-20">

          <ResumeRenderer
            resume={resume}
            isEditing={false}
            setLocalResume={updateResume} // ✅ FIXED (must be partial)
          />

        </div>

      </div>

    </div>
  );
}