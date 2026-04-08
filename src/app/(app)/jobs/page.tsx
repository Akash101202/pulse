"use client";

import { useEffect, useState } from "react";
import { useResumeStore } from "@/lib/store/resumeStore";

export default function JobsPage() {
  const resume = useResumeStore((state) => state.resume);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!resume) return;

    const fetchJobs = async () => {
      setLoading(true);

      const skills = resume.skills.map((s) => s.name);

      const res = await fetch("/api/jobs", {
        method: "POST",
        body: JSON.stringify({ skills }),
      });

      const data = await res.json();
      setJobs(data);

      setLoading(false);
    };

    fetchJobs();
  }, [resume]);

  if (!resume) {
    return <div className="p-10">No resume found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-10 space-y-6">

      <h1 className="text-2xl font-bold">Recommended Jobs</h1>

      {loading && <p>Loading jobs...</p>}

      {jobs.map((job, i) => (
        <div
          key={i}
          className="border p-4 rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{job.title}</p>
            <p className="text-sm text-gray-500">
              {job.company} • {job.location}
            </p>
          </div>

          <a
            href={job.link}
            target="_blank"
            className="text-blue-600"
          >
            Apply →
          </a>
        </div>
      ))}

    </div>
  );
}