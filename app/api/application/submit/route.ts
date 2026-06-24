import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ApplicationPayload = Record<string, string>;

function isRecordOfStrings(value: unknown): value is ApplicationPayload {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every((entry) => typeof entry === "string");
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const applicationData = body.applicationData;

    if (!isRecordOfStrings(applicationData)) {
      return NextResponse.json(
        { error: "applicationData must be an object of string values" },
        { status: 400 },
      );
    }

    // Use the server-verified email from the authenticated session,
    // not the client-supplied value, to prevent impersonation.
    const email = user.email ?? "";

    const supabaseAdmin = createAdminClient(
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
      // Postgres unique_violation code — duplicate submission from this email
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "An application has already been submitted for this account." },
          { status: 409 },
        );
      }
      console.error("Failed to save application:", error);
      return NextResponse.json(
        {
          error: "Failed to save application",
          details:
            process.env.NODE_ENV === "production"
              ? undefined
              : error.message ?? String(error),
        },
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
