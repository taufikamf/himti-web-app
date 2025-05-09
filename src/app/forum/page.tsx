"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { getAllForums, Forum, likeForum } from "@/services/forums/forumService";
import Link from "next/link";
import ErrorPage from "@/components/ui/ErrorPage";
import { PaginatedResponse } from "@/types/api";
import { formatDate } from "@/utils/date";
import Card from "@/components/Card/Card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Update Forum type to include is_liked
interface ExtendedForum extends Forum {
	is_liked?: boolean;
}

export default function ForumPage() {
	const [page, setPage] = useState(1);
	const [status, setStatus] = useState<string | undefined>(undefined);

	const {
		data: forumsData,
		loading,
		error,
		execute: fetchForums,
	} = useApi<PaginatedResponse<ExtendedForum[]>>(getAllForums);

	const { execute: executeLike } = useApi(likeForum);

	useEffect(() => {
		fetchForums(status, page);
	}, [fetchForums, status, page]);

	const handleLike = async (id: string) => {
		await executeLike(id);
		fetchForums(status, page); // Refresh the forums list
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (error) {
		return (
			<ErrorPage
				title="Error Loading Forum Posts"
				message={error}
				buttonText="Try Again"
				onRetry={() => fetchForums(status, page)}
			/>
		);
	}

	const forums = forumsData?.data || [];
	const totalPages = forumsData?.meta?.totalPages || 1;
	const currentPage = forumsData?.meta?.currentPage || 1;

	return (
		<div className="container mx-auto px-[60px] py-8 w-full">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-[32px] font-extrabold">Forum</h1>
				<div className="flex gap-4">
					<Select
						value={status || "all"}
						onValueChange={(value) =>
							setStatus(value === "all" ? undefined : value)
						}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="All Posts" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Posts</SelectItem>
							<SelectItem value="PUBLISHED">Published</SelectItem>
							<SelectItem value="DRAFT">Draft</SelectItem>
						</SelectContent>
					</Select>
					<Link
						href="/forum/create"
						className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-80 transition-colors"
					>
						Create Post
					</Link>
				</div>
			</div>

			{forums.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-white/70">No forum posts found.</p>
					<Link
						href="/forum/create"
						className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-80 transition-colors"
					>
						Create Your First Post
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{forums.map((forum) => (
						<Card
							key={forum.id}
							id={forum.id}
							title={forum.title}
							date={formatDate(forum.created_at)}
							imageUrl={forum?.thumbnail}
							href={`/forum/${forum.id}`}
							likes={forum._count.likes}
							type="forum"
							comments={forum._count.comments}
							onLike={handleLike}
							isLiked={forum.is_liked}
						/>
					))}
				</div>
			)}

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex justify-center mt-8">
					<div className="flex space-x-2">
						<button
							onClick={() => setPage(Math.max(1, page - 1))}
							className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-50"
							disabled={currentPage === 1}
						>
							Previous
						</button>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map(
							(pageNum) => (
								<button
									key={pageNum}
									onClick={() => setPage(pageNum)}
									className={`px-4 py-2 rounded ${
										pageNum === currentPage
											? "bg-primary text-white"
											: "bg-gray-800 hover:bg-gray-700 text-white"
									}`}
								>
									{pageNum}
								</button>
							)
						)}
						<button
							onClick={() => setPage(Math.min(totalPages, page + 1))}
							className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-50"
							disabled={currentPage === totalPages}
						>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
