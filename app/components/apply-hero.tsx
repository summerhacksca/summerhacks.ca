/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUp, X } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

const logo = "/logos/fullwhite-nobg.svg";
type ModalMode = "login" | "signup";

export default function ApplyHero() {
	const router = useRouter();
	const videoRef = useRef<HTMLVideoElement>(null);
	const [useGifFallback, setUseGifFallback] = useState(false);
	const [email, setEmail] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState<ModalMode>("signup");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [emailLookupLoading, setEmailLookupLoading] = useState(false);
	const [authLoading, setAuthLoading] = useState(false);
	const [authError, setAuthError] = useState("");

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const attemptAutoplay = async () => {
			try {
				const playPromise = video.play();
				if (playPromise) {
					await playPromise;
				}
			} catch {
				// iOS Low Power Mode commonly blocks autoplay.
				setUseGifFallback(true);
			}
		};

		attemptAutoplay();
	}, []);

	const handleArrowClick = async () => {
		const normalizedEmail = email.trim();
		if (!normalizedEmail) {
			setAuthError("Enter your email first.");
			return;
		}

		setEmailLookupLoading(true);
		setAuthError("");

		try {
			const response = await fetch("/api/application/email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: normalizedEmail }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Unable to check your email.");
			}

			setModalMode(data.flow === "login" ? "login" : "signup");
			setPassword("");
			setPasswordConfirmation("");
			setModalOpen(true);
		} catch (error) {
			const message =
				(error as Error)?.message || "Unable to check your email.";
			setAuthError(message);
			toast.error(message);
		} finally {
			setEmailLookupLoading(false);
		}
	};

	const closeAuthModal = () => {
		if (authLoading) return;
		setModalOpen(false);
		setPassword("");
		setPasswordConfirmation("");
		setAuthError("");
	};

	const handleAuthSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const normalizedEmail = email.trim().toLowerCase();
		if (!normalizedEmail) {
			setAuthError("Enter your email first.");
			return;
		}

		if (!password) {
			setAuthError("Enter a password.");
			return;
		}

		setAuthLoading(true);
		setAuthError("");

		try {
			const supabase = createClient();
			if (modalMode === "login") {
				const signInResult = await supabase.auth.signInWithPassword({
					email: normalizedEmail,
					password,
				});

				if (signInResult.error) {
					throw signInResult.error;
				}

				router.replace("/application");
				router.refresh();
				return;
			}

			if (password !== passwordConfirmation) {
				setAuthError("Passwords do not match.");
				return;
			}

			const signUpResult = await supabase.auth.signUp({
				email: normalizedEmail,
				password,
				options: {
					emailRedirectTo: "https://summerhacks.ca/auth/confirm?next=/application",
				},
			});

			if (signUpResult.error) {
				throw signUpResult.error;
			}

			if (signUpResult.data.session) {
				router.replace("/application");
				router.refresh();
				return;
			}

			closeAuthModal();
			toast.success("Account created. Check your email to finish signing in.");
		} catch (error) {
			const message =
				(error as Error)?.message || "Something went wrong while signing in.";
			setAuthError(message);
			toast.error(message);
		} finally {
			setAuthLoading(false);
		}
	};

	return (
		<div className="content-stretch flex flex-col items-start p-3 relative shrink-0 w-full z-4">
			<div className="content-stretch flex flex-col h-[calc(100dvh-24px)] items-center justify-center overflow-clip p-9 max-sm:p-5 relative shrink-0 w-full">
				<div
					aria-hidden="true"
					className="absolute inset-0 pointer-events-none"
				>
					{useGifFallback ? (
						<img
							alt=""
							className="absolute max-w-none object-50%-50% object-cover size-full"
							src="/videofallback.gif"
						/>
					) : (
						<video
							ref={videoRef}
							className="absolute max-w-none object-50%-50% object-cover size-full"
							autoPlay
							muted
							loop
							playsInline
							preload="auto"
							disablePictureInPicture
							onError={() => setUseGifFallback(true)}
						>
							<source src="/video.mp4" type="video/mp4" />
						</video>
					)}
					<div className="absolute inset-0 bg-black/20 object-cover" />
				</div>

				<Header />
				<MainContent
					email={email}
					setEmail={setEmail}
					authError={authError}
					setAuthError={setAuthError}
					onOpenAuthModal={handleArrowClick}
					emailLookupLoading={emailLookupLoading}
				/>
						<AuthModal
					open={modalOpen}
							mode={modalMode}
					email={email}
					password={password}
					passwordConfirmation={passwordConfirmation}
					authError={authError}
					authLoading={authLoading}
					setPassword={setPassword}
					setPasswordConfirmation={setPasswordConfirmation}
							onClose={closeAuthModal}
					onSubmit={handleAuthSubmit}
				/>
			</div>
		</div>
	);
}

function Header() {
	return (
		<div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
			<div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
				<p className="hidden md:block font-['Maison Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-(--text\/on-dark,white) text-nowrap text-right tracking-[-0.28px]">
					Summer 2026 - 2 days
				</p>
				<div className="relative shrink-0">
					<img
						alt=""
						className="md:hidden block max-w-[40vw] size-full"
						src={logo}
					/>
				</div>
			</div>
			<div className="content-stretch gap-[5.842px] items-center justify-center relative shrink-0 hidden md:flex">
				<div className="relative shrink-0">
					<img
						alt=""
						className="block max-w-none size-full"
						src={logo}
					/>
				</div>
			</div>
			<div className="basis-0 content-stretch flex grow items-center justify-end min-h-px min-w-px relative shrink-0">
				<div className="flex flex-col gap-1">
					<p className="font-['Maison Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-(--text\/on-dark,white) text-nowrap text-right tracking-[-0.28px]">
						Outdoor hackathon
					</p>
					<p className="block md:hidden font-['Maison Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-(--text\/on-dark,white) text-nowrap tracking-[-0.28px]">
						Summer 2026 - 2 days
					</p>
				</div>
			</div>
		</div>
	);
}

function MainContent({
	email,
	setEmail,
	authError,
	setAuthError,
	onOpenAuthModal,
	emailLookupLoading,
}: {
	email: string;
	setEmail: (value: string) => void;
	authError: string;
	setAuthError: (value: string) => void;
	onOpenAuthModal: () => void;
	emailLookupLoading: boolean;
}) {
	return (
		<div className="basis-0 content-stretch flex flex-col gap-12 grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full">
			<div className="content-stretch flex flex-col gap-12 items-center not-italic relative shrink-0 text-(--text\/on-dark,white) text-center w-full">
				<div className="flex flex-col items-center gap-2 self-stretch">
					<p className="font-['Maison Neue:Book',sans-serif] leading-[normal] relative shrink-0 text-[16px] text-nowrap text-shadow-[0px_0px_20px_rgba(0,0,0,0.25)]">
						This August
					</p>
					<div className="flex flex-col font-['Maison Neue:Medium',sans-serif] font-medium justify-end leading-0 min-w-full relative shrink-0 text-[32px] text-shadow-[0px_0px_30px_rgba(0,0,0,0.25)] tracking-[-0.64px] w-min">
						<p className="leading-none">Say Hello to SummerHacks</p>
					</div>
				</div>
			</div>

			<EmailSignup
				email={email}
				setEmail={setEmail}
				authError={authError}
				setAuthError={setAuthError}
				onOpenAuthModal={onOpenAuthModal}
				emailLookupLoading={emailLookupLoading}
			/>
		</div>
	);
}

function EmailSignup({
	email,
	setEmail,
	authError,
	setAuthError,
	onOpenAuthModal,
	emailLookupLoading,
}: {
	email: string;
	setEmail: (value: string) => void;
	authError: string;
	setAuthError: (value: string) => void;
	onOpenAuthModal: () => void;
	emailLookupLoading: boolean;
}) {
	const getPlaceholder = () => {
		return authError ? authError || "error, try again..." : "your email...";
	};

	return (
		<div className="bg-(--base\/0,white) content-stretch flex gap-6 h-14 items-center overflow-clip pl-4 pr-4 py-2 relative rounded-md shadow-[0px_20px_50px_0px_rgba(0,0,0,0.25)] shrink-0 max-sm:flex-col max-sm:h-auto max-sm:items-start max-sm:gap-3.5 max-sm:p-4 max-sm:w-full max-sm:max-w-82.5">
			<div className="content-stretch flex gap-2 items-center relative shrink-0">
				<div className="relative shrink-0 size-2.5">
					<div
						className="absolute inset-0"
						style={
							{
								"--fill-0": "rgba(253, 184, 105, 1)",
							} as React.CSSProperties
						}
					>
						<svg
							preserveAspectRatio="none"
							width="100%"
							height="100%"
							overflow="visible"
							style={{ display: "block" }}
							viewBox="0 0 17 17"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								id="Ellipse 400"
								cx="8.5"
								cy="8.5"
								r="8.5"
								fill="var(--fill-0, #F80000)"
							/>
						</svg>
					</div>
				</div>
				<p className="font-['Maison Neue:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-(--base\/800,#2a2a2a) text-nowrap tracking-[-0.64px]">
					Create an account. Enter your email.
				</p>
			</div>
			<div className="content-stretch flex gap-0.5 h-full items-center relative shrink-0 max-sm:h-13.5 max-sm:w-full">
				<div className="border border-(--primary\/sun\/100,#ffefdd) border-solid content-stretch flex h-full items-center overflow-clip px-5 py-0 relative rounded-[100px] shrink-0 w-72.5 max-sm:w-auto max-sm:grow">
					{authError && !email ? (
						<p
							className="font-['Maison Neue:Book',sans-serif] leading-[normal] not-italic text-[14px] text-red-400 tracking-[-0.56px] cursor-pointer"
							onClick={() => setAuthError("")}
						>
							{authError}
						</p>
					) : (
						<input
							type="text"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								if (authError) setAuthError("");
							}}
							placeholder={getPlaceholder()}
							disabled={false}
							className={`font-['Maison Neue:Book',sans-serif] leading-[normal] not-italic w-full bg-transparent outline-none text-[14px] text-[#fdb869] tracking-[-0.56px] disabled:opacity-50 ${
								authError
									? "placeholder:text-red-400"
									: "placeholder:text-[#f80]"
							}`}
						/>
					)}
				</div>
					<button
						type="button"
						onClick={onOpenAuthModal}
						disabled={emailLookupLoading}
						className="aspect-54/54 bg-(--primary\/sun\/200,#f80) content-stretch flex h-full items-center justify-center overflow-clip relative rounded-[100px] shrink-0 hover:bg-(--primary\/sun\/200,#fde4c8) transition-colors disabled:opacity-50 cursor-pointer"
					>
					<div
						className="flex items-center justify-center relative shrink-0 size-5"
						style={
							{
								"--transform-inner-width": "0",
								"--transform-inner-height": "0",
							} as React.CSSProperties
						}
					>
						<div className="flex-none rotate-90">
							<div className="relative size-5">
								<ArrowUp size={20} weight="bold" className="block max-w-none size-full text-white" />
							</div>
						</div>
					</div>
				</button>
			</div>
			</div>
	);
}

function AuthModal({
	open,
	mode,
	email,
	password,
	passwordConfirmation,
	authError,
	authLoading,
	setPassword,
	setPasswordConfirmation,
	onClose,
	onSubmit,
}: {
	open: boolean;
	mode: ModalMode;
	email: string;
	password: string;
	passwordConfirmation: string;
	authError: string;
	authLoading: boolean;
	setPassword: (value: string) => void;
	setPasswordConfirmation: (value: string) => void;
	onClose: () => void;
	onSubmit: (event: React.FormEvent) => void;
}) {
	if (!open) return null;

	const isLogin = mode === "login";
	const title = isLogin ? "Log in" : "Create your account";
	const description = isLogin
		? "Welcome back. Enter your password to continue."
		: "Set a password to create your application account.";

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
			<div className="w-full max-w-md rounded-lg border border-[#ffe5cd] bg-[#fffbf6] p-6 shadow-[0px_32px_80px_rgba(0,0,0,0.25)]">
				<div className="flex items-start justify-between gap-4">
					<div>
						<p className="font-['Maison Neue:Medium',sans-serif] text-[16px] tracking-[-0.64px] text-[#2a2a2a]">
							{title}
						</p>
						<p className="mt-1 text-[14px] leading-[130%] tracking-[-0.28px] text-[#2a2a2a]/70">
							{email ? email : "Enter your email on the page first."}
						</p>
						<p className="mt-2 text-[14px] leading-[130%] tracking-[-0.28px] text-[#2a2a2a]/70">
							{description}
						</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="flex size-10 items-center justify-center rounded-full bg-[#ffefdd] text-[#b07f46] transition-colors hover:bg-[#fde4c8]"
					>
						<X size={18} weight="bold" />
					</button>
				</div>

				<form onSubmit={onSubmit} className="mt-6 space-y-4">
					<label className="block">
						<span className="mb-2 block text-[14px] tracking-[-0.28px] text-[#2a2a2a]">
							Password
						</span>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="new-password"
							className="w-full rounded-[18px] border border-[#ffe5cd] bg-white px-4 py-3 text-[14px] text-[#2a2a2a] outline-none placeholder:text-[#b07f46]/50 focus:border-[#fdb869]"
							placeholder="Enter a password"
						/>
					</label>

					{!isLogin ? (
						<label className="block">
							<span className="mb-2 block text-[14px] tracking-[-0.28px] text-[#2a2a2a]">
								Confirm password
							</span>
							<input
								type="password"
								value={passwordConfirmation}
								onChange={(e) => setPasswordConfirmation(e.target.value)}
								autoComplete="new-password"
								className="w-full rounded-[18px] border border-[#ffe5cd] bg-white px-4 py-3 text-[14px] text-[#2a2a2a] outline-none placeholder:text-[#b07f46]/50 focus:border-[#fdb869]"
								placeholder="Confirm your password"
							/>
						</label>
					) : null}

					{authError ? (
						<p className="text-[14px] tracking-[-0.28px] text-red-500">
							{authError}
						</p>
					) : null}

					<div className="flex items-center justify-end gap-3 pt-2">
						<button
							type="button"
							onClick={onClose}
							disabled={authLoading}
							className="rounded-[100px] px-4 py-3 text-[14px] tracking-[-0.28px] text-[#b07f46] transition-colors hover:bg-[#ffefdd] disabled:opacity-50"
						>
							Back
						</button>
						<button
							type="submit"
							disabled={authLoading}
							className="bg-(--primary\/sun\/100,#ffefdd) text-[#B07F46] inline-flex h-14 items-center justify-center overflow-clip px-4 rounded-[100px] shrink-0 hover:bg-(--primary\/sun\/200,#fde4c8) transition-colors disabled:opacity-50 cursor-pointer"
						>
							<div className="flex items-center justify-center gap-2 relative shrink-0">
								{isLogin ? "Log in" : "Create account"}
								<div className="flex-none rotate-90">
									<ArrowUp size={20} weight="bold" className="block max-w-none size-full" />
								</div>
							</div>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}