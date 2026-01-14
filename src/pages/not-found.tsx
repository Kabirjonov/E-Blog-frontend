import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className='h-screen w-full flex  flex-col items-center justify-center'>
			<h1 className='text-gray-300 text-8xl font-bold'>404</h1>
			<p className='text-3xl font-bold tracking-tight'>Page not found</p>
			<Link to={"/"}>
				<Button className='mt-5'>Go to Home page</Button>
			</Link>
		</div>
	);
}
