import ModernTemplate from "./templates/ModernTemplate";
import { Resume } from "@/types/resume";

interface Props {
  resume: Resume;
  isEditing: boolean;
  setLocalResume: (data: Partial<Resume>) => void; // ✅ FIXED
}

export default function ResumeRenderer({
  resume,
  isEditing,
  setLocalResume,
}: Props) {
  return (
    <ModernTemplate
      resume={resume}
      isEditing={isEditing}
      setLocalResume={setLocalResume}
    />
  );
}