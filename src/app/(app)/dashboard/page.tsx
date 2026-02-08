export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome to Pulse</h1>
        <p className="text-muted-foreground">
          Start by creating your AI-powered resume.
        </p>
      </div>

      <div className="rounded-lg border p-6 flex items-center justify-between">
        <div>
          <p className="font-medium">Create your resume</p>
          <p className="text-sm text-muted-foreground">
            Answer a few questions and let AI build your resume.
          </p>
        </div>

        <a
          href="/resume/ai"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Build Resume
        </a>
      </div>
    </div>
  );
}
