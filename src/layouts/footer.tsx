import { Mail, User } from "lucide-react";

export default function Footer() {
	return (
		<footer className='border-t bg-background mt-20'>
			<div className='container mx-auto py-10'>
				<div className='mb-8 pb-6 '>
					<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
						<div className='space-y-2'>
							<div className='flex items-center gap-2'>
								<img src='/vite.svg' alt='logo' className='w-8 h-8' />
								<h2 className='text-2xl font-bold text-foreground'>E-Blog</h2>
							</div>
							<p className='text-sm text-muted-foreground max-w-md'>
								Share your thoughts, ideas and stories with the world.
							</p>
						</div>
						<div className='text-sm text-muted-foreground flex gap-5'>
							<a
								href='https://kabirjonov-oxunjon.onrender.com'
								className='hover:text-foreground transition-colors flex gap-2'
							>
								<User className='w-4 h-4' />
								Auther WebSite
							</a>
							<a
								href='mailto:contact@eblog.com'
								className='hover:text-foreground transition-colors flex gap-2'
							>
								<Mail className='w-4 h-4' />
								info.kabirjonov@gmail.com
							</a>
						</div>
					</div>
				</div>

				<div className='pt-6 border-t'>
					<div className='flex flex-col md:flex-row justify-center items-center '>
						<p className='text-sm text-muted-foreground text-center md:text-left'>
							© {new Date().getFullYear()} E-Blog. All rights reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
