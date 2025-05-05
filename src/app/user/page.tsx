"use client";

import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import { getCurrentUser, updateUser, User } from "@/services/users/userService";
import { ApiResponse } from "@/types/api";
import Image from "next/image";
import { Camera } from "lucide-react";
import { useEffect } from "react";

export default function UserProfilePage() {
	const [name, setName] = useState("");
	const [profilePicture, setProfilePicture] = useState<string | null>(null);
	const [isEditing, setIsEditing] = useState(false);

	const {
		data: userData,
		loading: loadingUser,
		error: userError,
		execute: fetchUser,
	} = useApi<ApiResponse<User>>(getCurrentUser);

	const {
		loading: updating,
		error: updateError,
		execute: executeUpdate,
	} = useApi(updateUser);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	useEffect(() => {
		if (userData?.data) {
			setName(userData.data.name);
			setProfilePicture(userData.data.profile_picture || null);
		}
	}, [userData]);

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
		if (!userData?.data?.id) return;

		const result = await executeUpdate(userData.data.id, {
			name,
			profile_picture: profilePicture || undefined,
		});

		if (result) {
			setIsEditing(false);
			fetchUser(); // Refresh user data
		}
	};

	if (loadingUser) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
			</div>
		);
	}

	if (userError) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
					<p className="text-gray-600">{userError}</p>
					<button
						onClick={() => fetchUser()}
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
				<div className="relative h-48 bg-gradient-to-r from-teal-500 to-emerald-500">
					<div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
						<div className="relative">
							{isEditing ? (
								<label className="block">
									<div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 cursor-pointer group">
										{profilePicture ? (
											<Image
												src={profilePicture}
												alt="Profile"
												width={128}
												height={128}
												className="object-cover w-full h-full"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center">
												<Camera className="w-8 h-8 text-gray-400" />
											</div>
										)}
										<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
											<Camera className="w-8 h-8 text-white" />
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
								<div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
									{profilePicture ? (
										<Image
											src={profilePicture}
											alt="Profile"
											width={128}
											height={128}
											className="object-cover w-full h-full"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center">
											<Camera className="w-8 h-8 text-gray-400" />
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="pt-20 pb-8 px-8">
					{isEditing ? (
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Name
								</label>
								<input
									type="text"
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
								/>
							</div>
							<div className="flex justify-end space-x-4">
								<button
									type="button"
									onClick={() => setIsEditing(false)}
									className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={updating}
									className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50"
								>
									{updating ? "Saving..." : "Save Changes"}
								</button>
							</div>
							{updateError && (
								<p className="text-red-500 text-sm mt-2">{updateError}</p>
							)}
						</form>
					) : (
						<div className="text-center">
							<h2 className="text-2xl font-bold text-gray-900">{name}</h2>
							<p className="text-gray-500 mt-1">{userData?.data?.email}</p>
							<button
								onClick={() => setIsEditing(true)}
								className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
							>
								Edit Profile
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
