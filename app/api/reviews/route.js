import { NextResponse } from "next/server";

const SCRIPT_URL = process.env.REVIEW_API_URL || "";

// GET – fetch approved reviews from Google Apps Script
export async function GET() {
  if (!SCRIPT_URL) {
    return NextResponse.json([]);
  }
  try {
    const res = await fetch(SCRIPT_URL, {
      cache: "no-store",
      headers: { "Accept": "application/json" },
    });
    // Google Apps Script redirects — follow it
    const text = await res.text();
    try {
      const reviews = JSON.parse(text);
      return NextResponse.json(Array.isArray(reviews) ? reviews : []);
    } catch {
      return NextResponse.json([]);
    }
  } catch {
    return NextResponse.json([]);
  }
}

// POST – submit a new review to Google Apps Script
export async function POST(request) {
  if (!SCRIPT_URL) {
    return NextResponse.json(
      { error: "Review system not configured yet." },
      { status: 503 }
    );
  }
  try {
    const body = await request.json();

    // Validate
    if (!body.name || !body.rating || !body.text) {
      return NextResponse.json(
        { error: "Name, rating, and review text are required." },
        { status: 400 }
      );
    }

    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        location: body.location || "",
        rating: parseInt(body.rating, 10),
        text: body.text,
      }),
    });

    const text = await res.text();
    try {
      const result = JSON.parse(text);
      return NextResponse.json(result);
    } catch {
      // Google Apps Script sometimes returns HTML on redirect
      return NextResponse.json({ success: true });
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to submit review." },
      { status: 500 }
    );
  }
}
