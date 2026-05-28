import Link from "next/link";
import { CircleUserRound, User, LogOut, LogIn, Menu } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useDepartments } from "@/context/DepartmentContext";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface NavbarProps {
	isMobileView: boolean;
	toggleSidebar: () => void;
}

export default function Navbar({ isMobileView, toggleSidebar }: NavbarProps) {
	const router = useRouter();
	const { logout, user, loading: authLoading } = useAuth();
	const { departments, loading: departmentsLoading } = useDepartments();

	const handleLogout = async () => {
		try {
			const success = await logout();
			if (success) {
				router.push("/auth/login");
			}
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	// Ensure departments is an array before mapping
	const departmentsArray = Array.isArray(departments) ? departments : [];

	// Filter out departments with invalid slugs
	const validDepartments = departmentsArray.filter(
		(dept) => dept && typeof dept.slug === "string" && dept.slug.trim() !== ""
	);

	return (
		<nav className={`flex py-4 md:py-[29px] px-4 md:px-[60px] w-full`}>
			<div className="border-white py-4 md:py-7 border-t text-white w-full justify-between flex flex-row items-center">
				{isMobileView && (
					<button
						onClick={toggleSidebar}
						className="mr-4 focus:outline-none"
						aria-label="Toggle menu"
					>
						<Menu size={24} />
					</button>
				)}

				<h1 className="text-xl md:text-[32px] font-extrabold">
					HIMTI UIN Jakarta
				</h1>

				{!isMobileView && (
					<div className="hidden md:flex flex-row gap-4 md:gap-[80px] pt-2 text-sm font-bold">
						{departmentsLoading ? (
							<>
								<Skeleton className="h-8 w-24" />
								<Skeleton className="h-8 w-28" />
								<Skeleton className="h-8 w-20" />
								<Skeleton className="h-8 w-26" />
								<Skeleton className="h-8 w-22" />
							</>
						) : validDepartments.length > 0 ? (
							validDepartments.map((dept) => (
								<Link
									key={dept.id}
									href={`/departments/${dept.slug}`}
									className="hover:text-primary transition-colors"
								>
									{dept.department.includes(" ") ? (
										<>
											{dept.department.split(" ")[0]} <br />
											{dept.department.split(" ").slice(1).join(" ")}
										</>
									) : (
										dept.department
									)}
								</Link>
							))
						) : (
							<span className="text-gray-500">No departments available</span>
						)}
					</div>
				)}

				{authLoading ? (
					<Skeleton className="h-9 w-9 rounded-full" />
				) : user ? (
					<DropdownMenu>
						<DropdownMenuTrigger className="outline-none">
							{user.profile_picture ? (
								<div className="h-[35px] w-[35px] rounded-full overflow-hidden">
									<Image
										src={user.profile_picture}
										alt="Profile"
										width={35}
										height={35}
										className="h-full w-full object-cover cursor-pointer hover:opacity-80 transition-opacity bg-white"
									/>
								</div>
							) : (
								<CircleUserRound
									width={35}
									height={35}
									className="h-[35px] cursor-pointer hover:text-primary transition-colors"
								/>
							)}
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-48 bg-[#121212] border border-white/20 rounded-md p-1"
							sideOffset={8}
						>
							<div className="px-3 py-2 text-sm border-b border-white/10 mb-1">
								<p className="font-medium truncate text-white">{user.name}</p>
								<p className="text-xs text-white/60 truncate">{user.email}</p>
								{user.role && (
									<p className="text-xs mt-1 text-primary truncate">
										{user.role}
									</p>
								)}
							</div>
							<Link href="/user">
								<DropdownMenuItem className="cursor-pointer py-2 px-3 hover:bg-white rounded-sm focus:bg-white transition-colors text-white">
									<User className="mr-2 h-4 w-4" />
									<span>My Profile</span>
								</DropdownMenuItem>
							</Link>
							<DropdownMenuItem
								onClick={handleLogout}
								className="cursor-pointer py-2 px-3 text-red-500 hover:bg-white hover:text-red-500 rounded-sm focus:bg-white focus:text-red-500 transition-colors"
							>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Logout</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<Link
						href="/auth/login"
						className="flex items-center hover:text-primary transition-colors"
					>
						<LogIn className="mr-2 h-5 w-5" />
						<span className="font-medium">Login</span>
					</Link>
				)}
			</div>
		</nav>
	);
}
