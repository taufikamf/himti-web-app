"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface SidebarProps {
	isMobileView: boolean;
	closeSidebar: () => void;
}

export default function Sidebar({ isMobileView, closeSidebar }: SidebarProps) {
	const pathname = usePathname();
	const [active, setActive] = useState(pathname);

	useEffect(() => {
		setActive(pathname);
	}, [pathname]);

	const handleLinkClick = (route: string) => {
		setActive(route);
		if (isMobileView) {
			closeSidebar();
		}
	};

	const NavLink = ({
		href,
		children,
	}: {
		href: string;
		children: React.ReactNode;
	}) => {
		const isActive = active === href;
		return (
			<div className="flex flex-row items-center gap-3">
				{isActive && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="18"
						viewBox="0 0 24 18"
						fill="none"
					>
						<path
							d="M22.0454 9L13.2756 16L13.2756 2L22.0454 9ZM22.0454 9L1.99999 9"
							stroke="#99CF9A"
							strokeWidth="3"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
				<Link
					href={href}
					className={`text-xl md:text-2xl ${
						isActive ? "font-extrabold" : "font-semibold"
					}`}
					onClick={() => handleLinkClick(href)}
				>
					{children}
				</Link>
			</div>
		);
	};

	return (
		<aside
			className={`${
				isMobileView ? "fixed inset-0 z-50 bg-black/90" : "h-screen fixed"
			} pl-4 md:pl-[60px] pt-[60px] md:pt-[100px] flex-col`}
		>
			{isMobileView && (
				<button
					onClick={closeSidebar}
					className="absolute top-4 right-4 text-white hover:text-primary focus:outline-none"
					aria-label="Close menu"
				>
					<X size={24} />
				</button>
			)}
			<section className="flex flex-col gap-4">
				<NavLink href="/">Home</NavLink>
				<NavLink href="/profile">Profile</NavLink>
				<NavLink href="/information">Information</NavLink>
				<NavLink href="/service">Service</NavLink>
				<NavLink href="/forum">Forum</NavLink>
				<NavLink href="/blog">Blog</NavLink>
				<NavLink href="/gallery">Gallery</NavLink>
			</section>
		</aside>
	);
}
