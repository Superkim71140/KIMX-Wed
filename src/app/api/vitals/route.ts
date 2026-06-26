import { NextResponse } from "next/server";
import { validateWebVitalsMetric } from "@/lib/vitals";

// In-memory rate limiting map: Max 50 records per minute per client IP
const ipRequestCounts = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_MAX = 50;
const RATE_LIMIT_WINDOW_MS = 60000;

export async function POST(request: Request) {
  try {
    // Basic Rate Limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
    const now = Date.now();
    
    let rateData = ipRequestCounts.get(ip);
    if (!rateData || now - rateData.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateData = { count: 0, windowStart: now };
    }
    
    rateData.count++;
    ipRequestCounts.set(ip, rateData);
    
    if (rateData.count > RATE_LIMIT_MAX) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }

    const payload = await request.json();
    if (!validateWebVitalsMetric(payload)) {
      return NextResponse.json({ success: false, error: "Invalid payload structure" }, { status: 400 });
    }

    // Log metric internally; easily hookable to Datadog, BigQuery, or custom analytics endpoints
    console.log(`[WebVitals Telemetry] Device: ${payload.deviceClass} | Path: ${payload.pathname} | Metric: ${payload.name} = ${payload.value} ms/ratio (${payload.rating})`);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || "Internal server error" }, { status: 500 });
  }
}
