"use client";

import { Resume } from "@/types/resume";
import { v4 as uuidv4 } from "uuid";

interface Props {
  resume: Resume;
  isEditing: boolean;
  setLocalResume: (data: Partial<Resume>) => void; // 🔥 updated
}

export default function ExperienceSection({
  resume,
  isEditing,
  setLocalResume,
}: Props) {
  const experience = resume.experience ?? [];

  /* -------------------------
     Add Experience
  -------------------------- */

  const addExperience = () => {
    const newExp = {
      id: uuidv4(),
      role: "New Role",
      company: "Company",
      startDate: "",
      endDate: "",
      highlights: ["Add achievement here"],
    };

    setLocalResume({
      experience: [...experience, newExp],
    });
  };

  /* -------------------------
     Delete Experience
  -------------------------- */

  const deleteExperience = (id: string) => {
    setLocalResume({
      experience: experience.filter((e) => e.id !== id),
    });
  };

  /* -------------------------
     Update Field
  -------------------------- */

  const updateField = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...experience];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setLocalResume({
      experience: updated,
    });
  };

  /* -------------------------
     Update Highlight
  -------------------------- */

  const updateHighlight = (
  expIndex: number,
  highlightIndex: number,
  value: string
) => {
  const updated = [...experience];

  const highlights = updated[expIndex].highlights ?? [];

  highlights[highlightIndex] = value;

  updated[expIndex] = {
    ...updated[expIndex],
    highlights,
  };

  setLocalResume({
    experience: updated,
  });
};
  if (experience.length === 0 && !isEditing) return null;

  return (
    <section>

      <div className="flex justify-between items-center mb-3">

        <h2 className="text-sm font-bold tracking-widest text-gray-500">
          EXPERIENCE
        </h2>

        {isEditing && (
          <button
            onClick={addExperience}
            className="text-xs px-2 py-1 bg-gray-200 rounded"
          >
            + Add Experience
          </button>
        )}

      </div>

      {experience.map((exp, index) => (
        <div key={exp.id} className="mb-4 border p-3 rounded">

          <div className="flex justify-between items-start">

            <div className="flex flex-col gap-1">

              {/* ROLE */}
              <span
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) =>
                  updateField(index, "role", e.currentTarget.innerText)
                }
                className="font-semibold text-sm"
              >
                {exp.role}
              </span>

              {/* COMPANY */}
              <span
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) =>
                  updateField(
                    index,
                    "company",
                    e.currentTarget.innerText
                  )
                }
                className="text-sm text-gray-600"
              >
                {exp.company}
              </span>

            </div>

            {isEditing && (
              <button
                onClick={() => deleteExperience(exp.id)}
                className="text-red-500 text-xs"
              >
                ✕
              </button>
            )}

          </div>

          {/* DATES (optional future editable) */}
          <div className="text-xs text-gray-500 mt-1">
            {exp.startDate || "Start"} – {exp.endDate || "End"}
          </div>

          {/* HIGHLIGHTS */}
          {exp.highlights && (
            <ul className="list-disc pl-5 text-sm mt-2 space-y-1">

              {exp.highlights.map((h, i) => (
                <li
                  key={i}
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateHighlight(
                      index,
                      i,
                      e.currentTarget.innerText
                    )
                  }
                >
                  {h}
                </li>
              ))}

            </ul>
          )}

        </div>
      ))}

    </section>
  );
}