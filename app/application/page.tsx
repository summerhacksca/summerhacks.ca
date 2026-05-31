import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import ApplicationSlides from "./application-slides";

const REQUIRE_APPLICATION_SIGNIN = false;

export default async function ApplicationPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (REQUIRE_APPLICATION_SIGNIN && !user) {
		redirect("/apply");
	}

	return <ApplicationSlides userEmail={user?.email ?? ""} />;
}
