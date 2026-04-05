"use server";

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateResumeAI(data: any) {
  const prompt = `
You are a resume generator.

Return ONLY valid JSON. No explanation. No markdown.

Format:
{
  "name": "",
  "summary": "",
  "skills": [],
  "experience": [],
  "education": {}
}

User input:
${data.prompt}
`;

  const response = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.choices[0].message.content || "";

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found");

    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("AI RAW:", text);
    throw new Error("Invalid AI JSON format");
  }
}