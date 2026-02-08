import { Resume } from "@/types/resume";


export async function generateResumeFromPrompt(
  userPrompt: string
): Promise<Resume> {
  // 🔒 TEMP MOCK (replace with OpenAI later)
  const mockResponse = `
  {
    "basics": {
      "fullName": "P. Akash",
      "title": "Full Stack Web Developer",
      "location": "Bengaluru, India",
      "github": "github.com/Akash101202"
    },
    "summary": "Full stack developer with experience in MERN, Django, and AI-powered applications.",
    "skills": [
      { "id": "s1", "name": "JavaScript", "level": "Advanced" },
      { "id": "s2", "name": "React", "level": "Advanced" }
    ],
    "metadata": {
      "source": "ai",
      "version": 1
    }
  }
  `;

  // In real AI:
  // send RESUME_SYSTEM_PROMPT + userPrompt
  // receive response

  const parsed: Resume = JSON.parse(mockResponse);

  return parsed;
}
