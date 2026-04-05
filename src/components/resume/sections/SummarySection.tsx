import { Resume } from "@/types/resume";

interface Props {
  resume: Resume;
  isEditing: boolean;
  setLocalResume: (data: Partial<Resume>) => void; // 🔥 updated
}

export default function SummarySection({
  resume,
  isEditing,
  setLocalResume,
}: Props) {

  if (!resume.summary && !isEditing) return null;

  return (
    <section>

      <h2 className="text-sm font-bold tracking-widest text-gray-500 mb-2">
        SUMMARY
      </h2>

      <p
        contentEditable={isEditing}
        suppressContentEditableWarning
        className="text-sm leading-relaxed"
        onBlur={(e) =>
          setLocalResume({
            summary: e.currentTarget.innerText, // 🔥 only update this field
          })
        }
      >
        {resume.summary || "Write a short professional summary..."}
      </p>

    </section>
  );
}