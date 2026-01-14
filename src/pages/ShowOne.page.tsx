import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { useGetPostById } from "@/hooks/usePosts";
import { API_URL } from "@/http";
import { Loader2, Mail, User } from "lucide-react";

export default function PostById() {
	const { data: post, isLoading, error } = useGetPostById();

	if (error) return <h1>{String(error)}</h1>;
	if (!post) return null;
	return (
		<div className='max-w-3xl mx-auto flex h-screen w-full   flex-col items-center justify-center'>
			{isLoading && <Loader2 />}
			<Card className='overflow-hidden shadow-lg'>
				{/* IMAGE */}
				<div className='relative'>
					<img
						src={`${API_URL}/${post.picture[0]}`}
						alt={post.title}
						className='w-full h-100 object-cover'
					/>
					<div className='absolute inset-0 bg-black/40' />
					<h1 className='absolute bottom-4 left-6 text-white text-2xl font-semibold'>
						{post.title}
					</h1>
				</div>

				<CardContent className='p-6 space-y-5'>
					<div className='flex items-center gap-6 text-sm text-muted-foreground'>
						<div className='flex items-center gap-2'>
							<User className='w-4 h-4' />
							<span>{post.auther?.username}</span>
						</div>
						<div className='flex items-center gap-2'>
							<Mail className='w-4 h-4' />
							<span>{post.auther?.email}</span>
						</div>
						<span>{new Date(post.createdAt).toLocaleDateString()}</span>
					</div>

					<CardTitle className='text-lg font-medium'>{post.subtitle}</CardTitle>

					{/* DESCRIPTION */}
					<CardDescription className='text-base leading-relaxed text-foreground'>
						{post.description}
					</CardDescription>
				</CardContent>
			</Card>
		</div>
	);
}
