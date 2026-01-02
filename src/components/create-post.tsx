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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import type z from "zod";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useState, type ChangeEvent } from "react";
import $axios from "@/http";
import { toast } from "sonner";
import { postStore } from "@/store/post.store";
export function CreatePost() {
	const { posts, setPosts } = postStore();
	const [picture, setPicture] = useState<File | null>(null);
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

	function onFileChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files && event.target.files[0];
		setPicture(file as File);
	}
	function onSubmit(values: z.infer<typeof PostSchema>) {
		if (!picture) return null;
		const formData = new FormData();
		formData.append("title", values.title);
		formData.append("subtitle", values.subtitle);
		formData.append("description", values.description);
		formData.append("picture", picture);
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
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input
												placeholder='Title'
												className='bg-secondary'
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>description</FormLabel>
										<FormControl>
											<Input
												placeholder='description'
												className='bg-secondary'
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='subtitle'
								render={({ field }) => (
									<FormItem>
										<FormLabel>subtitle</FormLabel>
										<FormControl>
											<Textarea
												placeholder='subtitle'
												className='bg-secondary'
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div>
								<Label htmlFor='picture'>Picture</Label>
								<Input
									id='picture'
									type='file'
									className='bg-secondary'
									onChange={onFileChange}
									disabled={loading}
								/>
							</div>
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
