import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useCreatePost } from "@/hooks/useCreatePost";
import { PostSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import type z from "zod";
import { useState } from "react";
import $axios from "@/http";
import { toast } from "sonner";
import { postStore } from "@/store/post.store";
import { TextField } from "./forms/TextField";
import { TextareaField } from "./forms/TextareaField";
import { FileField } from "./forms/FileField";
export function CreatePost() {
	const { posts, setPosts } = postStore();
	const [loading, setLoading] = useState<boolean>(false);
	const { isOpen, onClose } = useCreatePost();
	const form = useForm<z.infer<typeof PostSchema>>({
		resolver: zodResolver(PostSchema),
		defaultValues: {
			title: "",
			description: "",
			subtitle: "",
		},
	});

	function onSubmit(values: z.infer<typeof PostSchema>) {
		const formData = new FormData();
		formData.append("title", values.title);
		formData.append("subtitle", values.subtitle);
		formData.append("description", values.description);
		if (values.image) {
			formData.append("picture", values.image);
		}
		setLoading(true);
		const promise = $axios
			.post("/article/create", formData)
			.then(res => {
				console.log(res.data.body);
				const newPost = [...posts, res.data.body];
				setPosts(newPost);
				form.reset();
				onClose();
			})
			.finally(() => setLoading(false));
		toast.promise(promise, {
			loading: "Loading...",
			success: "Post created seccesfully",
			error: "Something want wrong",
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
								disabled={loading}
							/>
							<TextareaField
								control={form.control}
								name='description'
								label='Description'
								placeholder='Description'
								disabled={loading}
							/>
							<TextField
								control={form.control}
								name='subtitle'
								label='subtitle'
								placeholder='subtitle'
								disabled={loading}
							/>

							<FileField
								control={form.control}
								name='image'
								label='Picture'
								accept='image/*'
								disabled={loading}
							/>

							<Button type='submit' disabled={loading}>
								{loading ? "Submiting..." : "Submit"}
							</Button>
						</form>
					</Form>
				</div>
			</SheetContent>
		</Sheet>
	);
}
