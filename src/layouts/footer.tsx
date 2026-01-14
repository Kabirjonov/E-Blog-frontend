import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className='border-t bg-background mt-20'>
			<div className='container py-10 grid grid-cols-1 md:grid-cols-3 gap-8'>
				{/* BRAND */}
				<div className='space-y-2'>
					<div className='flex items-center gap-2'>
						<img src='/vite.svg' alt='logo' className='w-6 h-6' />
						<h2 className='text-xl font-bold'>E-Blog</h2>
					</div>
					<p className='text-sm text-muted-foreground'>
						Share your thoughts, ideas and stories with the world.
					</p>
				</div>

				{/* LINKS */}
				<div className='space-y-2'>
					<h3 className='font-semibold'>Quick Links</h3>
					<ul className='space-y-1 text-sm text-muted-foreground'>
						<li>
							<Link to='/' className='hover:underline'>
								Home
							</Link>
						</li>
						<li>
							<Link to='/posts' className='hover:underline'>
								Posts
							</Link>
						</li>
						<li>
							<Link to='/auth' className='hover:underline'>
								Login
							</Link>
						</li>
					</ul>
				</div>

				{/* COPYRIGHT */}
				<div className='flex md:justify-end items-end'>
					<p className='text-sm text-muted-foreground'>
						© {new Date().getFullYear()} E-Blog. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
