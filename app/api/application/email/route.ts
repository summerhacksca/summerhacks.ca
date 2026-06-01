import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const USERS_PAGE_SIZE = 1000;

async function findUserByEmail(
	supabaseAdmin: SupabaseClient<any, any, any, any, any>,
	normalizedEmail: string,
) {
	let page = 1;

	while (true) {
		const { data, error } = await supabaseAdmin.auth.admin.listUsers({
			page,
			perPage: USERS_PAGE_SIZE,
		});

		if (error) {
			return { error };
		}

		const user = data.users.find(
			(candidate) => candidate.email?.toLowerCase() === normalizedEmail,
		);

		if (user) {
			return { user };
		}

		if (data.users.length < USERS_PAGE_SIZE) {
			return { user: null };
		}

		page += 1;
	}
}

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

		const normalizedEmail = email.toLowerCase().trim();
		const supabaseAdmin = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.SUPABASE_SERVICE_ROLE_KEY!,
		);

		const { user, error } = await findUserByEmail(supabaseAdmin, normalizedEmail);

		if (error) {
			console.error("Supabase auth lookup error:", error);
			return NextResponse.json(
				{ error: "Failed to check account status" },
				{ status: 500 },
			);
		}

		return NextResponse.json({
			exists: Boolean(user),
			flow: user ? "login" : "signup",
		});
	} catch (error) {
		console.error("Error checking email existence:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
