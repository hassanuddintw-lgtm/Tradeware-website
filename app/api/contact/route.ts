import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";
import { sendContactInquiryEmail } from "@/lib/email";

const bodySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  country: z.string().optional(),
  vehicleId: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    const parsed = bodySchema.safeParse(raw);
    if (!parsed.success) {
      const msg = parsed.error.errors[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    const data = parsed.data;
    const toEmails = Array.isArray(siteConfig.contact.emails)
      ? siteConfig.contact.emails
      : siteConfig.contact.email
        ? [siteConfig.contact.email]
        : [];
    if (toEmails.length === 0) {
      return NextResponse.json(
        { error: "Contact email not configured" },
        { status: 500 }
      );
    }
    await sendContactInquiryEmail(toEmails, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      vehicleId: data.vehicleId,
      subject: data.subject,
      message: data.message,
    });
    return NextResponse.json({
      success: true,
      message: "Your message has been sent. We will get back to you soon.",
    });
  } catch (e) {
    console.error("Contact form send error:", e);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
