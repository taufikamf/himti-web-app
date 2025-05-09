"use client";

import React, { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { getArticles, Article, likeArticle } from "@/services/blog/blogService";
import ErrorPage from "@/components/ui/ErrorPage";
import { PaginatedResponse } from "@/types/api";
import { formatDate } from "@/utils/date";
import Card from "@/components/Card/Card";

// Extend Article type to include is_liked
interface ExtendedArticle extends Article {
	is_liked?: boolean;
}

const BlogPage = () => {
	const [page, setPage] = useState(1);
	const {
		data: articlesData,
		loading,
		error,
		execute: fetchArticles,
	} = useApi<PaginatedResponse<ExtendedArticle[]>>(getArticles);

	const { execute: executeLike } = useApi(likeArticle);

	useEffect(() => {
		fetchArticles(page, 6);
	}, [fetchArticles, page]);

	const handleLike = async (id: string) => {
		await executeLike(id);
		fetchArticles(page, 6); // Refresh the articles list
	};

	if (loading && !articlesData) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (error) {
		return (
			<ErrorPage
				title="Error Loading Articles"
				message={error}
				buttonText="Try Again"
				onRetry={() => fetchArticles(page, 6)}
			/>
		);
	}

	const articles = articlesData?.data || [];
	const totalPages = articlesData?.meta?.totalPages || 1;
	const currentPage = articlesData?.meta?.currentPage || 1;

	return (
		<div className="container mx-auto px-[60px] py-8 w-full">
			<h1 className="text-[32px] font-extrabold mb-8">Blog</h1>

			{articles.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-white/70">No articles found.</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{articles.map((article) => (
							<Card
								key={article.id}
								id={article.id}
								title={article.title}
								date={formatDate(article.created_at)}
								imageUrl={article?.thumbnail}
								href={`/blog/${article.id}`}
								likes={article._count.likes}
								comments={0}
								onLike={handleLike}
								isLiked={article.is_liked}
							/>
						))}
					</div>

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
				</>
			)}
		</div>
	);
};

export default BlogPage;
