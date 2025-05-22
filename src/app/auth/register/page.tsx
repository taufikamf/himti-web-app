"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo-himti.png";
import Link from "next/link";
import { register } from "@/services/auth/authServices";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/auth/PasswordInput";

export default function RegisterPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handlePasswordChange = (newPassword: string) => {
		setPassword(newPassword);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		if (value && !value.endsWith("@mhs.uinjkt.ac.id")) {
			setEmailError("Must using mhs email");
		} else {
			setEmailError("");
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		if (!email.endsWith("@mhs.uinjkt.ac.id")) {
			setEmailError("Must using mhs email");
			setIsLoading(false);
			return;
		}

		try {
			await register(name, email, password);
			router.push("/auth/login");
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("An unexpected error occurred. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}
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
					<h2 className="mt-6 text-md font-semibold">Hello!</h2>
					<h2 className="text-3xl font-extrabold">Create an Account</h2>
					<p className="mt-2 text-sm text-gray-400">Sign up to get started</p>
				</div>
				{error && (
					<div className="mb-4 p-2 bg-red-500 text-white rounded-md text-center">
						{error}
					</div>
				)}
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-300"
						>
							Full Name
						</label>
						<input
							id="name"
							name="name"
							type="text"
							autoComplete="name"
							required
							disabled={isLoading}
							className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
							placeholder="Enter your full name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
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
							disabled={isLoading}
							className={`mt-1 w-full px-3 py-2 bg-gray-700 border ${
								emailError ? "border-red-500" : "border-gray-600"
							} rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed`}
							placeholder="Enter your email (@mhs.uinjkt.ac.id)"
							value={email}
							onChange={handleEmailChange}
						/>
						{emailError && (
							<p className="mt-1 text-sm text-red-500">{emailError}</p>
						)}
					</div>
					<div className="relative">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-300"
						>
							Password
						</label>
						<PasswordInput
							value={password}
							onChange={handlePasswordChange}
							showPwdMeter={true}
							placeholder="Enter your password"
							disabled={isLoading}
						/>
					</div>
					<div>
						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
						>
							{isLoading ? (
								<>
									<svg
										className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Signing up...
								</>
							) : (
								"Sign up"
							)}
						</button>
					</div>
				</form>
				<div className="mt-6 text-center">
					<Link
						href="/auth/login"
						className="text-sm font-medium text-teal-400 hover:text-emerald-400 transition-colors"
					>
						Already have an account? Sign in
					</Link>
				</div>
			</div>
		</div>
	);
}
