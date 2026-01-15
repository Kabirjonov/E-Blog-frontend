import { useConfirm } from "@/stores/useConfirm";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { EditPopers } from "../modales/editpoper";
import { useState } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import type { IPost } from "@/types/article.type";
import { authStore } from "@/stores/auth.store";
import { isPostOwner } from "@/helpers/permissions";

interface Props {
	post: IPost;
}
export default function CardFooterComponent({ post }: Props) {
	const { onOpen, setPost } = useConfirm();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { user, isAuth } = authStore();

	const canEdit = isAuth && isPostOwner(post, user);
	const onDelete = () => {
		onOpen();
		setPost(post);
	};
	return (
		<>
			{canEdit && (
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
			)}
		</>
	);
}
