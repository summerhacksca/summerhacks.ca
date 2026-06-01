import { redirect } from "next/navigation";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import ApplicationSlides from "./application-slides";

const REQUIRE_APPLICATION_SIGNIN = false;

export default async function ApplicationPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user?.email) {
		const adminClient = createAdminClient();
		const normalizedEmail = user.email.toLowerCase();
		const { data: existingSubmission, error } = await adminClient
			.from("application_submissions")
			.select("id")
			.eq("applicant_email", normalizedEmail)
			.limit(1)
			.maybeSingle();

		if (error) {
			console.error("Failed to check application status:", error);
		} else if (existingSubmission) {
			redirect("/thank-you");
		}
	}

	if (REQUIRE_APPLICATION_SIGNIN && !user) {
		redirect("/apply");
	}

	return <ApplicationSlides userEmail={user?.email ?? ""} />;
}
