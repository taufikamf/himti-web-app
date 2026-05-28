import { Volume2 } from "lucide-react";
import logoHimti from "@/public/logo-himti.png";
import Image from "next/image";

export default function Section1() {
	return (
		<div className="flex flex-col w-full border-t border-[#1D1D1D] pt-10 md:pt-[100px]">
			<section className="flex flex-col md:flex-row w-full justify-center md:justify-around items-center gap-3 md:gap-[100px] xl:mb-[100px]">
				<section className="tagline flex flex-col">
					<section className="flex flex-row items-center">
						<p className="text-5xl md:text-7xl lg:text-8xl font-bold">
							Satu Jiwa
						</p>
						<Volume2 className="w-6 h-6 md:w-10 md:h-10 ml-2 text-[#99CF9A]" />
					</section>
					<section className="flex flex-row">
						<p className="text-5xl md:text-7xl lg:text-8xl font-bold">
							Satu Nyawa
						</p>
					</section>
					<section className="flex flex-row text-[#99CF9A]">
						<p className="text-5xl md:text-7xl lg:text-8xl font-bold">
							Informatika!
						</p>
					</section>
				</section>
				<Image
					src={logoHimti}
					alt="section1"
					width={300}
					height={100}
					className="w-[150px] md:w-[200px] lg:w-[300px] mb-4 md:mb-0 h-auto mt-0 mx-auto"
				/>
			</section>
		</div>
	);
}
