import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

type ApplicationPayload = Record<string, string>;

function isRecordOfStrings(value: unknown): value is ApplicationPayload {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every((entry) => typeof entry === "string");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const applicationData = body.applicationData;

    if (!isRecordOfStrings(applicationData)) {
      return NextResponse.json(
        { error: "applicationData must be an object of string values" },
        { status: 400 },
      );
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data, error } = await supabaseAdmin
      .from("application_submissions")
      .insert({
        applicant_email: email.length > 0 ? email.toLowerCase() : null,
        application_data: applicationData,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Failed to save application:", error);
      return NextResponse.json(
        { error: "Failed to save application" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "Application saved",
        id: data.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Application submit route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
