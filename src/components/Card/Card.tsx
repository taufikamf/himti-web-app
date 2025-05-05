"use client";

import React from "react";
import Link from "next/link";

interface CardProps {
	title: string;
	date: string;
	imageUrl?: string;
	href: string;
}

const Card: React.FC<CardProps> = ({ title, date, href }) => {
	return (
		<Link href={href} passHref>
			<section
				className="flex flex-col text-black p-[50px] bg-white h-[450px] justify-between cursor-pointer"
				role="button"
				tabIndex={0}
				aria-label={`Card: ${title}`}
			>
				<section className="flex flex-row justify-between">
					<h1 className="text-[40px] leading-[50px] font-extrabold">{title}</h1>
					<section>
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
					</section>
				</section>
				<p className="text-3xl font-normal items-end">{date}</p>
			</section>
		</Link>
	);
};

export default Card;
