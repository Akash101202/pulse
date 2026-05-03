import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const skillsParam = searchParams.get("skills") || "developer";

    const query = encodeURIComponent(skillsParam);

    const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${process.env.ADZUNA_APP_ID}&app_key=${process.env.ADZUNA_APP_KEY}&results_per_page=10&what=${query}`;

    const res = await fetch(url);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Adzuna API failed" },
        { status: res.status }
      );
    }

    const data = await res.json();

    const jobs = data.results.map((job: any) => ({
      id: job.id,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      url: job.redirect_url,
    }));

    return NextResponse.json(jobs);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}