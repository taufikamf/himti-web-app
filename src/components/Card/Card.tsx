"use client";

import React, { MouseEvent, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";

interface CardProps {
	title: string;
	date: string;
	imageUrl?: string;
	href: string;
	likes?: number | string;
	comments?: number | string;
	id?: string;
	type?: "blog" | "forum";
	onLike?: (id: string) => void;
	isLiked?: boolean;
}

const Card: React.FC<CardProps> = ({
	title,
	date,
	href,
	imageUrl,
	likes = 0,
	comments = 0,
	id,
	type,
	onLike,
	isLiked = false,
}) => {
	const linkRef = useRef<HTMLAnchorElement>(null);
	const likeButtonRef = useRef<HTMLButtonElement>(null);

	// Convert likes and comments to numbers for display
	const likesCount =
		typeof likes === "string" ? parseInt(likes, 10) || 0 : likes;
	const commentsCount =
		typeof comments === "string" ? parseInt(comments, 10) || 0 : comments;

	// Capture click on the card but don't navigate if clicking the like button
	const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
		// Check if the click was on or inside the like button
		if (
			likeButtonRef.current &&
			likeButtonRef.current.contains(e.target as Node)
		) {
			// If clicking on like button, prevent card navigation
			e.preventDefault();
			return;
		}

		// Otherwise, trigger the link click for navigation
		if (linkRef.current) {
			linkRef.current.click();
		}
	};

	const handleLikeClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();

		if (id && onLike) {
			onLike(id);
		}
	};

	return (
		<div
			onClick={handleCardClick}
			className="flex flex-col text-black p-[40px] bg-white h-[400px] justify-between cursor-pointer relative overflow-hidden"
			role="button"
			tabIndex={0}
			aria-label={`Card: ${title}`}
		>
			{/* Hidden actual link for programmatic navigation */}
			<Link ref={linkRef} href={href} className="hidden" />

			{/* Background Image */}
			{imageUrl && (
				<div className="absolute inset-0 w-full h-full">
					<Image
						src={imageUrl}
						alt={title}
						fill
						style={{ objectFit: "cover", opacity: 0.3 }}
						priority
					/>
				</div>
			)}

			{/* Card Content */}
			<div className="flex flex-row justify-between relative z-10">
				<h1 className="text-[35px] leading-[50px] max-w-[80%] font-extrabold">
					{title}
				</h1>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="17"
						viewBox="0 0 16 17"
						fill="none"
					>
						<path
							d="M14.4317 2.40771L14.1347 12.8905L3.9373 3.34317L14.4317 2.40771ZM14.4317 2.40771L2.09868 15.4572"
							stroke="black"
							strokeWidth="3"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="flex justify-between items-end">
				<p className="text-xl font-normal relative z-10">{date}</p>

				<div className="flex gap-4 relative z-20">
					{onLike && id && (
						<button
							ref={likeButtonRef}
							type="button"
							onClick={handleLikeClick}
							className={`flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors group ${
								isLiked ? "bg-gray-100" : ""
							}`}
							aria-label={isLiked ? "Unlike" : "Like"}
						>
							<Heart
								className={`w-5 h-5 transition-colors ${
									isLiked
										? "text-red-500 fill-red-500"
										: "group-hover:text-red-500"
								}`}
							/>
							<span
								className={`${
									isLiked
										? "text-red-500 font-medium"
										: "group-hover:text-red-500 group-hover:font-medium"
								}`}
							>
								{likesCount}
							</span>
						</button>
					)}
					{type === "forum" && (
						<div className="flex items-center gap-1 px-2 py-1">
							<MessageCircle className="w-5 h-5" />
							<span>{commentsCount}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;
