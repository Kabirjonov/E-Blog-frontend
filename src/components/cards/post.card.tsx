import type { IPost } from "@/types/article.type";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { API_URL } from "@/http";
import { Link } from "react-router-dom";

interface IProps {
	post: IPost;
}
export default function PostCard({ post }: IProps) {
	return (
		<Card>
			<img
				src={`${API_URL}/${post.picture[0]}`}
				alt={post.title}
				className='rounded-t-md h-70'
			/>

			<CardContent>
				<CardTitle className='line-clamp-1 text-lg'>{post.title}</CardTitle>

				<CardDescription className='line-clamp-2 mt-1 text-muted-foreground text-sm'>
					{post.description}
				</CardDescription>
				<CardDescription className='line-clamp-2 mt-1 text-muted-foreground text-sm'>
					{post.subtitle}
				</CardDescription>
				<CardAction className='mt-3'>
					<Link to={post._id} className='underline'>
						Show More
					</Link>
				</CardAction>
			</CardContent>

			<CardFooter className='flex justify-between'>
				<Button>Edit</Button>
				<Button variant={"destructive"}>Delete</Button>
			</CardFooter>
		</Card>
	);
}
