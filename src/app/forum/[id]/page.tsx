"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import {
	getForumById,
	likeForum,
	commentOnForum,
	Forum,
} from "@/services/forums/forumService";
import { ApiResponse } from "@/types/api";
import Image from "next/image";
import { Heart, MessageCircle, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForumDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const [comment, setComment] = useState("");
	const router = useRouter();

	const {
		data: forumData,
		loading,
		error,
		execute: fetchForum,
	} = useApi<ApiResponse<Forum>>(getForumById);

	const { execute: executeLike } = useApi(likeForum);
	const { execute: executeComment, loading: commenting } =
		useApi(commentOnForum);

	useEffect(() => {
		fetchForum(params.id);
	}, [fetchForum, params.id]);

	const handleLike = async () => {
		await executeLike(params.id);
		fetchForum(params.id); // Refresh the forum data
	};

	const handleComment = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!comment.trim()) return;

		await executeComment(params.id, comment);
		setComment("");
		fetchForum(params.id); // Refresh the forum data
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
						onClick={() => fetchForum(params.id)}
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	const forum = forumData?.data;
	if (!forum) return null;

	return (
		<div className="container mx-auto px-4 py-8">
			<button
				onClick={() => router.push("/forum")}
				className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
			>
				<ArrowLeft className="w-5 h-5 mr-2" />
				Back to Forum
			</button>

			<article className="bg-white rounded-lg shadow-md overflow-hidden">
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

				<div className="p-8">
					<h1 className="text-3xl font-bold mb-4">{forum.title}</h1>

					<div className="flex items-center space-x-4 mb-6 text-gray-600">
						<div className="flex items-center space-x-2">
							{forum.author.profile_picture && (
								<Image
									src={forum.author.profile_picture}
									alt={forum.author.name}
									width={32}
									height={32}
									className="rounded-full"
								/>
							)}
							<span>{forum.author.name}</span>
						</div>
						<div className="flex items-center space-x-1">
							<Calendar className="w-4 h-4" />
							<span>{formatDate(forum.createdAt)}</span>
						</div>
					</div>

					<div className="prose max-w-none mb-8">{forum.content}</div>

					<div className="flex items-center space-x-4 text-gray-600">
						<button
							onClick={handleLike}
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
				</div>
			</article>

			<div className="mt-8">
				<h2 className="text-2xl font-bold mb-4">Comments</h2>
				<form onSubmit={handleComment} className="mb-8">
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder="Write a comment..."
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
						rows={3}
					/>
					<button
						type="submit"
						disabled={commenting || !comment.trim()}
						className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
					>
						{commenting ? "Posting..." : "Post Comment"}
					</button>
				</form>

				<div className="space-y-6">
					{forum.comments.map((comment) => (
						<div key={comment.id} className="bg-white rounded-lg shadow-md p-6">
							<div className="flex items-center space-x-4 mb-4">
								{comment.author.profile_picture && (
									<Image
										src={comment.author.profile_picture}
										alt={comment.author.name}
										width={32}
										height={32}
										className="rounded-full"
									/>
								)}
								<div>
									<div className="font-semibold">{comment.author.name}</div>
									<div className="text-sm text-gray-500">
										{formatDate(comment.createdAt)}
									</div>
								</div>
							</div>
							<p className="text-gray-700">{comment.content}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
