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
import { useConfirm } from "@/store/useConfirm";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { EditPopers } from "../modales/editpoper";
import { useState } from "react";

interface IProps {
	post: IPost;
}
export default function PostCard({ post }: IProps) {
	const { onOpen, setPost } = useConfirm();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const onDelete = () => {
		onOpen();
		setPost(post);
	};
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
					<Link to={post._id} className='underline'>
						Show More
					</Link>
				</CardAction>
			</CardContent>
			<CardFooter className='flex justify-between'>
				<Popover onOpenChange={() => setIsOpen(!isOpen)}>
					<PopoverTrigger asChild>
						<Button variant='secondary'>Edit</Button>
					</PopoverTrigger>
					<PopoverContent>
						<EditPopers post={post} setisOpen={setIsOpen} />
					</PopoverContent>
				</Popover>
				<Button variant={"destructive"} onClick={onDelete}>
					Delete
				</Button>
			</CardFooter>
		</Card>
	);
}
