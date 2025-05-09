"use client";

import { useState, useEffect, useRef } from "react";
import { useApi } from "@/hooks/useApi";
import { updateUser } from "@/services/users/userService";
import {
	Camera,
	Mail,
	User,
	Check,
	X,
	EditIcon,
	ShieldCheck,
} from "lucide-react";
import ErrorPage from "@/components/ui/ErrorPage";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
	const [name, setName] = useState("");
	const [profilePicture, setProfilePicture] = useState<string | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { user, loading: loadingUser, refreshUser } = useAuth();
	const hasAttemptedRefresh = useRef(false);
	const router = useRouter();

	const {
		loading: updating,
		error: updateError,
		execute: executeUpdate,
	} = useApi(updateUser);

	// Redirect to login if user is not logged in
	useEffect(() => {
		if (!loadingUser && !user && hasAttemptedRefresh.current) {
			// User is not logged in and we've already tried to refresh
			router.push(`/auth/login?from=${encodeURIComponent("/user")}`);
		}
	}, [user, loadingUser, router]);

	// Only trigger refreshUser once when the component mounts
	useEffect(() => {
		const fetchUser = async () => {
			// Only try to fetch once to prevent infinite loops
			if (hasAttemptedRefresh.current) return;

			hasAttemptedRefresh.current = true;
			try {
				setError(null);
				const success = await refreshUser();
				if (!success) {
					setError("Failed to load user profile. Please try again.");
				}
			} catch (error) {
				setError("An error occurred while loading your profile.");
				console.error("Profile loading error:", error);
			}
		};

		// Only fetch if user is null and we're not already loading
		if (!user && !loadingUser && !hasAttemptedRefresh.current) {
			fetchUser();
		}
	}, [user, loadingUser, refreshUser]); // Dependencies needed but with guard clauses

	// This effect updates local state when user data changes
	useEffect(() => {
		if (user) {
			setName(user.name);
			setProfilePicture(user.profile_picture || null);
		}
	}, [user]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfilePicture(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user?.id) return;

		const result = await executeUpdate(user.id, {
			name,
			profile_picture: profilePicture || undefined,
		});

		if (result) {
			setIsEditing(false);
			hasAttemptedRefresh.current = false; // Allow one more refresh
			await refreshUser(); // Refresh user data
		}
	};

	const handleRetry = async () => {
		setError(null);
		hasAttemptedRefresh.current = false; // Reset to allow retry
		await refreshUser();
	};

	if (loadingUser) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
			</div>
		);
	}

	if (!user) {
		return (
			<ErrorPage
				title="Error Loading Profile"
				message={error || "Unable to load user profile"}
				buttonText="Try Again"
				onRetry={handleRetry}
			/>
		);
	}

	return (
		<div className="min-h-screen py-16 px-6 sm:px-8 lg:px-12">
			<div className="max-w-5xl mx-auto">
				{/* Profile Header Card */}
				<div className="bg-slate-800/80 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 mb-10">
					{/* Cover Image with Gradient */}
					<div className="h-64 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/70 relative">
						<div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-20"></div>
					</div>

					{/* Profile Content */}
					<div className="relative px-8 sm:px-12 py-8 pb-12">
						{/* Profile Image */}
						<div className="absolute -top-24 left-1/2 transform -translate-x-1/2 sm:-translate-x-0 sm:left-12">
							{isEditing ? (
								<label className="block">
									<div className="relative w-48 h-48 rounded-full overflow-hidden bg-slate-900 border-4 border-slate-800 shadow-xl cursor-pointer group">
										{profilePicture ? (
											<img
												src={profilePicture}
												alt="Profile"
												className="w-full h-full object-cover"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center">
												<Camera className="w-16 h-16 text-slate-600" />
											</div>
										)}
										<div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
											<Camera className="w-12 h-12 text-white" />
											<span className="absolute bottom-4 text-white text-sm font-medium">
												Change Photo
											</span>
										</div>
									</div>
									<input
										type="file"
										className="hidden"
										accept="image/*"
										onChange={handleImageChange}
									/>
								</label>
							) : (
								<div className="relative w-48 h-48 rounded-full overflow-hidden bg-slate-900 border-4 border-slate-800 shadow-xl">
									{profilePicture ? (
										<img
											src={profilePicture}
											alt="Profile"
											className="w-full h-full object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center">
											<User className="w-16 h-16 text-slate-600" />
										</div>
									)}
								</div>
							)}
						</div>

						{/* User Info */}
						<div className="pt-28 sm:pt-6 sm:pl-56 flex flex-col items-center sm:items-start">
							<div className="text-center sm:text-left mb-8">
								{isEditing ? (
									<div className="w-full sm:w-96">
										<input
											type="text"
											id="name"
											value={name}
											onChange={(e) => setName(e.target.value)}
											className="w-full px-6 py-3 bg-slate-700/60 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white text-2xl font-bold"
										/>
									</div>
								) : (
									<h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
										{name}
									</h2>
								)}

								<div className="flex items-center justify-center sm:justify-start mt-3 text-slate-300 text-lg">
									<Mail className="w-5 h-5 mr-2" />
									<span>{user.email}</span>
								</div>

								{user.role && (
									<div className="mt-4 inline-flex items-center px-4 py-2 bg-primary/20 text-primary rounded-full text-md font-medium">
										<ShieldCheck className="w-5 h-5 mr-2" />
										{user.role}
									</div>
								)}
							</div>
						</div>

						{/* Action Buttons - Moved to bottom with more space */}
						<div className="flex justify-center sm:justify-end mt-4">
							{isEditing ? (
								<div className="flex space-x-4">
									<button
										type="button"
										onClick={() => setIsEditing(false)}
										className="flex items-center px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-colors text-lg"
									>
										<X className="w-5 h-5 mr-2" />
										Cancel
									</button>
									<button
										onClick={handleSubmit}
										disabled={updating}
										className="flex items-center px-8 py-3 bg-primary text-slate-900 font-medium rounded-xl hover:bg-primary/80 transition-colors disabled:opacity-50 text-lg"
									>
										{updating ? (
											<>
												<div className="w-5 h-5 mr-2 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
												Saving...
											</>
										) : (
											<>
												<Check className="w-5 h-5 mr-2" />
												Save Changes
											</>
										)}
									</button>
								</div>
							) : (
								<button
									onClick={() => setIsEditing(true)}
									className="flex items-center px-8 py-3 bg-primary text-slate-900 font-medium rounded-xl hover:bg-primary/80 transition-colors shadow-lg text-lg"
								>
									<EditIcon className="w-5 h-5 mr-2" />
									Edit Profile
								</button>
							)}
						</div>
					</div>
				</div>

				{/* Error Display */}
				{updateError && (
					<div className="bg-red-900/30 border border-red-800 text-white rounded-xl p-6 mb-10 flex items-center text-lg">
						<X className="w-6 h-6 text-red-500 mr-4 flex-shrink-0" />
						<p>{updateError}</p>
					</div>
				)}

				{/* Additional Profile Sections */}
				<div className="bg-slate-800/80 rounded-3xl border border-slate-700 p-8 mb-10">
					<h3 className="text-2xl font-bold mb-4 text-white">
						Account Information
					</h3>
					<div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
						<p className="text-slate-300 text-lg">
							This is your personal profile page. Here you can update your
							profile information and manage your account settings.
						</p>
						<p className="text-slate-400 mt-4">
							For security reasons, email address changes are not allowed
							through this interface.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
