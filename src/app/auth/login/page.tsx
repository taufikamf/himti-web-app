"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo-himti.png";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const fromPath = searchParams.get("from");
	const { login, error: authError, user } = useAuth();

	// Check if user is already logged in
	useEffect(() => {
		if (user) {
			router.push(fromPath || "/");
		}
	}, [user, router, fromPath]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			const success = await login(email, password);

			if (success) {
				// Add small delay to ensure cookie is set
				setTimeout(() => {
					// Redirect to the original path if available, otherwise go to home
					router.push(fromPath || "/");
					router.refresh(); // Force router refresh to update navigation state
				}, 500);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
			<div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-2xl transform transition-all hover:scale-105 duration-300">
				<div className="text-center mb-8">
					<div className="inline-block rounded-full animate-pulse">
						<Image
							src={logo}
							alt="Logo"
							width={150}
							height={150}
							className="rounded-full"
						/>
					</div>
					<h2 className="mt-6 text-md font-semibold">Hi there!</h2>
					<h2 className="text-3xl font-extrabold">Welcome Back</h2>
					<p className="mt-2 text-sm text-gray-400">Sign in to your account</p>
					{fromPath && (
						<p className="mt-2 text-sm text-primary">
							You need to sign in to access this page
						</p>
					)}
				</div>
				{authError && (
					<div className="mb-4 p-2 bg-red-500 text-white rounded-md text-center">
						{authError}
					</div>
				)}
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-300"
						>
							Email address
						</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="relative">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-300"
						>
							Password
						</label>
						<input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							autoComplete="current-password"
							required
							className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary pr-10"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							type="button"
							onClick={handleTogglePassword}
							className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6"
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? (
								<EyeOff className="h-5 w-5 text-gray-400" />
							) : (
								<Eye className="h-5 w-5 text-gray-400" />
							)}
						</button>
					</div>
					<div className="flex items-center justify-end">
						<Link
							href="/auth/forgot-password"
							className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
						>
							Forgot your password?
						</Link>
					</div>
					<div>
						<button
							type="submit"
							disabled={loading}
							className="w-full bg-primary hover:bg-primary/80 text-foreground font-semibold py-2 px-4 rounded-md transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
						>
							{loading ? (
								<>
									<span className="mr-2">Signing in</span>
									<div className="animate-spin h-4 w-4 border-2 border-foreground border-t-transparent rounded-full"></div>
								</>
							) : (
								"Sign in"
							)}
						</button>
					</div>
				</form>
				<div className="mt-6 text-center">
					<Link
						href="/auth/register"
						className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
					>
						Don&apos;t have an account? Register now
					</Link>
				</div>
			</div>
		</div>
	);
}
