// src/types/resume.ts

export type ID = string;

/* =========================
   Root Resume Type
========================= */

export interface Resume {
  basics?: Basics;
  summary?: string;

  experience?: Experience[];
  education?: Education[];
  projects?: Project[];
  skills?: Skill[];
  certifications?: Certification[];
  achievements?: Achievement[];

  metadata?: ResumeMetadata;
}

/* =========================
   Basics
========================= */

export interface Basics {
  fullName?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

/* =========================
   Experience
========================= */

export interface Experience {
  id: ID;
  role?: string;
  company?: string;
  location?: string;

  startDate?: string; // YYYY-MM
  endDate?: string;   // YYYY-MM | "Present"

  highlights?: string[];
}

/* =========================
   Education
========================= */

export interface Education {
  id: ID;
  degree?: string;
  institution?: string;
  location?: string;

  startDate?: string;
  endDate?: string;

  grade?: string;
  highlights?: string[];
}

/* =========================
   Projects
========================= */

export interface Project {
  id: ID;
  name?: string;
  description?: string;

  technologies?: string[];
  link?: string;

  highlights?: string[];
}

/* =========================
   Skills
========================= */

export interface Skill {
  id: ID;
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

/* =========================
   Certifications
========================= */

export interface Certification {
  id: ID;
  name?: string;
  issuer?: string;
  date?: string;
  link?: string;
}

/* =========================
   Achievements
========================= */

export interface Achievement {
  id: ID;
  title?: string;
  description?: string;
  date?: string;
}

/* =========================
   Metadata
========================= */

export interface ResumeMetadata {
  createdAt?: string;
  updatedAt?: string;

  source?: "ai" | "manual" | "imported";
  version?: number;
}
