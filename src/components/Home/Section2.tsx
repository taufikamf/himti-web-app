import Card from "@/components/Card/Card";

export default function Section2() {
	return (
		<section className="flex flex-col border-white py-7 border-t w-full mb-10">
			<section className="flex flex-row justify-between">
				<h5 className="text-base font-extrabold">Informasi Penting</h5>
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
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</section>
			<section className="grid grid-cols-2 gap-8 mt-9">
				<Card
					title="Open Recruitment Panitia PBAK Jurusan 2022"
					date="29 Juli 2022"
					imageUrl="https://placehold.co/600x400/green/white.png?text=Hello+World"
					href="/"
				/>
				<Card
					title="Prosedur Cicilan UKT Mahasiswa Fakultas Sains dan Teknologi"
					date="02 Agustus 2022"
					href="/"
				/>
			</section>
		</section>
	);
}
