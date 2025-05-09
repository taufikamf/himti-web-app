import Image from "next/image";

interface GaleriProps {
	imageUrl: string;
	alt?: string;
}

const Galeri: React.FC<GaleriProps> = ({ imageUrl, alt }) => {
	return (
		<section className="flex flex-col text-black p-[13px] bg-white w-[300px] h-[300px] justify-between">
			<section className="flex w-full h-full">
				<Image
					src={imageUrl}
					width={1000}
					height={1000}
					alt={alt || "Gallery Image"}
				/>
			</section>
		</section>
	);
};

export default Galeri;
