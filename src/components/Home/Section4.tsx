"use client";

import { useEffect } from "react";
import Galeri from "@/components/Gallery/Gallery";
import { useApi } from "@/hooks/useApi";
import { getGalleryItems, Event } from "@/services/gallery/galleryService";
import { PaginatedResponse } from "@/types/api";
import Link from "next/link";

export default function Section4() {
	const {
		data: galleryData,
		loading,
		error,
		execute: fetchGallery,
	} = useApi<PaginatedResponse<Event[]>>(getGalleryItems);

	useEffect(() => {
		fetchGallery(1, 2); // Get first page, limiting results for homepage display
	}, [fetchGallery]);

	// Combine all gallery items from all events and take the first 8
	const galleryItems =
		galleryData?.data
			?.flatMap(
				(event) =>
					event.gallery?.map((item) => ({
						...item,
						eventName: event.name,
						eventId: event.id,
					})) || []
			)
			.slice(0, 8) || [];

	return (
		<section className="flex flex-col border-white py-7 border-t w-full mb-10">
			<section className="flex flex-row justify-between">
				<h5 className="text-base font-extrabold">Galeri</h5>
				<Link href="/gallery">
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
			<section className="grid grid-cols-4 gap-6 mt-9">
				{loading ? (
					// Loading skeletons
					Array.from({ length: 8 }).map((_, index) => (
						<div
							key={index}
							className="bg-white/10 rounded-lg aspect-[1] animate-pulse"
						/>
					))
				) : error ? (
					<p className="text-red-500 col-span-4">
						Failed to load gallery items
					</p>
				) : galleryItems.length === 0 ? (
					<p className="text-white/70 col-span-4">No gallery items found.</p>
				) : (
					galleryItems.map((item) => (
						<Link href={`/gallery/event/${item.eventId}`} key={item.id}>
							<Galeri imageUrl={item.photo_url} alt={item.eventName} />
						</Link>
					))
				)}
			</section>
		</section>
	);
}
