import Section1 from "@/components/Home/Section1";
import Section2 from "@/components/Home/Section2";
import Section3 from "@/components/Home/Section3";
import Section4 from "@/components/Home/Section4";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "HIMTI UIN Jakarta - Home",
	description: "HIMTI UIN Jakarta - Official Website Homepage",
};

export default function Home() {
	return (
		<div className="h-min-screen w-full px-4 md:pr-[60px]">
			<Section1 />
			<Section2 />
			<Section3 />
			<Section4 />
		</div>
	);
}
