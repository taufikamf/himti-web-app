import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface InformationCardProps {
	id: string;
	title: string;
	description: string;
	imageSrc: string;
	href: string;
}

const InformationCard: React.FC<InformationCardProps> = ({
	id,
	title,
	description,
	imageSrc,
	href,
}) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	return (
		<Link href={`${href}/${id}`}>
			<div
				className="relative w-full h-64 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<Image
					src={imageSrc}
					alt={title}
					layout="fill"
					objectFit="cover"
					className={`transition-opacity duration-300 ${
						isHovered ? "opacity-100" : "opacity-50"
					}`}
				/>
				<div
					className={`absolute inset-0 p-4 flex flex-col justify-end transition-opacity duration-300 ${
						isHovered ? "opacity-0" : "opacity-100"
					}`}
				>
					<h2 className="text-white text-xl font-bold mb-2">{title}</h2>
					<p className="text-white text-sm">{description}</p>
				</div>
			</div>
		</Link>
	);
};

export default InformationCard;
