import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { APPLICATIONS_CLOSED } from "@/lib/applications";

export async function middleware(request: NextRequest) {
	/* Redirect all non‑homepage page routes when applications are closed.
	   Skip redirect for static assets (files with a dot extension) and
	   favicon / robots / sitemap so the page loads properly. */
	if (APPLICATIONS_CLOSED) {
		const { pathname } = request.nextUrl;
		const isPage =
			pathname !== "/" &&
			!pathname.startsWith("/api/") &&
			!/\.[a-zA-Z0-9]+$/.test(pathname) &&
			!pathname.startsWith("/_next/");
		if (isPage) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	let response = NextResponse.next({ request });
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
			process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						request.cookies.set(name, value),
					);
					response = NextResponse.next({ request });
					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	await supabase.auth.getUser();

	return response;
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
	],
};
