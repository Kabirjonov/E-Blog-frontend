import { PostSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { Form } from "../ui/form";
import { TextField } from "../forms/TextField";
import { TextareaField } from "../forms/TextareaField";
import { FileField } from "../forms/FileField";
import { Button } from "../ui/button";
import type { IPost } from "@/types/article.type";
import { useEditPost } from "@/hooks/usePosts";
import FillLoading from "../shared/fillLoading";

interface Props {
	post: IPost;
	setisOpen: (open: boolean) => void;
}
export function EditPopers({ post, setisOpen }: Props) {
	const editPost = useEditPost(post);
	const form = useForm<z.infer<typeof PostSchema>>({
		resolver: zodResolver(PostSchema),
		defaultValues: {
			title: post.title,
			description: post.description,
			subtitle: post.subtitle,
		},
	});
	function onSubmit(values: z.infer<typeof PostSchema>) {
		editPost.mutate(values, {
			onSuccess: () => {
				form.reset(values);
				setisOpen(false);
			},
		});
	}

	return (
		<div className='grid flex-1 auto-rows-min gap-6 px-4 relative'>
			{editPost.isPending && <FillLoading />}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-6'>
					<TextField
						control={form.control}
						name='title'
						label='Title'
						placeholder='Title'
						disabled={editPost.isPending}
					/>
					<TextareaField
						control={form.control}
						name='description'
						label='Description'
						placeholder='Description'
						disabled={editPost.isPending}
					/>
					<TextField
						control={form.control}
						name='subtitle'
						label='subtitle'
						placeholder='subtitle'
						disabled={editPost.isPending}
					/>

					<FileField
						control={form.control}
						name='picture'
						label='Picture'
						accept='image/*'
						disabled={editPost.isPending}
					/>

					<Button type='submit' disabled={editPost.isPending}>
						{editPost.isPending ? "Updating..." : "Update"}
					</Button>
				</form>
			</Form>
		</div>
	);
}
