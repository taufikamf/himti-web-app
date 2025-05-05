import Structure from "@/components/Structure";

const ProfilePage = () => {
	return (
		<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="flex flex-col gap-4">
				<h1 className="text-4xl text-center font-bold">
					Apa itu HIMTI UIN Jakarta?
				</h1>
				<p className="text-lg mt-4 font-light">
					<span className="text-xl font-bold">
						HIMTI UIN Syarif Hidayatullah Jakarta
					</span>{" "}
					merupakan wadah silaturahmi dan pemersatu antar Mahasiswa dengan
					Alumni Program Studi Teknik Informatika UIN Syarif Hidayatullah
					Jakarta, serta berfungsi sebagai penyelenggara kegiatan untuk
					kemahasiswaan, penalaran, dan keilmuan di bidang teknologi informasi.
				</p>
			</div>
			<div className="flex flex-row gap-8 mt-8">
				<div className="flex-1">
					<h2 className="text-2xl font-bold mb-4">Visi</h2>
					<p className="text-lg">
						Menjadikan HIMTI UIN Syarif Hidayatullah Jakarta sebagai wadah
						pengembangan potensi diri dan penyambung aspirasi mahasisa program
						studi Teknik Informatika UIN Syarif Hidayatullah Jakarta yang
						berlandaskan kekeluargaan
					</p>
				</div>
				<div className="flex-1">
					<h2 className="text-2xl font-bold mb-4">Misi</h2>
					<ol className="list-decimal list-inside space-y-2">
						<li className="text-lg">
							Memberdayakan HIMTI sebagai sarana pengembangan diri minat dan
							bakatmaupun keilmuwan mahasiswa program studi Teknik Informatika
							UIN syarif hidayatullah Jakarta.
						</li>
						<li className="text-lg">
							Mengoptimalkan peran HIMTI sebagai penyambung aspirasi mahasiswa
							program studi Teknik Informatika UIN Syarif Hidayatullah Jakarta.
						</li>
						<li className="text-lg">
							Mempererat hubungan baik pengurus dan non-pengurus HIMTI UIN
							Syarif Hidayatullah Jakarta serta civitas akademika UIN Syarif
							Hidayatullah Jakarta.
						</li>
					</ol>
				</div>
			</div>
			<hr className="my-16 border-2" />
			<h1 className="text-4xl mb-10 text-center font-bold">Mars HIMTI</h1>
			<div className="flex flex-row gap-10 mt-8">
				<div className="flex-1 flex items-center">
					<div className="aspect-video w-full">
						<iframe
							className="w-full h-full"
							src="https://www.youtube.com/embed/dQw4w9WgXcQ"
							title="HIMTI Video"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
				</div>
				<div className="flex-1">
					<h2 className="text-2xl font-bold mb-4">Lirik Mars HIMTI</h2>
					<p className="text-lg whitespace-pre-line">
						{`Bangkitlah bersama HIMTI
Bersama membangun negri
Terbentuknya jiwa madani
Terciptanya reformasi

Kami teknik informatika
Satukan langkah tingkatkan kinerja
Dengan tekad mengemban asa
Untuk negri tercinta 

Membentuk dalam satu jiwa
Bersatu dalam satu nyawa
Kobarkan semangat dalam jiwa
Membangun Indonesia digital

Janganlah ragu untuk berkarya
Menjunjung tinggi informatika

Menjunjung tinggi informatika`}
					</p>
				</div>
			</div>
			<hr className="my-16 border-2" />
			<h1 className="text-4xl mb-10 text-center font-bold">
				Struktur Kepengurusan
			</h1>
			<div className="relative pt-8">
				<Structure />
			</div>
		</section>
	);
};

export default ProfilePage;
