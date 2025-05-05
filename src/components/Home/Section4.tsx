import Galeri from "@/components/Gallery/Gallery";
import imageGaleri from "@/public/assets/galeri.png";

export default function Section4() {
	return (
		<section className="flex flex-col border-white py-7 border-t w-full mb-10">
			<section className="flex flex-row justify-between">
				<h5 className="text-base font-extrabold">Galeri</h5>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="17"
					viewBox="0 0 16 17"
					fill="none"
				>
					<path
						d="M14.4317 1.77368L14.1347 12.2565L3.9373 2.70913L14.4317 1.77368ZM14.4317 1.77368L2.09868 14.8231"
						stroke="white"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</section>
			<section className="grid grid-cols-4 gap-6 mt-9">
				<Galeri imageUrl={imageGaleri.src} />
				<Galeri imageUrl={imageGaleri.src} />
				<Galeri imageUrl={imageGaleri.src} />
				<Galeri imageUrl={imageGaleri.src} />
				<Galeri imageUrl={imageGaleri.src} />
				<Galeri imageUrl={imageGaleri.src} />
				<Galeri imageUrl={imageGaleri.src} />
			</section>
		</section>
	);
}
