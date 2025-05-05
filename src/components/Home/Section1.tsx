import { Volume2 } from "lucide-react";
import logoHimti from "@/public/logo-himti.png";
import Image from "next/image";

export default function Section1() {
	return (
		<div className="flex flex-col w-full border-t border-[#1D1D1D] pt-[100px]">
			<section className="flex flex-row w-full justify-around gap-[100px] xl:mb-[100px]">
				<section className="tagline flex flex-col">
					<section className="flex flex-row">
						<h1>Satu Jiwa</h1>
						<Volume2 className="w-10 h-10 text-[#99CF9A]" />
					</section>
					<section className="flex flex-row">
						<h1>Satu Nyawa</h1>
					</section>
					<section className="flex flex-row text-[#99CF9A]">
						<h1>Informatika!</h1>
					</section>
				</section>
				<Image src={logoHimti} alt="section1" width={300} height={100} />
			</section>
		</div>
	);
}
