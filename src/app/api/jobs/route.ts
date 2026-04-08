import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { skills } = await req.json();

    const query = skills.join(" ");

    const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${process.env.ADZUNA_APP_ID}&app_key=${process.env.ADZUNA_APP_KEY}&results_per_page=10&what=${query}`;

    const res = await fetch(url);
    const data = await res.json();

    const jobs = data.results.map((job: any) => ({
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      link: job.redirect_url,
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