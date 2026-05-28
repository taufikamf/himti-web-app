import { Metadata } from "next";

export const metadata: Metadata = {
	title: "HIMTI UIN Jakarta - Information",
	description: "Information about HIMTI UIN Syarif Hidayatullah Jakarta",
};

const InformationPage = () => {
	return (
		<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
			<div className="flex flex-col gap-4">
				<h1 className="text-2xl md:text-4xl font-bold">
					Kanal Informasi HIMTI UIN Jakarta
				</h1>
				<p className="text-base md:text-lg mt-2 md:mt-4 font-light">
					<span className="text-lg md:text-xl font-bold">
						HIMTI UIN Syarif Hidayatullah Jakarta
					</span>{" "}
					merupakan wadah silaturahmi dan pemersatu antar Mahasiswa dengan
					Alumni Program Studi Teknik Informatika UIN Syarif Hidayatullah
					Jakarta, serta berfungsi sebagai penyelenggara kegiatan untuk
					kemahasiswaan, penalaran, dan keilmuan di bidang teknologi informasi.
				</p>
			</div>
		</section>
	);
};

export default InformationPage;
