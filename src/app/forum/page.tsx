"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { getAllForums, Forum, likeForum } from "@/services/forums/forumService";
import { PaginatedResponse } from "@/types/api";
import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle, Calendar } from "lucide-react";

export default function ForumPage() {
	const [page, setPage] = useState(1);
	const [status, setStatus] = useState<string | undefined>(undefined);

	const {
		data: forumsData,
		loading,
		error,
		execute: fetchForums,
	} = useApi<PaginatedResponse<Forum[]>>(getAllForums);

	const { execute: executeLike } = useApi(likeForum);

	useEffect(() => {
		fetchForums(status);
	}, [fetchForums, status, page]);

	const handleLike = async (id: string) => {
		await executeLike(id);
		fetchForums(status); // Refresh the forums list
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
					<p className="text-gray-600">{error}</p>
					<button
						onClick={() => fetchForums(status)}
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	const forums = forumsData?.data || [];
	const meta = forumsData?.meta;

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Forum</h1>
				<div className="flex gap-4">
					<select
						value={status || ""}
						onChange={(e) => setStatus(e.target.value || undefined)}
						className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
					>
						<option value="">All Posts</option>
						<option value="PUBLISHED">Published</option>
						<option value="DRAFT">Draft</option>
					</select>
					<Link
						href="/forum/create"
						className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
					>
						Create Post
					</Link>
				</div>
			</div>

			{forums.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-gray-600">No forum posts found.</p>
					<Link
						href="/forum/create"
						className="inline-block mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
					>
						Create Your First Post
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{forums.map((forum) => (
						<div
							key={forum.id}
							className="bg-white rounded-lg shadow-md overflow-hidden"
						>
							{forum.thumbnail && (
								<div className="aspect-video relative">
									<Image
										src={forum.thumbnail}
										alt={forum.title}
										layout="fill"
										objectFit="cover"
									/>
								</div>
							)}
							<div className="p-6">
								<Link href={`/forum/${forum.id}`}>
									<h2 className="text-xl font-semibold mb-2 hover:text-teal-600 transition-colors">
										{forum.title}
									</h2>
								</Link>
								<p className="text-gray-600 mb-4 line-clamp-3">
									{forum.content}
								</p>
								<div className="flex items-center justify-between text-sm text-gray-500">
									<div className="flex items-center space-x-4">
										<button
											onClick={() => handleLike(forum.id)}
											className="flex items-center space-x-1 hover:text-red-500 transition-colors"
										>
											<Heart className="w-5 h-5" />
											<span>{forum.likes}</span>
										</button>
										<div className="flex items-center space-x-1">
											<MessageCircle className="w-5 h-5" />
											<span>{forum.comments.length}</span>
										</div>
									</div>
									<div className="flex items-center space-x-1">
										<Calendar className="w-4 h-4" />
										<span>{formatDate(forum.createdAt)}</span>
									</div>
								</div>
								<div className="mt-4 flex items-center space-x-2">
									{forum.author.profile_picture && (
										<Image
											src={forum.author.profile_picture}
											alt={forum.author.name}
											width={24}
											height={24}
											className="rounded-full"
										/>
									)}
									<span className="text-sm text-gray-600">
										{forum.author.name}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{meta && meta.totalPages > 1 && (
				<div className="mt-8 flex justify-center gap-2">
					<button
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						disabled={page === 1}
						className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
					>
						Previous
					</button>
					<span className="px-4 py-2">
						Page {page} of {meta.totalPages}
					</span>
					<button
						onClick={() => setPage((p) => p + 1)}
						disabled={page === meta.totalPages}
						className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
}
