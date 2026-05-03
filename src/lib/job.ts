import axios from "axios";

export async function fetchJobs(query: string) {
  // 🔥 Replace later with Adzuna API
  return [
    {
      id: "1",
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore",
      type: "Full-time",
      description: "React + Next.js",
      url: "#",
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "Amazon",
      location: "Remote",
      type: "Full-time",
      description: "Node + React",
      url: "#",
    },
  ].filter((job) =>
    job.title.toLowerCase().includes(query.toLowerCase())
  );
}