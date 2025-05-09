"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { getGalleryItems, Event } from "@/services/gallery/galleryService";
import Link from "next/link";
import ErrorPage from "@/components/ui/ErrorPage";
import { PaginatedResponse } from "@/types/api";
import Galeri from "@/components/Gallery/Gallery";

export default function GalleryPage() {
	const [page, setPage] = useState(1);
	const { data, loading, error, execute } =
		useApi<PaginatedResponse<Event[]>>(getGalleryItems);

	useEffect(() => {
		execute(page, 12);
	}, [execute, page]);

	if (error) {
		return (
			<ErrorPage
				title="Error Loading Gallery"
				message={error}
				buttonText="Try Again"
				onRetry={() => execute(page, 12)}
			/>
		);
	}

	return (
		<div className="container mx-auto px-[60px] py-8 w-full">
			<h1 className="text-[32px] font-extrabold mb-8">Gallery</h1>

			{loading ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{[...Array(6)].map((_, index) => (
						<div
							key={index}
							className="bg-white/10 rounded-lg aspect-[1.5] animate-pulse"
						/>
					))}
				</div>
			) : (
				<>
					{!data?.data || data.data.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-white/70">No gallery items found.</p>
						</div>
					) : (
						<div className="space-y-12">
							{data.data.map((event) => (
								<div key={event.id} className="space-y-4">
									<div className="flex items-center justify-between">
										<h2 className="text-2xl font-bold">{event.name}</h2>
										<Link
											href={`/gallery/event/${event.id}`}
											className="text-primary hover:text-primary/80 transition-colors"
										>
											View all
										</Link>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-4">
										{event.gallery &&
											event.gallery
												.slice(0, 6)
												.map((item) => (
													<Galeri
														key={item.id}
														imageUrl={item.photo_url}
														alt={event.name}
													/>
												))}
									</div>
								</div>
							))}
						</div>
					)}
				</>
			)}

			{/* Pagination */}
			{data?.meta && data.meta.totalPages > 1 && (
				<div className="flex justify-center mt-8">
					<div className="flex space-x-2">
						{Array.from({ length: data.meta.totalPages }, (_, i) => i + 1).map(
							(pageNum) => (
								<button
									key={pageNum}
									onClick={() => setPage(pageNum)}
									className={`px-4 py-2 rounded ${
										pageNum === data.meta.currentPage
											? "bg-primary text-white"
											: "bg-white/10 hover:bg-white/20"
									}`}
								>
									{pageNum}
								</button>
							)
						)}
					</div>
				</div>
			)}
		</div>
	);
}
