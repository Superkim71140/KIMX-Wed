import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Name, Phone, Service, Message } = body;

    // Validate required fields
    if (!Name || !Phone) {
      return NextResponse.json(
        { success: false, error: "กรุณากรอกชื่อและเบอร์โทรศัพท์" },
        { status: 400 }
      );
    }

    const webhookUrl =
      process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbwOe8EJTdR9Dj9QV3lRwRtu-S4JnHV3OOMDH2WR7aOYDpK5n1Uy9Xl6PPu6y9R_XORA/exec";

    // Format data as form parameters (FormData/urlencoded) to match Google Apps Script expectations
    const formData = new URLSearchParams();
    formData.append("Name", Name);
    formData.append("Phone", Phone);
    formData.append("Service", Service || "");
    formData.append("Message", Message || "");

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const text = await response.text();
      return NextResponse.json(
        { success: false, error: `Google Apps Script returned an error: ${text}` },
        { status: 502 }
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("API error submitting contact:", error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
