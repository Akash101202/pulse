"use client";

export default function JobCard({ job }: any) {
  return (
    <div className="job-card border p-4 rounded-xl shadow hover:scale-105 transition">
      <h2 className="text-lg font-bold">{job.title}</h2>
      <p>{job.company} • {job.location}</p>

      <a
        href={job.url}
        target="_blank"
        className="text-blue-500 underline mt-2 inline-block"
      >
        Apply
      </a>
    </div>
  );
}