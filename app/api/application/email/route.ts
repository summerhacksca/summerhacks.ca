import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { email } = body;

		if (!email || typeof email !== "string") {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: "Invalid email format" },
				{ status: 400 },
			);
		}

		// Always return "signup" — the client switches to login mode if Supabase
		// returns a "User already registered" error during sign-up. This prevents
		// unauthenticated enumeration of registered email addresses.
		return NextResponse.json({ flow: "signup" });
	} catch (error) {
		console.error("Error in email check:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
