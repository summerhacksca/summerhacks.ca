import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="min-h-dvh bg-[radial-gradient(circle_at_top,rgba(255,136,0,0.14),transparent_38%),linear-gradient(180deg,#fffaf3_0%,#fff_100%)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-4xl items-center justify-center">
        <section className="w-full rounded-[32px] border border-[#f3d9b8] bg-white/85 p-8 shadow-[0_18px_70px_rgba(176,127,70,0.14)] backdrop-blur-sm md:p-12">
          <p className="font-['Maison_Neue'] text-sm font-medium uppercase tracking-[0.28em] text-[#b07f46]/80">
            Application received
          </p>
          <h1 className="mt-4 max-w-xl font-['Maison_Neue'] text-4xl font-medium leading-tight text-[#2a2a2a] md:text-6xl">
            Thanks for applying.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#2a2a2a]/75 md:text-xl">
            We have your application on file. You can close this page or head back to the homepage if you want to keep browsing.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#F80] px-6 font-medium text-white transition-colors hover:bg-[#e67300]"
            >
              Return home
            </Link>
            <Link
              href="/application"
              className="inline-flex h-14 items-center justify-center rounded-full border border-[#e6c9a4] bg-transparent px-6 font-medium text-[#b07f46] transition-colors hover:bg-[#fff4e7]"
            >
              View application status
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
