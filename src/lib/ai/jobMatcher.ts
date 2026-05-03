import { Job } from "@/types/job";

export function matchJobs(jobs: Job[], resumeSkills: string[]) {
  return jobs.map((job) => {
    let score = 0;

    resumeSkills.forEach((skill) => {
      if (
        job.description.toLowerCase().includes(skill.toLowerCase())
      ) {
        score += 20;
      }
    });

    return {
      ...job,
      matchScore: Math.min(score, 100),
    };
  });
}