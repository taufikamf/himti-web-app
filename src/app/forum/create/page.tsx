"use client";

import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import { createForum } from "@/services/forums/forumService";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CreateForumPage() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [thumbnail, setThumbnail] = useState<string | null>(null);
	const router = useRouter();

	const { loading, error, execute: executeCreate } = useApi(createForum);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setThumbnail(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim() || !content.trim()) return;

		try {
			const result = await executeCreate({
				title: title.trim(),
				content: content.trim(),
				thumbnail: thumbnail || undefined,
			});

			if (result) {
				toast.success("Forum post created successfully!");
				router.push("/forum");
			}
		} catch (error) {
			console.error("Error creating forum post:", error);
			toast.error("Failed to create post. Please try again.");
		}
	};

	return (
		<div className="container mx-auto px-[60px] py-8 w-full">
			<button
				onClick={() => router.push("/forum")}
				className="flex items-center text-white hover:text-primary mb-8 transition-colors"
			>
				<ArrowLeft className="w-5 h-5 mr-2" />
				Back to Forum
			</button>

			<div className="max-w-3xl mx-auto bg-gray-900/60 p-8 rounded-lg shadow-lg border border-gray-700">
				<h1 className="text-3xl font-bold mb-8 text-white">
					Create New Forum Post
				</h1>

				<form onSubmit={handleSubmit} className="space-y-6">
					{error && (
						<div className="bg-red-900/80 border border-red-600 text-white px-4 py-3 rounded-md">
							{error}
						</div>
					)}

					<div>
						<label
							htmlFor="title"
							className="block text-sm font-medium text-white mb-2"
						>
							Title
						</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="block w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400"
							placeholder="Enter post title"
							required
						/>
					</div>

					<div>
						<label
							htmlFor="content"
							className="block text-sm font-medium text-white mb-2"
						>
							Content
						</label>
						<textarea
							id="content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							rows={8}
							className="block w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400"
							placeholder="Write your post content..."
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-white mb-2">
							Thumbnail Image (Optional)
						</label>
						<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md bg-gray-800/50 hover:bg-gray-800 transition-colors">
							<div className="space-y-1 text-center">
								{thumbnail ? (
									<div className="relative aspect-video w-full max-w-md mx-auto">
										<img
											src={thumbnail}
											alt="Thumbnail preview"
											className="rounded-md w-full h-full object-cover"
										/>
										<button
											type="button"
											onClick={() => setThumbnail(null)}
											className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
											aria-label="Remove image"
										>
											×
										</button>
									</div>
								) : (
									<>
										<Upload className="mx-auto h-12 w-12 text-gray-400" />
										<div className="flex text-sm text-gray-300 justify-center">
											<label
												htmlFor="thumbnail"
												className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
											>
												<span>Upload a file</span>
												<input
													id="thumbnail"
													name="thumbnail"
													type="file"
													className="sr-only"
													accept="image/*"
													onChange={handleImageChange}
												/>
											</label>
											<p className="pl-1">or drag and drop</p>
										</div>
										<p className="text-xs text-gray-500">
											PNG, JPG, GIF up to 10MB
										</p>
									</>
								)}
							</div>
						</div>
					</div>

					<div className="flex justify-end pt-4">
						<button
							type="button"
							onClick={() => router.push("/forum")}
							className="mr-4 px-6 py-3 border border-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={loading || !title.trim() || !content.trim()}
							className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors disabled:opacity-50 font-medium"
						>
							{loading ? "Creating..." : "Create Post"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
