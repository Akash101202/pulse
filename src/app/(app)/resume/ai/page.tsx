"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { generateResumeFromPrompt } from "@/lib/ai/generateResume";
import { useResumeStore } from "@/lib/store/resumeStore";


export default function AIResumePage() {
  const [input, setInput] = useState("");

  const minChars = 50;
  const isValid = input.length >= minChars;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">
          Build your resume with AI
        </h1>
        <p className="text-muted-foreground">
          Describe your skills, projects, education, and experience.
          Pulse will structure it into a professional resume.
        </p>
      </div>

      {/* Helper card */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <p className="text-sm font-medium">What can you write?</p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Your degree and college</li>
            <li>Skills (e.g. MERN stack, Java, Python)</li>
            <li>Projects you’ve worked on</li>
            <li>Internships or work experience</li>
          </ul>
        </CardContent>
      </Card>

      {/* Textarea */}
      <div className="space-y-2">
        <Textarea
          placeholder="Example: I am a final year MCA student skilled in MERN stack. I built a campground management system using Node.js, Express, MongoDB..."
          className="min-h-[180px]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <p className="text-sm text-muted-foreground">
          {input.length < minChars
            ? `Write at least ${minChars} characters to continue`
            : "Looks good! You can generate your resume now."}
        </p>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <Button disabled={!isValid}>
          Generate Resume
        </Button>
      </div>

    </div>
  );
}
