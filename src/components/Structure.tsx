"use client";

import Link from "next/link";
import React, { useState } from "react";
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
				className="relative w-48 h-48 rounded-lg shadow-md overflow-hidden cursor-pointer group"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<Image
					src={imageSrc}
					alt={title}
					layout="fill"
					objectFit="cover"
					className="transition-opacity duration-500 ease-in-out group-hover:opacity-0"
				/>
				<div className="absolute inset-0 bg-foreground flex items-center justify-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
					<span className="text-white text-lg font-semibold">{title}</span>
				</div>
			</div>
		</Link>
	);
};

const Structure: React.FC = () => {
	return (
		<div className="flex flex-col items-center w-full max-w-4xl mx-auto relative">
			<div className="mb-[100px]">
				<Node title="BPH" href="/bph" imageSrc={bph.src} />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
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
			</svg>
		</div>
	);
};

export default Structure;
