import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";
import { useCreatePost } from "@/hooks/useCreatePost";
import { CreatePost } from "../create-post";

export default function Navbar() {
	const { onOpen } = useCreatePost();
	return (
		<>
			<div className='w-full h-24  fixed inset-0  shadow-sidebar-accent shadow-lg bg-background'>
				<div className='w-full h-full flex m-auto  justify-between items-center container'>
					<Link
						className='flex items-center justify-center gap-2 ml-2'
						to={"/"}
					>
						<img src={"/vite.svg"} alt='' />
						<p className='font-bold text-4xl'>Alex</p>
					</Link>
					<div className='flex gap-2'>
						<ModeToggle />
						<Button
							size={"lg"}
							className='rounded-full font-bold'
							variant={"outline"}
							onClick={onOpen}
						>
							Create Post
						</Button>
						<Link to={"/auth"}>
							<Button size={"lg"}>Login</Button>
						</Link>
					</div>
				</div>
			</div>
			<CreatePost />
		</>
	);
}
