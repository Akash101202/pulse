import { NextResponse } from "next/server";
import SavedJob from "@/models/SavedJob";
import { connectDB } from "@/lib/db";


export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const saved = await SavedJob.create(body);

  return NextResponse.json(saved);
}