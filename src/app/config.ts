import { Inter } from "next/font/google";
import type { Metadata } from "next";

export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HIMTI UIN Jakarta - Official Website",
  description: "Himpunan Mahasiswa Teknik Informatika UIN Syarif Hidayatullah Jakarta",
  metadataBase: new URL("https://himti-uinjkt.org"),
};
