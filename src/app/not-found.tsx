"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
	const pathname = usePathname();

	return (
		<div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center text-white p-4">
			<h1 className="text-4xl font-bold mb-4">404</h1>
			<h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
			<p className="text-gray-400 mb-8 text-center max-w-md">
				Sorry, we couldn't find the page you're looking for:{" "}
				<span className="text-red-400">{pathname}</span>
			</p>
			<Link
				href="/"
				className="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-80 transition-colors"
			>
				Return to Home
			</Link>
		</div>
	);
}
