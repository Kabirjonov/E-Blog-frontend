import { FooterItems } from "@/constants/footerItems";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className='border-t bg-background mt-20'>
			<div className='container mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-8'>
				<div className='space-y-2'>
					<div className='flex items-center gap-2'>
						<img src='/vite.svg' alt='logo' className='w-6 h-6' />
						<h2 className='text-xl font-bold'>E-Blog</h2>
					</div>
					<p className='text-sm text-muted-foreground'>
						Share your thoughts, ideas and stories with the world.
					</p>
				</div>
				<div className='space-y-4'>
					<h3 className='text-sm font-semibold uppercase tracking-wide text-foreground'>
						Quick Links
					</h3>

					<ul className='space-y-2 text-sm'>
						{FooterItems.map(item => (
							<li key={item.hraf}>
								<Link
									to={item.hraf}
									className='
            group inline-flex items-center gap-2
            text-muted-foreground
            transition-colors duration-200
            hover:text-foreground
          '
								>
									<span
										className='
              h-1.5 w-1.5 rounded-full bg-muted-foreground
              transition-all duration-200
              group-hover:bg-foreground
            '
									/>
									<span className='group-hover:underline underline-offset-4'>
										{item.title}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className='flex md:justify-center items-center p-5'>
				<p className='text-sm text-muted-foreground'>
					© {new Date().getFullYear()} E-Blog. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
