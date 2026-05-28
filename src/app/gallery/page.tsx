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
		<div className="container mx-auto px-4 md:px-[60px] py-6 md:py-8 w-full">
			<h1 className="text-2xl md:text-[32px] font-extrabold mb-4 md:mb-8">
				Gallery
			</h1>

			{loading ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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
						<div className="space-y-8 md:space-y-12">
							{data.data.map((event) => (
								<div key={event.id} className="space-y-3 md:space-y-4">
									<div className="flex items-center justify-between">
										<h2 className="text-xl md:text-2xl font-bold">
											{event.name}
										</h2>
										<Link
											href={`/gallery/event/${event.id}`}
											className="text-sm md:text-base text-primary hover:text-primary/80 transition-colors"
										>
											View all
										</Link>
									</div>

									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
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
				<div className="flex justify-center mt-6 md:mt-8 overflow-x-auto py-2">
					<div className="flex space-x-1 md:space-x-2">
						<button
							onClick={() => setPage(Math.max(1, page - 1))}
							className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded bg-white/10 hover:bg-white/20 disabled:opacity-50"
							disabled={data.meta.currentPage === 1}
						>
							Prev
						</button>
						{Array.from({ length: data.meta.totalPages }, (_, i) => i + 1).map(
							(pageNum) => (
								<button
									key={pageNum}
									onClick={() => setPage(pageNum)}
									className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded ${
										pageNum === data.meta.currentPage
											? "bg-primary text-white"
											: "bg-white/10 hover:bg-white/20"
									}`}
								>
									{pageNum}
								</button>
							)
						)}
						<button
							onClick={() => setPage(Math.min(data.meta.totalPages, page + 1))}
							className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded bg-white/10 hover:bg-white/20 disabled:opacity-50"
							disabled={data.meta.currentPage === data.meta.totalPages}
						>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
