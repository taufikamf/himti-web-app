"use client";

import "./globals.css";
import Navbar from "@/components/Layouts/Navbar";
import Sidebar from "@/components/Layouts/Sidebar";
import Footer from "@/components/Layouts/Footer";
import { usePathname } from "next/navigation";
import { inter } from "./config";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const isAuthPage = pathname.startsWith("/auth");

	return (
		<html lang="en">
			<body
				className={`${inter.className} antialiased flex flex-col min-h-screen`}
			>
				{!isAuthPage && (
					<>
						<Navbar />
						<div className={`flex flex-1`}>
							<Sidebar />
							<main
								className={`flex ${
									!isAuthPage ? "w-screen ml-[20vw]" : "w-full"
								}`}
							>
								{children}
							</main>
						</div>
						<Footer />
					</>
				)}

				<>
					{isAuthPage && (
						<main className="flex flex-col w-full min-h-screen">
							{children}
						</main>
					)}
				</>
			</body>
		</html>
	);
}
