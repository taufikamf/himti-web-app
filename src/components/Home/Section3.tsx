"use client";

import { useEffect } from "react";
import Card from "@/components/Card/Card";
import { useApi } from "@/hooks/useApi";
import { getArticles, Article } from "@/services/blog/blogService";
import { PaginatedResponse } from "@/types/api";
import { formatDate } from "@/utils/date";
import Link from "next/link";

// Extend Article type to include is_liked
interface ExtendedArticle extends Article {
	is_liked?: boolean;
}

export default function Section3() {
	const {
		data: articlesData,
		loading,
		error,
		execute: fetchArticles,
	} = useApi<PaginatedResponse<ExtendedArticle[]>>(getArticles);

	useEffect(() => {
		fetchArticles(1, 4); // Fetch only 4 articles for homepage
	}, [fetchArticles]);

	return (
		<section className="flex flex-col border-white py-7 border-t w-full mb-10">
			<section className="flex flex-row justify-between">
				<h5 className="text-base font-extrabold">Blog</h5>
				<Link href="/blog">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="17"
						viewBox="0 0 16 17"
						fill="none"
						className="cursor-pointer"
					>
						<path
							d="M14.4317 1.77368L14.1347 12.2565L3.9373 2.70913L14.4317 1.77368ZM14.4317 1.77368L2.09868 14.8231"
							stroke="white"
							strokeWidth="3"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</Link>
			</section>
			<section className="grid grid-cols-2 gap-8 mt-9">
				{loading ? (
					// Loading skeletons
					Array.from({ length: 4 }).map((_, index) => (
						<div
							key={index}
							className="bg-white/10 rounded-lg h-[200px] animate-pulse"
						/>
					))
				) : error ? (
					<p className="text-red-500 col-span-2">Failed to load blog posts</p>
				) : (
					articlesData?.data?.map((article) => (
						<Card
							key={article.id}
							id={article.id}
							title={article.title}
							date={formatDate(article.created_at)}
							imageUrl={article?.thumbnail}
							href={`/blog/${article.id}`}
							likes={article._count.likes}
							comments={0}
							isLiked={article.is_liked}
						/>
					))
				)}
			</section>
		</section>
	);
}
