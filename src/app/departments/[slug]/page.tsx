"use client";

import { useState, useEffect, useRef } from "react";
import {
	Department,
	getDepartmentBySlug,
} from "@/services/departments/departmentService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ChevronLeft, User, Award } from "lucide-react";

export default function DepartmentPage({
	params,
}: {
	params: { slug: string };
}) {
	const [department, setDepartment] = useState<Department | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState<string | null>(null);
	const router = useRouter();
	const isFetching = useRef(false);

	useEffect(() => {
		const fetchDepartment = async () => {
			// Prevent concurrent fetches
			if (isFetching.current) {
				return;
			}

			isFetching.current = true;
			setLoading(true);

			try {
				const data = await getDepartmentBySlug(params.slug);
				if (data) {
					setDepartment(data);
					// Set active tab to first division by default if there are divisions
					if (data.divisions && data.divisions.length > 0) {
						setActiveTab(data.divisions[0].id);
					}
				} else {
					setError(`Department "${params.slug}" not found`);
				}
			} catch (error) {
				console.error("Failed to fetch department:", error);
				setError("Failed to load department data");
			} finally {
				setLoading(false);
				isFetching.current = false;
			}
		};

		fetchDepartment();
	}, [params.slug]);

	if (loading) {
		return (
			<div className="w-full p-6 md:p-8 min-h-screen ">
				<div className="max-w-7xl mx-auto">
					<div className="animate-pulse">
						<div className="h-12 w-48 bg-gray-700 rounded-lg mb-4"></div>
						<div className="h-8 w-96 bg-gray-700/60 rounded-lg mb-12"></div>
						<div className="h-14 w-full bg-gray-800 rounded-xl mb-10"></div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<div
									key={i}
									className="bg-gray-800/80 p-6 rounded-xl shadow-lg"
								>
									<div className="h-6 w-3/5 bg-gray-700 rounded-lg mb-6"></div>
									<div className="h-48 w-full bg-gray-700 rounded-xl mb-4"></div>
									<div className="flex justify-between items-center">
										<div className="h-4 w-28 bg-gray-700 rounded-md"></div>
										<div className="h-6 w-16 bg-primary/30 rounded-full"></div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error || !department) {
		return (
			<div className="w-full p-6 md:p-8 min-h-screen text-white">
				<div className="max-w-2xl mx-auto text-center bg-gray-800/80 p-10 rounded-2xl shadow-lg border border-gray-700">
					<div className="text-red-400 mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-16 w-16 mx-auto"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<h1 className="text-3xl font-bold text-red-400">
						Department Not Found
					</h1>
					<p className="mt-4 text-gray-400 mb-8">
						{error || "Department data could not be loaded"}
					</p>
					<button
						onClick={() => router.push("/")}
						className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors shadow-md inline-flex items-center"
					>
						<ChevronLeft className="w-4 h-4 mr-2" />
						Return to Home
					</button>
				</div>
			</div>
		);
	}

	const groupedDivisions = department.divisions.reduce(
		(acc, division) => {
			const hasMembers = division.members && division.members.length > 0;
			if (hasMembers) {
				acc.withMembers.push(division);
			} else {
				acc.withoutMembers.push(division);
			}
			return acc;
		},
		{ withMembers: [], withoutMembers: [] } as {
			withMembers: typeof department.divisions;
			withoutMembers: typeof department.divisions;
		}
	);

	// Sort divisions with members first, then by name
	const sortedDivisions = [
		...groupedDivisions.withMembers,
		...groupedDivisions.withoutMembers,
	];

	return (
		<div className="w-full min-h-screen text-white">
			<div className="max-w-7xl mx-auto p-6 md:p-8">
				{/* Department Header */}
				<div className="mb-12">
					<button
						onClick={() => router.push("/")}
						className="inline-flex items-center text-gray-400 hover:text-primary mb-6 transition-colors"
					>
						<ChevronLeft className="h-4 w-4 mr-1" /> Back to home
					</button>
					<div className="bg-gradient-to-r from-primary/20 to-transparent p-6 md:p-8 rounded-xl border border-primary/20 shadow-lg">
						<h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
							{department.department}
						</h1>
						<p className="text-xl text-gray-300 flex items-center">
							<Users className="h-5 w-5 mr-2 text-primary/70" />
							<span>Select a division to view team members</span>
						</p>
					</div>
				</div>

				{/* Division Tabs */}
				{sortedDivisions.length > 0 ? (
					<Tabs
						value={activeTab || undefined}
						onValueChange={(value) => setActiveTab(value)}
						className="w-full"
					>
						<div className="bg-gray-800/50 p-2 rounded-xl mb-8 border border-gray-700/50 overflow-x-auto">
							<TabsList className="bg-gray-800/80 p-1 grid grid-flow-col auto-cols-max gap-1 w-max min-w-full">
								{sortedDivisions.map((division) => {
									const hasMembers =
										division.members && division.members.length > 0;
									return (
										<TabsTrigger
											key={division.id}
											value={division.id}
											className={`
												px-4 py-2 rounded-lg data-[state=active]:bg-primary text-white
												data-[state=active]:text-white transition-all 
												${hasMembers ? "" : "opacity-70"}
											`}
										>
											<div className="flex items-center whitespace-nowrap">
												{division.division}
												{hasMembers && (
													<span className="ml-2 bg-primary/20 text-xs font-medium px-2 py-0.5 rounded-full">
														{division.members.length}
													</span>
												)}
											</div>
										</TabsTrigger>
									);
								})}
							</TabsList>
						</div>

						{sortedDivisions.map((division) => (
							<TabsContent
								key={division.id}
								value={division.id}
								className="focus-visible:outline-none focus-visible:ring-0"
							>
								<div className="bg-gray-800/30 rounded-2xl p-6 md:p-8 border border-gray-700/50 shadow-lg">
									<h2 className="text-2xl font-bold mb-8 flex items-center">
										<span className="bg-primary/20 p-2 rounded-lg mr-3">
											<Users className="h-5 w-5 text-primary" />
										</span>
										{division.division}
									</h2>

									{division.members && division.members.length > 0 ? (
										<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
											{division.members.map((member) => (
												<div
													key={member.id}
													className="bg-gray-800/70 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-primary/30 transition-all hover:translate-y-[-4px] group"
												>
													<div className="relative">
														<div className="aspect-[4/3] relative bg-gray-700 overflow-hidden">
															{member.photo ? (
																<Image
																	src={member.photo}
																	alt={member.name}
																	fill
																	className="object-cover group-hover:scale-105 transition-transform duration-500"
																/>
															) : (
																<div className="h-full w-full flex items-center justify-center">
																	<User className="h-20 w-20 text-gray-600" />
																</div>
															)}
														</div>
														<div className="absolute top-4 right-4">
															<span
																className={`
																px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
																${member.role === "LEAD" ? "bg-primary/80" : "bg-gray-700/80"} 
																shadow-lg backdrop-blur-sm
															`}
															>
																{member.role}
															</span>
														</div>
													</div>
													<div className="p-6">
														<h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
															{member.name}
														</h3>
														<div className="flex items-center text-gray-400 mb-4">
															<Award className="h-4 w-4 mr-2 text-primary/70" />
															<span>{member.position}</span>
														</div>
													</div>
												</div>
											))}
										</div>
									) : (
										<div className="bg-gray-800/50 rounded-xl p-12 text-center border border-gray-700/50">
											<Users className="h-12 w-12 mx-auto text-gray-600 mb-4" />
											<p className="text-xl text-gray-400">
												No members in this division yet
											</p>
										</div>
									)}
								</div>
							</TabsContent>
						))}
					</Tabs>
				) : (
					<div className="bg-gray-800/50 rounded-xl p-16 text-center border border-gray-700">
						<Users className="h-16 w-16 mx-auto text-gray-600 mb-4" />
						<p className="text-xl text-gray-400">
							No divisions found in this department
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
