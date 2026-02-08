import { Resume } from "@/types/resume";

export const mockResume: Resume = {
  basics: {
    fullName: "P. Akash",
    title: "Full Stack Web Developer",
    email: "akash@example.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
    github: "github.com/Akash101202",
    linkedin: "linkedin.com/in/akash",
  },

  summary:
    "Full Stack Developer with experience in MERN, Django, and cloud-based applications. Passionate about building scalable, clean, and user-focused products.",

  experience: [
    {
      id: "exp-1",
      role: "Full Stack Developer Intern",
      company: "Xcel Corp",
      startDate: "2024-05",
      endDate: "2024-06",
      highlights: [
        "Built LMS features using Django and React",
        "Integrated authentication and role-based access",
      ],
    },
  ],

  education: [
    {
      id: "edu-1",
      degree: "Master of Computer Applications (MCA)",
      institution: "St. Francis College",
      startDate: "2024",
      endDate: "2026",
    },
  ],

  projects: [
    {
      id: "proj-1",
      name: "Pulse – Resume Builder",
      description: "AI-powered resume builder using Next.js and OpenAI",
      technologies: ["Next.js", "TypeScript", "Tailwind", "OpenAI"],
      highlights: ["AI-driven resume generation", "Live preview system"],
    },
  ],

  skills: [
    { id: "s1", name: "JavaScript", level: "Advanced" },
    { id: "s2", name: "React", level: "Advanced" },
    { id: "s3", name: "Node.js", level: "Intermediate" },
  ],
};
