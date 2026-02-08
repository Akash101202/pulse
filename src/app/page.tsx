import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function LandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-5xl space-y-12">

        {/* Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight">
            Build a professional resume in minutes
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pulse helps students and developers turn their skills and projects
            into a clean, structured resume using AI.
          </p>
        </section>

        {/* Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Your existing Build Resume card */}
          {/* Your existing Job Search card */}
        </section>

        {/* How it works */}
        <section className="space-y-4">
          <h2 className="text-xl font-medium text-center">
            How Pulse works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border p-4">
              <p className="font-medium">1. Describe yourself</p>
              <p className="text-sm text-muted-foreground">
                Share your skills, experience, and projects.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="font-medium">2. AI structures your resume</p>
              <p className="text-sm text-muted-foreground">
                Pulse converts your input into resume sections.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="font-medium">3. Preview & export</p>
              <p className="text-sm text-muted-foreground">
                Review your resume and export it when ready.
              </p>
            </div>
          </div>
        </section>
<Button asChild>
  <Link href="/dashboard">Get Started</Link>
</Button>

      </div>
    </main>
  );
}
