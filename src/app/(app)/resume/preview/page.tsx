"use client";

import { useResumeStore } from "@/lib/store/resumeStore";

export default function ResumePreviewPage() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No resume data found. Generate a resume first.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white text-black p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">
          {resume.basics?.fullName}
        </h1>
        <p className="text-lg text-gray-700">
          {resume.basics?.title}
        </p>
      </header>

      {resume.summary && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p>{resume.summary}</p>
        </section>
      )}
    </div>
  );
}
