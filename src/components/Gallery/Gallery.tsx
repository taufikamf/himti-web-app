import Image from "next/image";

interface GaleriProps {
	imageUrl: string;
	alt?: string;
}

const Galeri: React.FC<GaleriProps> = ({ imageUrl, alt }) => {
	return (
		<section className="flex flex-col text-black p-2 md:p-[13px] bg-white w-full h-auto aspect-square justify-between">
			<section className="flex w-full h-full relative">
				<Image
					src={imageUrl}
					alt={alt || "Gallery Image"}
					fill
					sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
					className="object-cover"
				/>
			</section>
		</section>
	);
};

export default Galeri;
