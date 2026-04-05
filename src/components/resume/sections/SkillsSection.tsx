"use client";

import { Resume } from "@/types/resume";
import { v4 as uuidv4 } from "uuid";

interface Props {
  resume: Resume;
  isEditing: boolean;
  setLocalResume: (data: Partial<Resume>) => void; // 🔥 changed
}

export default function SkillsSection({
  resume,
  isEditing,
  setLocalResume,
}: Props) {

  const skills = resume.skills ?? [];

  /* -------------------------
     Add Skill
  -------------------------- */

  const addSkill = () => {
    const newSkill = {
      id: uuidv4(),
      name: "New Skill",
    };

    setLocalResume({
      skills: [...skills, newSkill],
    });
  };

  /* -------------------------
     Delete Skill
  -------------------------- */

  const deleteSkill = (id: string) => {
    const updatedSkills = skills.filter((s) => s.id !== id);

    setLocalResume({
      skills: updatedSkills,
    });
  };

  /* -------------------------
     Update Skill Name
  -------------------------- */

  const updateSkill = (index: number, value: string) => {
    const updatedSkills = [...skills];

    updatedSkills[index] = {
      ...updatedSkills[index],
      name: value,
    };

    setLocalResume({
      skills: updatedSkills,
    });
  };

  if (skills.length === 0) return null;

  return (
    <section>

      <div className="flex justify-between items-center mb-2">

        <h2 className="text-sm font-bold tracking-widest text-gray-500">
          SKILLS
        </h2>

        {isEditing && (
          <button
            onClick={addSkill}
            className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            + Add Skill
          </button>
        )}

      </div>

      <div className="flex flex-wrap gap-2 text-sm">

        {skills.map((skill, index) => (
          <div
            key={skill.id}
            className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
          >

            <span
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) =>
                updateSkill(index, e.currentTarget.innerText)
              }
            >
              {skill.name}
            </span>

            {isEditing && (
              <button
                onClick={() => deleteSkill(skill.id)}
                className="text-red-500 text-xs ml-1"
              >
                ✕
              </button>
            )}

          </div>
        ))}

      </div>

    </section>
  );
}