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
				<AuthProvider>
					<DepartmentProvider>
						{!isAuthPage && (
							<>
								<Navbar key="navbar" />
								<div className={`flex flex-1`}>
									<Sidebar key="sidebar" />
									<main
										className={`flex ${
											!isAuthPage ? "w-screen ml-[20vw]" : "w-full"
										}`}
									>
										{children}
									</main>
								</div>
								<Footer key="footer" />
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
