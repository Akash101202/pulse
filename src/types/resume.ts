export interface Skill {
  id: string;
  name: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate?: string;
  endDate?: string;
  highlights: string[];
}

export interface Resume {
  name?: string;
  email?: string;
  phone?: string;

  summary?: string;

  skills: Skill[];
  experience: Experience[];

  education?: {
    degree?: string;
    college?: string;
    year?: string;
  };
}