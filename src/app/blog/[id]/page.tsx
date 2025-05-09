"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import {
	getArticleById,
	likeArticle,
	Article,
} from "@/services/blog/blogService";
import Image from "next/image";
import { Heart, Calendar, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/date";
import ErrorPage from "@/components/ui/ErrorPage";

// Extend Article type to include is_liked
interface ExtendedArticle extends Article {
	is_liked?: boolean;
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
	const router = useRouter();

	const {
		data: article,
		loading,
		error,
		execute: fetchArticle,
	} = useApi<ExtendedArticle>(getArticleById);

	const { execute: executeLike, loading: liking } = useApi(likeArticle);

	useEffect(() => {
		fetchArticle(params.id);
	}, [fetchArticle, params.id]);

	const handleLike = async () => {
		await executeLike(params.id);
		fetchArticle(params.id); // Refresh the article data
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
				title="Error Loading Article"
				message={error}
				buttonText="Try Again"
				onRetry={() => fetchArticle(params.id)}
			/>
		);
	}

	if (!article) return null;

	// Check if the user has liked this article
	const isLiked = article.is_liked || false;

	return (
		<div className="container mx-auto px-[60px] py-8">
			<button
				onClick={() => router.push("/blog")}
				className="flex items-center text-white hover:text-primary mb-8 transition-colors"
			>
				<ArrowLeft className="w-5 h-5 mr-2" />
				Back to Blog
			</button>

			<article className="bg-gray-800 rounded-lg overflow-hidden border border-white/20">
				{article.thumbnail && (
					<div className="aspect-video relative">
						<img
							src={article.thumbnail}
							alt={article.title}
							className="w-full h-full object-cover"
						/>
					</div>
				)}

				<div className="p-8">
					<h1 className="text-3xl font-bold mb-4">{article.title}</h1>

					<div className="flex items-center space-x-4 mb-6 text-white/70">
						<div className="flex items-center space-x-2">
							{article.user.profile_picture && (
								<Image
									src={article.user.profile_picture}
									alt={article.user.name}
									width={32}
									height={32}
									className="rounded-full"
								/>
							)}
							<div className="flex items-center">
								<User className="w-4 h-4 mr-1" />
								<span>{article.user.name}</span>
							</div>
						</div>
						<div className="flex items-center space-x-1">
							<Calendar className="w-4 h-4" />
							<span>{formatDate(article.created_at)}</span>
						</div>
					</div>

					<div className="prose prose-invert max-w-none mb-8 text-white/90">
						{article.content}
					</div>

					<div className="flex items-center space-x-4 text-white/70">
						<button
							onClick={handleLike}
							disabled={liking}
							className={`flex items-center space-x-2 px-4 py-2 rounded-lg 
								${isLiked ? "bg-gray-700/50" : "bg-gray-700/30"} 
								hover:text-primary transition-colors disabled:opacity-50`}
						>
							<Heart
								className={`w-5 h-5 transition-colors ${
									liking ? "animate-pulse" : ""
								} 
									${isLiked ? "text-red-500 fill-red-500" : "group-hover:text-red-500"}`}
							/>
							<span className={isLiked ? "text-red-500 font-medium" : ""}>
								{article.likes.length}
							</span>
						</button>
					</div>
				</div>
			</article>
		</div>
	);
}
