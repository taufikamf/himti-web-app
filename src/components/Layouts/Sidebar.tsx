"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
	const pathname = usePathname();

	const [active, setActive] = useState(pathname);

	useEffect(() => {
		setActive(pathname);
	}, [pathname]);

	const handleLinkClick = (route: string) => {
		setActive(route);
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
					className={`text-2xl ${
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
		<aside className="h-screen fixed pl-[60px] pt-[100px] flex-col">
			<section>
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
