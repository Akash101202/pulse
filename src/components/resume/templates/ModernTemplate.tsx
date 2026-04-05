import { Resume } from "@/types/resume";

import HeaderSection from "../sections/HeaderSection";
import SummarySection from "../sections/SummarySection";
import SkillsSection from "../sections/SkillsSection";
import ExperienceSection from "../sections/ExperienceSection";

interface Props {
  resume: Resume;
  isEditing: boolean;
  setLocalResume: (data: Partial<Resume>) => void;
}

export default function ModernTemplate({
  resume,
  isEditing,
  setLocalResume,
}: Props) {
  return (
    <div className="bg-white text-black max-w-[750px] w-full mx-auto p-12 shadow-lg space-y-8 [&_*]:text-black">

      {/* HEADER */}
      <HeaderSection
        resume={resume}
        isEditing={isEditing}
        setLocalResume={setLocalResume}
      />

      {/* SUMMARY */}
      <SummarySection
        resume={resume}
        isEditing={isEditing}
        setLocalResume={setLocalResume}
      />

      {/* SKILLS */}
      <SkillsSection
        resume={resume}
        isEditing={isEditing}
        setLocalResume={setLocalResume}
      />

      {/* EXPERIENCE */}
      <ExperienceSection
        resume={resume}
        isEditing={isEditing}
        setLocalResume={setLocalResume}
      />

    </div>
  );
}