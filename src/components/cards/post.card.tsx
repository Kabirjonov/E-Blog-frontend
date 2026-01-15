import type { IPost } from "@/types/article.type";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardTitle,
} from "../ui/card";
import { API_URL } from "@/http";
import { Link } from "react-router-dom";
import CardFooterComponent from "./cardFooter";

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
				<CardTitle className='line-clamp-2 mt-2   text-md'>
					{post.subtitle}
				</CardTitle>
				<CardAction className='mt-3'>
					<Link to={`/post/${post._id}`} className='underline'>
						Show More
					</Link>
				</CardAction>
			</CardContent>
			<CardFooterComponent post={post} />
		</Card>
	);
}
