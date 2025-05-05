import Link from "next/link";
import { CircleUserRound, User, LogOut } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/services/auth/authServices";
import { useRouter } from "next/navigation";

export default function Navbar() {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await logout();
			router.push("/auth/login");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<nav className="flex py-[29px] px-[60px]">
			<div className="border-white py-7 border-t text-white w-full  justify-between flex flex-row">
				<h1 className="text-[32px] font-extrabold">HIMTI UIN Jakarta</h1>
				<div className="flex flex-row gap-[100px] pt-2 text-sm font-bold">
					<Link href="/">BPH</Link>
					<Link href="/">
						Departemen <br /> Kemahasiswaan
					</Link>
					<Link href="/">
						Departemen <br /> PSDM
					</Link>
					<Link href="/">
						Departemen <br /> Internal
					</Link>
					<Link href="/">
						Departemen <br /> Eksternal
					</Link>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger className="outline-none">
						<CircleUserRound
							width={35}
							height={10}
							className="h-[35px] cursor-pointer hover:text-teal-600 transition-colors"
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-48">
						<Link href="/user">
							<DropdownMenuItem className="cursor-pointer">
								<User className="mr-2 h-4 w-4" />
								<span>My Profile</span>
							</DropdownMenuItem>
						</Link>
						<DropdownMenuItem
							onClick={handleLogout}
							className="cursor-pointer text-red-600 focus:text-red-600"
						>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Logout</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
}
