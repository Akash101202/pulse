import { Resume } from "@/types/resume";

interface Props {
  resume: Resume;
  isEditing: boolean;
  setLocalResume: (data: Partial<Resume>) => void;
}

export default function HeaderSection({
  resume,
  isEditing,
  setLocalResume,
}: Props) {
  return (
    <section className="text-center space-y-2">

      {/* 🔥 FORCE NAME DISPLAY */}
      <h1
        contentEditable={isEditing}
        suppressContentEditableWarning
        className="text-3xl font-bold tracking-wide text-black"
        onBlur={(e) =>
          setLocalResume({
            name: e.currentTarget.innerText.trim(),
          })
        }
      >
        {resume?.name ? resume.name : "Your Name"}
      </h1>

      {/* CONTACT */}
      <p className="text-sm text-gray-700">
        {resume?.email || "email@example.com"}
        {resume?.phone && ` • ${resume.phone}`}
      </p>

    </section>
  );
}