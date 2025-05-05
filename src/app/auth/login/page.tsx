"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo-himti.png";
import Link from "next/link";
import { login } from "@/services/auth/authServices";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		try {
			const response = await login(email, password);
			if (response.status === 201 || response.message === "Login successful") {
				console.log("Login successful", response.data);
				router.push("/"); // Redirect to home page after successful login
			} else {
				setError("Login failed");
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else if (
				typeof error === "object" &&
				error !== null &&
				"message" in error
			) {
				setError(error.message as string);
			} else {
				setError("An unexpected error occurred");
			}
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
				</div>
				{error && (
					<div className="mb-4 p-2 bg-red-500 text-white rounded-md text-center">
						{error}
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
							className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
							className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
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
							className="text-sm font-medium text-teal-400 hover:text-emerald-400 transition-colors"
						>
							Forgot your password?
						</Link>
					</div>
					<div>
						<button
							type="submit"
							className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
						>
							Sign in
						</button>
					</div>
				</form>
				<div className="mt-6 text-center">
					<Link
						href="/auth/register"
						className="text-sm font-medium text-teal-400 hover:text-emerald-400 transition-colors"
					>
						Don&apos;t have an account? Register now
					</Link>
				</div>
			</div>
		</div>
	);
}
