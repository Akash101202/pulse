"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import type { Resume } from "@/types/resume";

import { useResumeStore } from "@/lib/store/resumeStore";
import ResumeDocument from "@/components/pdf/ResumeDocument";

export default function ResumePreviewPage() {
  const resume = useResumeStore((state) => state.resume);
  const setResume = useResumeStore((state) => state.setResume);

  const containerRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [localResume, setLocalResume] = useState<Resume | null>(null);

  // Sync Zustand → Local State
  useLayoutEffect(() => {
    if (resume) {
      setLocalResume(resume);
    }
  }, [resume]);

  // GSAP Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".preview-item", { opacity: 1 });

      gsap.fromTo(
        ".preview-item",
        { y: 25, opacity: 0 },
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

  if (!localResume) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No resume data found. Generate a resume first.
      </div>
    );
  }

  const handleSave = () => {
    setResume(localResume);
    setIsEditing(false);
  };

  return (
    <div
      ref={containerRef}
      className="max-w-4xl mx-auto px-6 py-10 space-y-8"
    >
      {/* Action Bar */}
      <div className="flex justify-end gap-4 preview-item">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-md border hover:bg-muted transition"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:scale-105 transition"
          >
            Save Changes
          </button>
        )}

        <PDFDownloadLink
          document={<ResumeDocument resume={localResume} />}
          fileName={`${localResume.basics?.fullName || "resume"}.pdf`}
        >
          {({ loading }) =>
            loading ? (
              <button className="px-4 py-2 rounded-md bg-primary text-white">
                Preparing PDF...
              </button>
            ) : (
              <button className="px-4 py-2 rounded-md bg-primary text-white hover:scale-105 transition">
                Download PDF
              </button>
            )
          }
        </PDFDownloadLink>
      </div>

      {/* Resume Card */}
      <div className="bg-white text-black p-10 shadow-xl space-y-8 preview-item">

        {/* Header */}
        <header className="border-b pb-4">
          <h1
            contentEditable={isEditing}
            suppressContentEditableWarning
            className={`text-3xl font-bold tracking-tight ${
              isEditing ? "outline outline-1 outline-gray-300 p-1" : ""
            }`}
            onBlur={(e) =>
              setLocalResume({
                ...localResume,
                basics: {
                  ...localResume.basics,
                  fullName: e.currentTarget.innerText,
                },
              })
            }
          >
            {localResume.basics?.fullName}
          </h1>

          <p
            contentEditable={isEditing}
            suppressContentEditableWarning
            className={`text-lg text-gray-700 ${
              isEditing ? "outline outline-1 outline-gray-300 p-1" : ""
            }`}
            onBlur={(e) =>
              setLocalResume({
                ...localResume,
                basics: {
                  ...localResume.basics,
                  title: e.currentTarget.innerText,
                },
              })
            }
          >
            {localResume.basics?.title}
          </p>
        </header>

        {/* Summary */}
        {localResume.summary && (
          <section>
            <h2 className="text-xl font-semibold mb-2 uppercase tracking-wide">
              Summary
            </h2>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning
              className={`leading-relaxed text-gray-800 ${
                isEditing ? "outline outline-1 outline-gray-300 p-1" : ""
              }`}
              onBlur={(e) =>
                setLocalResume({
                  ...localResume,
                  summary: e.currentTarget.innerText,
                })
              }
            >
              {localResume.summary}
            </p>
          </section>
        )}

        {/* Skills */}
        {/* Skills */}
{Array.isArray(localResume.skills) &&
  localResume.skills.length > 0 && (
    <section>
      <h2 className="text-xl font-semibold mb-2 uppercase tracking-wide">
        Skills
      </h2>

      <ul className="list-disc pl-5 space-y-2">
        {localResume.skills.map((skill, index) => (
          <li key={skill.id} className="flex items-center gap-2">
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning
              className={
                isEditing
                  ? "outline outline-1 outline-gray-300 px-1"
                  : ""
              }
              onBlur={(e) => {
                if (!localResume.skills) return;

                const updatedSkills = [...localResume.skills];

                updatedSkills[index] = {
                  ...updatedSkills[index],
                  name: e.currentTarget.innerText,
                };

                setLocalResume({
                  ...localResume,
                  skills: updatedSkills,
                });
              }}
            >
              {skill.name}
            </span>

            {/* Optional: Show level */}
            {skill.level && (
              <span className="text-sm text-gray-500">
                ({skill.level})
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )}

      </div>
    </div>
  );
}