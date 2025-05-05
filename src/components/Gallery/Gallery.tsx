import Image from "next/image";

interface GaleriProps {
	imageUrl: string;
}

const Galeri: React.FC<GaleriProps> = ({ imageUrl }) => {
	return (
		<section className="flex flex-col text-black p-[13px] bg-white h-[300px] justify-between">
			<section className="flex w-full h-full">
				<Image src={imageUrl} width={1000} height={1000} alt="Gallery image" />
			</section>
		</section>
	);
};

export default Galeri;
