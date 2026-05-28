"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import bph from "@/public/assets/structure/bph.jpg";
import psdm from "@/public/assets/structure/psdm.jpg";
import kemahasiswaan from "@/public/assets/structure/kemahasiswaan.jpg";
import eksternal from "@/public/assets/structure/eksternal.jpg";
import internal from "@/public/assets/structure/internal.jpg";

interface NodeProps {
	title: string;
	href: string;
	imageSrc: string;
}

const Node: React.FC<NodeProps> = ({ title, href, imageSrc }) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	return (
		<Link href={href}>
			<div
				className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-lg shadow-md overflow-hidden cursor-pointer group"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<Image
					src={imageSrc}
					alt={title}
					fill
					className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
				/>
				<div className="absolute inset-0 bg-foreground flex items-center justify-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
					<span className="text-white text-base md:text-lg font-semibold text-center px-2">
						{title}
					</span>
				</div>
			</div>
		</Link>
	);
};

const Structure: React.FC = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 640);
		};

		// Initial check
		checkScreenSize();

		// Add event listener for window resize
		window.addEventListener("resize", checkScreenSize);

		// Cleanup
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	return (
		<div className="flex flex-col items-center w-full max-w-4xl mx-auto relative">
			<div className="mb-12 md:mb-[100px]">
				<Node title="BPH" href="/bph" imageSrc={bph.src} />
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full">
				<Node title="PSDM" href="/psdm" imageSrc={psdm.src} />
				<Node
					title="Kemahasiswaan"
					href="/kemahasiswaan"
					imageSrc={kemahasiswaan.src}
				/>
				<Node title="Eksternal" href="/eksternal" imageSrc={eksternal.src} />
				<Node title="Internal" href="/internal" imageSrc={internal.src} />
			</div>
			<svg
				className="absolute top-0 left-0 w-full h-full pointer-events-none"
				style={{ zIndex: -1 }}
			>
				{/* For larger screens */}
				<g className="hidden sm:block">
					<line
						x1="50%"
						y1="150"
						x2="50%"
						y2="250"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="12.3%"
						y1="250"
						x2="87.5%"
						y2="250"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="12.5%"
						y1="250"
						x2="12.5%"
						y2="300"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="37.5%"
						y1="250"
						x2="37.5%"
						y2="300"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="62.5%"
						y1="250"
						x2="62.5%"
						y2="300"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="87.5%"
						y1="250"
						x2="87.5%"
						y2="300"
						stroke="white"
						strokeWidth="2"
					/>
				</g>

				{/* For mobile screens */}
				<g className="sm:hidden">
					<line
						x1="50%"
						y1="100"
						x2="50%"
						y2="150"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="25%"
						y1="150"
						x2="75%"
						y2="150"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="25%"
						y1="150"
						x2="25%"
						y2="175"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="75%"
						y1="150"
						x2="75%"
						y2="175"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="25%"
						y1="260"
						x2="25%"
						y2="285"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="75%"
						y1="260"
						x2="75%"
						y2="285"
						stroke="white"
						strokeWidth="2"
					/>
				</g>
			</svg>
		</div>
	);
};

export default Structure;
