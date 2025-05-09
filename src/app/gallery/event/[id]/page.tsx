"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import {
	getEventGallery,
	EventWithGallery,
} from "@/services/gallery/galleryService";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ErrorPage from "@/components/ui/ErrorPage";

export default function EventGalleryPage({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();

	const {
		data: event,
		loading,
		error,
		execute: fetchEvent,
	} = useApi<EventWithGallery>(getEventGallery);

	useEffect(() => {
		fetchEvent(params.id);
	}, [fetchEvent, params.id]);

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
				title="Error Loading Gallery"
				message={error}
				buttonText="Try Again"
				onRetry={() => fetchEvent(params.id)}
			/>
		);
	}

	if (!event) return null;

	return (
		<div className="container mx-auto px-[60px] py-8">
			<button
				onClick={() => router.push("/gallery")}
				className="flex items-center text-white hover:text-primary mb-8 transition-colors"
			>
				<ArrowLeft className="w-5 h-5 mr-2" />
				Back to Gallery
			</button>

			<h1 className="text-[32px] font-extrabold mb-8">{event.name}</h1>

			{event.gallery && event.gallery.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{event.gallery.map((item) => (
						<div
							key={item.id}
							className="bg-gray-800 border border-white/20 rounded-lg overflow-hidden hover:border-primary transition-all group"
						>
							<div className="aspect-[1] relative">
								<img
									src={item.photo_url}
									alt={`Photo from ${event.name}`}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-center py-12">
					<p className="text-white/70">No photos found for this event.</p>
				</div>
			)}
		</div>
	);
}
