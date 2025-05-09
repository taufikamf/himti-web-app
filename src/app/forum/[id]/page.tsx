"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import {
	getForumById,
	likeForum,
	commentOnForum,
	Forum,
} from "@/services/forums/forumService";
import { Heart, MessageCircle, Calendar, ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatRelativeTime } from "@/utils/date";
import { toast } from "react-hot-toast";
import Image from "next/image";

// Extend Forum type to include is_liked
interface ExtendedForum extends Forum {
	is_liked?: boolean;
}

export default function ForumDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const [comment, setComment] = useState("");
	const [commentError, setCommentError] = useState<string | null>(null);
	const router = useRouter();

	const {
		data: forum,
		loading,
		error,
		execute: fetchForum,
	} = useApi<ExtendedForum>(getForumById);

	const { execute: executeLike } = useApi(likeForum);
	const { execute: executeComment, loading: commenting } =
		useApi(commentOnForum);

	useEffect(() => {
		fetchForum(params.id);
	}, [fetchForum, params.id]);

	const handleLike = async () => {
		try {
			await executeLike(params.id);
			fetchForum(params.id); // Refresh the forum data
		} catch (error) {
			console.error("Error liking forum:", error);
			toast.error("Failed to like post. Please try again.");
		}
	};

	const handleComment = async (e: React.FormEvent) => {
		e.preventDefault();
		setCommentError(null);

		if (!comment.trim()) return;

		try {
			await executeComment(params.id, comment);
			setComment("");
			toast.success("Comment posted successfully!");
			await fetchForum(params.id); // Refresh the forum data
		} catch (error) {
			console.error("Error posting comment:", error);
			setCommentError("Failed to post comment. Please try again.");
			toast.error("Failed to post comment. Please try again.");
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
				<div className="text-center bg-slate-800/80 p-8 rounded-2xl shadow-lg border border-slate-700 max-w-md">
					<h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
					<p className="text-white/70 mb-6">{error}</p>
					<button
						onClick={() => fetchForum(params.id)}
						className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-80 transition-colors shadow-lg"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	if (!forum) return null;

	// Ensure likes and comments count are numbers
	const likesCount =
		typeof forum._count?.likes === "string"
			? parseInt(forum._count.likes, 10) || 0
			: forum._count?.likes || 0;

	const commentsCount =
		typeof forum._count?.comments === "string"
			? parseInt(forum._count.comments, 10) || 0
			: forum._count?.comments || 0;

	// Check if the user has liked this forum
	const isLiked = forum.is_liked || false;

	return (
		<div className="min-h-screen text-white">
			<div className="container mx-auto px-4 sm:px-8 py-8">
				<button
					onClick={() => router.push("/forum")}
					className="flex items-center text-white hover:text-primary mb-8 transition-colors bg-slate-800/60 px-4 py-2 rounded-lg shadow-md"
				>
					<ArrowLeft className="w-5 h-5 mr-2" />
					Back to Forum
				</button>

				<article className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700 shadow-xl mb-8 hover:shadow-primary/5 transition-all">
					{forum.thumbnail && (
						<div className="aspect-video relative">
							<Image
								src={forum.thumbnail}
								alt={forum.title}
								fill
								className="w-full h-full object-cover"
							/>
						</div>
					)}

					<div className="p-8">
						<h1 className="text-3xl font-bold mb-6 text-white">
							{forum.title}
						</h1>

						<div className="flex items-center space-x-4 mb-8 text-white/80 bg-slate-700/40 p-3 rounded-lg">
							<div className="flex items-center space-x-3">
								{forum.author.profile_picture && (
									<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
										<img
											src={forum.author.profile_picture}
											alt={forum.author.name}
											className="w-full h-full object-cover"
										/>
									</div>
								)}
								<span className="font-semibold">{forum.author.name}</span>
							</div>
							<div className="flex items-center space-x-1 ml-auto">
								<Calendar className="w-4 h-4" />
								<span>{formatRelativeTime(forum.created_at)}</span>
							</div>
						</div>

						<div className="prose prose-invert max-w-none mb-8 text-white/90 whitespace-pre-line leading-relaxed bg-slate-700/20 p-6 rounded-xl border border-slate-700/50">
							{forum.content}
						</div>

						<div className="flex items-center space-x-6 text-white/80">
							<button
								onClick={handleLike}
								className={`flex items-center space-x-2 hover:text-primary transition-colors group 
									${isLiked ? "bg-slate-700/50" : "bg-slate-700/30"} 
									px-4 py-2 rounded-lg`}
							>
								<Heart
									className={`w-5 h-5 transition-colors 
										${isLiked ? "text-red-500 fill-red-500" : "group-hover:text-red-500"}`}
								/>
								<span
									className={`transition-colors font-medium
									${isLiked ? "text-red-500" : "group-hover:text-red-500"}`}
								>
									{likesCount}
								</span>
							</button>
							<div className="flex items-center space-x-2 bg-slate-700/30 px-4 py-2 rounded-lg">
								<MessageCircle className="w-5 h-5" />
								<span className="font-medium">{commentsCount}</span>
							</div>
						</div>
					</div>
				</article>

				<div className="bg-slate-800/60 rounded-2xl border border-slate-700 shadow-xl p-6 mb-8">
					<h2 className="text-2xl font-bold mb-6 flex items-center">
						<MessageCircle className="w-6 h-6 mr-2 text-primary" />
						Comments
					</h2>

					<form onSubmit={handleComment} className="mb-8">
						{commentError && (
							<div className="bg-red-900/80 border border-red-600 text-white px-4 py-3 rounded-lg mb-4">
								{commentError}
							</div>
						)}
						<div className="bg-slate-700/30 rounded-xl p-2 border border-slate-600 focus-within:border-primary/50 transition-colors">
							<textarea
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								placeholder="Share your thoughts..."
								className="w-full px-4 py-3 bg-transparent focus:outline-none text-white placeholder-gray-400 min-h-[100px]"
								rows={3}
							/>
							<div className="flex justify-end">
								<button
									type="submit"
									disabled={commenting || !comment.trim()}
									className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 font-medium flex items-center"
								>
									{commenting ? "Posting..." : "Post Comment"}
									<Send className="w-4 h-4 ml-2" />
								</button>
							</div>
						</div>
					</form>

					<div className="space-y-6">
						{forum.comments && forum.comments.length > 0 ? (
							forum.comments.map((comment) => (
								<div
									key={comment.id}
									className="bg-slate-700/30 rounded-xl border border-slate-600 hover:border-slate-500 transition-colors overflow-hidden"
								>
									<div className="flex justify-between items-center p-4 bg-slate-700/50 border-b border-slate-600">
										<div className="flex items-center space-x-3">
											{comment.user?.profile_picture && (
												<div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30">
													<img
														src={comment.user.profile_picture}
														alt={comment.user.name}
														className="w-full h-full object-cover"
													/>
												</div>
											)}
											<div className="font-semibold text-white">
												{comment.user?.name}
											</div>
										</div>
										<div className="text-sm text-white/60">
											{comment.created_at
												? formatRelativeTime(comment.created_at)
												: comment.createdAt
												? formatRelativeTime(comment.createdAt)
												: ""}
										</div>
									</div>
									<div className="p-4">
										<p className="text-white/90 leading-relaxed">
											{comment.comments}
										</p>
									</div>
								</div>
							))
						) : (
							<div className="text-center py-12 text-white/60 bg-slate-700/20 rounded-xl border border-dashed border-slate-600">
								<MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-30" />
								<p className="text-lg font-medium">No comments yet</p>
								<p className="text-sm">Be the first to share your thoughts!</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
