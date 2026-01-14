import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { PostSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import type z from "zod";
import { TextField } from "./forms/TextField";
import { TextareaField } from "./forms/TextareaField";
import { FileField } from "./forms/FileField";
import { usePostCreate } from "@/stores/PostCreate.store";
import { useCreatePost } from "@/hooks/usePosts";
export function CreatePost() {
	const createPost = useCreatePost();

	const { isOpen, onClose } = usePostCreate();
	const form = useForm<z.infer<typeof PostSchema>>({
		resolver: zodResolver(PostSchema),
		defaultValues: {
			title: "",
			description: "",
			subtitle: "",
		},
	});

	function onSubmit(values: z.infer<typeof PostSchema>) {
		createPost.mutate(values, {
			onSuccess: () => {
				form.reset();
				onClose();
			},
		});
	}
	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Create a post</SheetTitle>
					<SheetDescription>Write what is in your mind.</SheetDescription>
				</SheetHeader>
				<div className='grid flex-1 auto-rows-min gap-6 px-4'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4 mt-6'
						>
							<TextField
								control={form.control}
								name='title'
								label='Title'
								placeholder='Title'
								disabled={createPost.isPending}
							/>
							<TextareaField
								control={form.control}
								name='description'
								label='Description'
								placeholder='Description'
								disabled={createPost.isPending}
							/>
							<TextField
								control={form.control}
								name='subtitle'
								label='subtitle'
								placeholder='subtitle'
								disabled={createPost.isPending}
							/>

							<FileField
								control={form.control}
								name='picture'
								label='Picture'
								accept='image/*'
								disabled={createPost.isPending}
							/>

							<Button type='submit' disabled={createPost.isPending}>
								{createPost.isPending ? "Submiting..." : "Submit"}
							</Button>
						</form>
					</Form>
				</div>
			</SheetContent>
		</Sheet>
	);
}
