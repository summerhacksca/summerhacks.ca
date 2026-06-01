import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import ApplyHero from "@/app/components/apply-hero";

export default async function ApplyPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	console.log("[/apply] signed in:", Boolean(user), user?.email ?? null);

	if (user) {
		redirect("/application");
	}

	return <ApplyHero />;
}