import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { randomUUID } from "crypto";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `
You are a professional resume generator.

Return ONLY valid JSON. No explanation.

STRICT FORMAT:

{
  "name": "Full name of the user (extract from input, if not present generate a realistic name)",
  "summary": "string",
  "skills": [
    { "id": "uuid", "name": "skill name" }
  ],
  "experience": [
    {
      "id": "uuid",
      "role": "job role",
      "company": "company name",
      "startDate": "",
      "endDate": "",
      "highlights": ["point1", "point2"]
    }
  ],
  "education": {
    "degree": "",
    "college": "",
    "year": ""
  }
}

RULES:
- Extract the person's full name from the input (VERY IMPORTANT)
- If name is not found, generate a realistic name
- Extract name if present, otherwise generate one
- Always include at least 5 skills
- Always include at least 1 experience
- Skills MUST be objects with id + name
- Experience MUST follow exact structure


User input:
${prompt}
          `,
        },
      ],
    });

    const text = response.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("Empty AI response");
    }

    // 🔥 Extract JSON safely
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      console.error("AI RAW:", text);
      throw new Error("Invalid JSON format from AI");
    }

    let parsed = JSON.parse(jsonMatch[0]);

    /* =========================
       🔥 NORMALIZE DATA
    ========================== */

    // ✅ NAME
    parsed.name = parsed.name || "Your Name";

    // ✅ SUMMARY
    parsed.summary = parsed.summary || "Professional summary";

    // ✅ SKILLS FIX
    parsed.skills = (parsed.skills || []).map((skill: any) => ({
      id: skill?.id || randomUUID(),
      name: typeof skill === "string" ? skill : skill?.name || "Skill",
    }));

    // Ensure at least 5 skills
    while (parsed.skills.length < 5) {
      parsed.skills.push({
        id: randomUUID(),
        name: "Skill",
      });
    }

    // ✅ EXPERIENCE FIX
    parsed.experience = (parsed.experience || []).map((exp: any) => ({
      id: exp?.id || randomUUID(),
      role: exp?.role || "Developer",
      company: exp?.company || "Company",
      startDate: exp?.startDate || "",
      endDate: exp?.endDate || "",
      highlights:
        exp?.highlights && exp.highlights.length > 0
          ? exp.highlights
          : ["Worked on projects"],
    }));

    // Ensure at least 1 experience
    if (parsed.experience.length === 0) {
      parsed.experience.push({
        id: randomUUID(),
        role: "Developer",
        company: "Company",
        startDate: "",
        endDate: "",
        highlights: ["Worked on projects"],
      });
    }

    // ✅ EDUCATION FIX
    parsed.education = parsed.education || {
      degree: "",
      college: "",
      year: "",
    };

    return NextResponse.json(parsed);

  } catch (error: any) {
    console.error("API ERROR:", error.message);

    return NextResponse.json(
      { error: error.message || "Failed to generate resume" },
      { status: 500 }
    );
  }
}