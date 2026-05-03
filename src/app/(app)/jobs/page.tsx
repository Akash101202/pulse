"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import JobCard from "@/components/jobs/JobCard";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [query, setQuery] = useState("react");
  const [loading, setLoading] = useState(false);

const fetchJobs = async (searchQuery: string) => {
  try {
    setLoading(true);

    const res = await fetch(
      `/api/jobs?skills=${encodeURIComponent(searchQuery)}`
    );

    if (!res.ok) {
      console.error("API failed", res.status);
      setJobs([]);
      return;
    }

    const data = await res.json();

    console.log("FETCHED DATA:", data); // ✅ DEBUG

    // 🔥 IMPORTANT FIX
    if (Array.isArray(data)) {
      setJobs(data);
    } else {
      console.error("Not array:", data);
      setJobs([]);
    }

  } catch (err) {
    console.error("FETCH ERROR:", err);
    setJobs([]);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchJobs("react"); // 🔥 force load
}, []);
  // GSAP animation (FIXED)
  useEffect(() => {
    if (!jobs.length) return;

    const ctx = gsap.context(() => {
      gsap.from(".job-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
      });
    });

    return () => ctx.revert();
  }, [jobs]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Find Jobs</h1>

      {/* Search */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skills (react, node...)"
        />

        <button
          onClick={() => fetchJobs(query)}
          className="bg-black text-white px-4"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading jobs...</p>}

      {/* Jobs */}
      <div className="grid gap-4">
        {!loading && jobs.length === 0 && (
          <p>No jobs found</p>
        )}

        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}