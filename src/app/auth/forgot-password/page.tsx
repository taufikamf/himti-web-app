"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo-himti.png";
import Link from "next/link";
import { useApi } from "@/hooks/useApi";
import {
	forgotPassword,
	verifyOTP,
	resetPassword,
} from "@/services/auth/authServices";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/auth/PasswordInput";

type Step = "email" | "otp" | "reset";

export default function ForgotPasswordPage() {
	const [step, setStep] = useState<Step>("email");
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const router = useRouter();

	const {
		loading: sendingEmail,
		error: emailError,
		execute: executeForgotPassword,
	} = useApi(forgotPassword);

	const {
		loading: verifyingOTP,
		error: otpError,
		execute: executeVerifyOTP,
	} = useApi(verifyOTP);

	const {
		loading: resettingPassword,
		error: resetError,
		execute: executeResetPassword,
	} = useApi(resetPassword);

	const handleEmailSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await executeForgotPassword(email);
		if (result) {
			setStep("otp");
		}
	};

	const handleOTPSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await executeVerifyOTP(email, otp);
		if (result) {
			setStep("reset");
		}
	};

	const handleResetSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await executeResetPassword(email, otp, newPassword);
		if (result) {
			router.push("/auth/login");
		}
	};

	const renderStep = () => {
		switch (step) {
			case "email":
				return (
					<form onSubmit={handleEmailSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-300"
							>
								Email address
							</label>
							<input
								id="email"
								type="email"
								required
								className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						{emailError && (
							<div className="text-red-500 text-sm">{emailError}</div>
						)}
						<button
							type="submit"
							disabled={sendingEmail}
							className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 disabled:opacity-50"
						>
							{sendingEmail ? "Sending..." : "Send Reset Link"}
						</button>
					</form>
				);

			case "otp":
				return (
					<form onSubmit={handleOTPSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="otp"
								className="block text-sm font-medium text-gray-300"
							>
								Enter OTP
							</label>
							<input
								id="otp"
								type="text"
								required
								className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
								placeholder="Enter OTP code"
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
							/>
						</div>
						{otpError && <div className="text-red-500 text-sm">{otpError}</div>}
						<button
							type="submit"
							disabled={verifyingOTP}
							className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 disabled:opacity-50"
						>
							{verifyingOTP ? "Verifying..." : "Verify OTP"}
						</button>
					</form>
				);

			case "reset":
				return (
					<form onSubmit={handleResetSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="newPassword"
								className="block text-sm font-medium text-gray-300"
							>
								New Password
							</label>
							<PasswordInput
								value={newPassword}
								onChange={(value) => setNewPassword(value)}
								showPwdMeter={true}
								placeholder="Enter new password"
							/>
						</div>
						{resetError && (
							<div className="text-red-500 text-sm">{resetError}</div>
						)}
						<button
							type="submit"
							disabled={resettingPassword}
							className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 disabled:opacity-50"
						>
							{resettingPassword ? "Resetting..." : "Reset Password"}
						</button>
					</form>
				);
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
					<h2 className="mt-6 text-3xl font-extrabold">Reset Password</h2>
					<p className="mt-2 text-sm text-gray-400">
						{step === "email"
							? "Enter your email to reset password"
							: step === "otp"
							? "Enter the OTP sent to your email"
							: "Create your new password"}
					</p>
				</div>

				{renderStep()}

				<div className="mt-6 text-center">
					<Link
						href="/auth/login"
						className="text-sm font-medium text-teal-400 hover:text-emerald-400 transition-colors"
					>
						Back to Login
					</Link>
				</div>
			</div>
		</div>
	);
}
