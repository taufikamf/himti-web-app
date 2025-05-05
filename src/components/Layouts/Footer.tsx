import Image from "next/image";
import logoHimti from "@/public/logo-himti.png";

export default function Footer() {
	return (
		<footer className="flex py-[29px] px-[60px] footer">
			<div className="border-white pt-10 border-t text-white w-full  justify-between flex flex-row">
				<div className="px-[100px] flex flex-row justify-between">
					<section className="flex flex-col w-[40%]">
						<section className="flex flex-row items-center gap-3">
							<Image
								src={logoHimti}
								alt="himti"
								width={37}
								height={10}
								className="h-[40px]"
							/>
							<h1 className="text-[32px] font-bold">HIMTI UIN Jakarta</h1>
						</section>
						<p className="text-xs font-normal mt-3 text-[#909296]">
							HIMTI UIN Syarif Hidayatullah Jakarta berfungsi sebagai
							penyelenggara kegiatan untuk kemahasiswaan, penalaran, dan
							keilmuan di bidang teknologi informasi.
						</p>
					</section>
					<section className="flex flex-row justify-between w-[50%] list">
						<section className="flex flex-col">
							<h1 className="text-2xl font-bold mb-5">About</h1>
							<p>Profile</p>
							<p>Dev Team</p>
							<p>Gallery</p>
							<p>Forums</p>
						</section>
						<section className="flex flex-col">
							<h1 className="text-2xl font-bold mb-5">Project</h1>
							<p>Bank Data</p>
							<p>Url Shortener</p>
							<p>Changelog</p>
							<p>Releases</p>
						</section>
						<section className="flex flex-col">
							<h1 className="text-2xl font-bold mb-5">Community</h1>
							<p>Join Discord</p>
							<p>Follow on Twitter</p>
							<p>Email newsletter</p>
							<p>Github discussions</p>
						</section>
					</section>
				</div>
			</div>
		</footer>
	);
}
