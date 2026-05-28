import Image from "next/image";
import logoHimti from "@/public/logo-himti.png";

interface FooterProps {
	isMobileView: boolean;
}

export default function Footer({ isMobileView }: FooterProps) {
	return (
		<footer className="flex py-4 md:py-[29px] px-4 md:px-[60px] footer">
			<div className="border-white pt-4 md:pt-10 border-t text-white w-full">
				<div
					className={`${isMobileView ? "px-0" : "px-[100px]"} flex ${
						isMobileView ? "flex-col" : "flex-row"
					} justify-between`}
				>
					<section
						className={`flex flex-col ${
							isMobileView ? "w-full mb-8" : "w-[40%]"
						}`}
					>
						<section className="flex flex-row items-center gap-3">
							<Image
								src={logoHimti}
								alt="himti"
								width={isMobileView ? 30 : 37}
								height={isMobileView ? 30 : 40}
								className={`${isMobileView ? "h-[30px]" : "h-[40px]"}`}
							/>
							<h1
								className={`${
									isMobileView ? "text-xl" : "text-[32px]"
								} font-bold`}
							>
								HIMTI UIN Jakarta
							</h1>
						</section>
						<p className="text-xs font-normal mt-3 text-[#909296]">
							HIMTI UIN Syarif Hidayatullah Jakarta berfungsi sebagai
							penyelenggara kegiatan untuk kemahasiswaan, penalaran, dan
							keilmuan di bidang teknologi informasi.
						</p>
					</section>
					<section
						className={`flex ${
							isMobileView ? "flex-col gap-6" : "flex-row justify-between"
						} ${isMobileView ? "w-full" : "w-[50%]"} list`}
					>
						<section className="flex flex-col">
							<h1
								className={`${
									isMobileView ? "text-lg" : "text-2xl"
								} font-bold mb-2 md:mb-5`}
							>
								About
							</h1>
							<p className="text-sm md:text-base mb-1">Profile</p>
							<p className="text-sm md:text-base mb-1">Dev Team</p>
							<p className="text-sm md:text-base mb-1">Gallery</p>
							<p className="text-sm md:text-base mb-1">Forums</p>
						</section>
						<section className="flex flex-col">
							<h1
								className={`${
									isMobileView ? "text-lg" : "text-2xl"
								} font-bold mb-2 md:mb-5`}
							>
								Project
							</h1>
							<p className="text-sm md:text-base mb-1">Bank Data</p>
							<p className="text-sm md:text-base mb-1">Url Shortener</p>
							<p className="text-sm md:text-base mb-1">Changelog</p>
							<p className="text-sm md:text-base mb-1">Releases</p>
						</section>
						<section className="flex flex-col">
							<h1
								className={`${
									isMobileView ? "text-lg" : "text-2xl"
								} font-bold mb-2 md:mb-5`}
							>
								Community
							</h1>
							<p className="text-sm md:text-base mb-1">Join Discord</p>
							<p className="text-sm md:text-base mb-1">Follow on Twitter</p>
							<p className="text-sm md:text-base mb-1">Email newsletter</p>
							<p className="text-sm md:text-base mb-1">Github discussions</p>
						</section>
					</section>
				</div>
			</div>
		</footer>
	);
}
