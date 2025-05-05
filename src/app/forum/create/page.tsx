"use client";

import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import { createForum } from "@/services/forums/forumService";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import Image from "next/image";

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

		const result = await executeCreate({
			title: title.trim(),
			content: content.trim(),
			thumbnail: thumbnail || undefined,
		});

		if (result) {
			router.push("/forum");
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<button
				onClick={() => router.push("/forum")}
				className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
			>
				<ArrowLeft className="w-5 h-5 mr-2" />
				Back to Forum
			</button>

			<div className="max-w-2xl mx-auto">
				<h1 className="text-3xl font-bold mb-8">Create New Forum Post</h1>

				<form onSubmit={handleSubmit} className="space-y-6">
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
							{error}
						</div>
					)}

					<div>
						<label
							htmlFor="title"
							className="block text-sm font-medium text-gray-700"
						>
							Title
						</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
							placeholder="Enter post title"
							required
						/>
					</div>

					<div>
						<label
							htmlFor="content"
							className="block text-sm font-medium text-gray-700"
						>
							Content
						</label>
						<textarea
							id="content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							rows={8}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
							placeholder="Write your post content..."
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Thumbnail Image (Optional)
						</label>
						<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
							<div className="space-y-1 text-center">
								{thumbnail ? (
									<div className="relative aspect-video w-full max-w-md mx-auto">
										<Image
											src={thumbnail}
											alt="Thumbnail preview"
											layout="fill"
											objectFit="cover"
											className="rounded-md"
										/>
										<button
											type="button"
											onClick={() => setThumbnail(null)}
											className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
										>
											×
										</button>
									</div>
								) : (
									<>
										<Upload className="mx-auto h-12 w-12 text-gray-400" />
										<div className="flex text-sm text-gray-600">
											<label
												htmlFor="thumbnail"
												className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
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

					<div className="flex justify-end">
						<button
							type="submit"
							disabled={loading || !title.trim() || !content.trim()}
							className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
						>
							{loading ? "Creating..." : "Create Post"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
