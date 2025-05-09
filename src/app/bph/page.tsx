"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface BPHMember {
	id: string;
	name: string;
	position: string;
	photo?: string;
}

export default function BPHPage() {
	const [members, setMembers] = useState<BPHMember[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// This could be replaced with a real API call to get BPH members
		// For now using placeholder data
		const fetchBPHMembers = async () => {
			setLoading(true);
			try {
				// Mock data - in production, replace with API call
				const mockMembers: BPHMember[] = [
					{
						id: "1",
						name: "John Doe",
						position: "Ketua Umum",
						photo: "https://via.placeholder.com/300",
					},
					{
						id: "2",
						name: "Jane Smith",
						position: "Wakil Ketua",
						photo: "https://via.placeholder.com/300",
					},
					{
						id: "3",
						name: "David Johnson",
						position: "Sekretaris",
						photo: "https://via.placeholder.com/300",
					},
					{
						id: "4",
						name: "Emily Brown",
						position: "Bendahara",
						photo: "https://via.placeholder.com/300",
					},
				];

				setTimeout(() => {
					setMembers(mockMembers);
					setLoading(false);
				}, 500); // Simulate network delay
			} catch (error) {
				console.error("Failed to fetch BPH members:", error);
				setLoading(false);
			}
		};

		fetchBPHMembers();
	}, []);

	if (loading) {
		return (
			<div className="w-full p-8 min-h-screen">
				<div className="animate-pulse">
					<div className="h-10 w-1/3 bg-gray-700 rounded mb-6"></div>
					<div className="h-4 w-2/3 bg-gray-700 rounded mb-8"></div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[1, 2, 3, 4].map((i) => (
							<div key={i} className="bg-gray-800 p-6 rounded-xl">
								<div className="h-5 w-1/2 bg-gray-600 rounded mb-4"></div>
								<div className="h-32 w-full bg-gray-700 rounded mb-4"></div>
								<div className="h-4 w-3/4 bg-gray-600 rounded"></div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full p-8 min-h-screen text-white">
			<h1 className="text-4xl font-bold mb-2">Badan Pengurus Harian</h1>
			<p className="text-xl text-gray-400 mb-8">Executive Board Members</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{members.map((member) => (
					<div
						key={member.id}
						className="bg-gray-800 p-6 rounded-xl transition-all hover:scale-105"
					>
						<h3 className="text-xl font-bold mb-4">{member.name}</h3>
						<div className="mb-4 aspect-square relative bg-gray-700 rounded-lg overflow-hidden">
							{member.photo && (
								<Image
									src={member.photo}
									alt={member.name}
									fill
									className="object-cover"
								/>
							)}
						</div>
						<div className="flex justify-between items-center">
							<span className="text-gray-300">{member.position}</span>
							<span className="px-3 py-1 bg-primary rounded-full text-xs font-semibold">
								BPH
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
