"use client";

import "./globals.css";
import Navbar from "@/components/Layouts/Navbar";
import Sidebar from "@/components/Layouts/Sidebar";
import Footer from "@/components/Layouts/Footer";
import { usePathname } from "next/navigation";
import { inter } from "./config";
import { AuthProvider } from "@/context/AuthContext";
import { DepartmentProvider } from "@/context/DepartmentContext";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const isAuthPage = pathname.startsWith("/auth");
	const [isMobileView, setIsMobileView] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Check if we're on client side before accessing window
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobileView(window.innerWidth < 768);
		};

		// Initial check
		checkScreenSize();

		// Add event listener for window resize
		window.addEventListener("resize", checkScreenSize);

		// Cleanup
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	// Close sidebar when navigating (mobile only)
	useEffect(() => {
		if (isMobileView) {
			setIsSidebarOpen(false);
		}
	}, [pathname, isMobileView]);

	return (
		<html lang="en">
			<body
				className={`${inter.className} antialiased flex flex-col min-h-screen`}
			>
				<AuthProvider>
					<DepartmentProvider>
						{!isAuthPage && (
							<>
								<Navbar
									key="navbar"
									isMobileView={isMobileView}
									isSidebarOpen={isSidebarOpen}
									toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
								/>
								<div className={`flex flex-1`}>
									{(!isMobileView || isSidebarOpen) && (
										<Sidebar
											key="sidebar"
											isMobileView={isMobileView}
											closeSidebar={() => setIsSidebarOpen(false)}
										/>
									)}
									<main
										className={`flex flex-col ${
											!isAuthPage && !isMobileView
												? "w-screen md:ml-[20vw]"
												: "w-full"
										}`}
									>
										{children}
									</main>
								</div>
								<Footer key="footer" isMobileView={isMobileView} />
							</>
						)}

						<>
							{isAuthPage && (
								<main className="flex flex-col w-full min-h-screen">
									{children}
								</main>
							)}
						</>
						<Toaster
							position="top-right"
							toastOptions={{
								duration: 3000,
								style: {
									background: "#1f2937",
									color: "#fff",
									border: "1px solid #374151",
								},
								success: {
									iconTheme: {
										primary: "#10b981",
										secondary: "#fff",
									},
								},
								error: {
									iconTheme: {
										primary: "#ef4444",
										secondary: "#fff",
									},
								},
							}}
						/>
					</DepartmentProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
