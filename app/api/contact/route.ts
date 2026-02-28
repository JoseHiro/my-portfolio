import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_EMAIL ?? "onboarding@resend.dev";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: unknown): { name: string; email: string; message: string } | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }
  const { name, email, message } = body as Record<string, unknown>;
  if (typeof name !== "string" || !name.trim()) {
    return { error: "Name is required" };
  }
  if (typeof email !== "string" || !email.trim()) {
    return { error: "Email is required" };
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return { error: "Invalid email address" };
  }
  if (typeof message !== "string" || !message.trim()) {
    return { error: "Message is required" };
  }
  return { name: name.trim(), email: email.trim(), message: message.trim() };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = validate(body);
    if ("error" in validated) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 503 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: validated.email,
      subject: `Contact from ${validated.name}`,
      text: validated.message,
      html: `
        <p><strong>From:</strong> ${validated.name} &lt;${validated.email}&gt;</p>
        <p><strong>Message:</strong></p>
        <p>${validated.message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: error.message ?? "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
