"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import {
	getGalleryItems,
	GalleryItem,
} from "@/services/gallery/galleryService";
import { PaginatedResponse } from "@/types/api";

export default function GalleryPage() {
	const [page, setPage] = useState(1);
	const { data, loading, error, execute } =
		useApi<PaginatedResponse<GalleryItem[]>>(getGalleryItems);

	useEffect(() => {
		execute(page, 12);
	}, [execute, page]);

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
					<p className="text-gray-600">{error}</p>
					<button
						onClick={() => execute(page, 12)}
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Gallery</h1>

			{loading ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{[...Array(12)].map((_, index) => (
						<div
							key={index}
							className="bg-gray-200 rounded-lg aspect-square animate-pulse"
						/>
					))}
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{data?.data.map((item) => (
							<div
								key={item.id}
								className="bg-white rounded-lg shadow-md overflow-hidden"
							>
								<div className="aspect-square relative">
									<img
										src={item.imageUrl}
										alt={item.title}
										className="object-cover w-full h-full"
									/>
								</div>
								<div className="p-4">
									<h3 className="font-semibold text-lg mb-2">{item.title}</h3>
									<p className="text-gray-600 text-sm">{item.description}</p>
								</div>
							</div>
						))}
					</div>

					{data?.meta && (
						<div className="mt-8 flex justify-center gap-2">
							<button
								onClick={() => setPage((p) => Math.max(1, p - 1))}
								disabled={page === 1}
								className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
							>
								Previous
							</button>
							<span className="px-4 py-2">
								Page {page} of {data.meta.totalPages}
							</span>
							<button
								onClick={() => setPage((p) => p + 1)}
								disabled={page === data.meta.totalPages}
								className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
							>
								Next
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
