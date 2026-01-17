import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/shared/mode-toggle";
import { CreatePost } from "../components/create-post";
import { usePostCreate } from "@/stores/PostCreate.store";
import { authStore } from "@/stores/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader } from "lucide-react";
import { useLogout } from "@/hooks/useLogout";

export default function Navbar() {
	const { onOpen } = usePostCreate();
	const user = authStore().user;
	const isAuth = authStore().isAuth;
	const isLoading = authStore().isLoading;
	const logout = useLogout();
	return (
		<>
			<div className='w-full h-24 z-50 fixed inset-0  shadow-sidebar-accent shadow-lg bg-background'>
				<div className='w-full h-full flex m-auto  justify-between items-center container'>
					<Link
						className='flex items-center justify-center gap-2 ml-2'
						to={"/"}
					>
						<img src={"/vite.svg"} alt='' />
						<p className='font-bold text-4xl'>E-Blog</p>
					</Link>
					<div className='flex gap-2'>
						<ModeToggle />
						{isAuth && (
							<Button
								size={"lg"}
								className='rounded-full font-bold'
								variant={"outline"}
								onClick={onOpen}
							>
								Create Post
							</Button>
						)}

						{isLoading ? (
							<Loader className='animate-spin' />
						) : isAuth ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Avatar className='cursor-pointer'>
										<AvatarImage src='https://github.com/shadcn.png' />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>{user.email}</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Link to={"/auth"}>
								<Button size={"lg"}>Login</Button>
							</Link>
						)}
						{}
					</div>
				</div>
			</div>
			<CreatePost />
		</>
	);
}
