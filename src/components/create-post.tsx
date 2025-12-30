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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import type z from "zod";
import { Textarea } from "./ui/textarea";
export function CreatePost() {
	const { isOpen, onClose } = useCreatePost();
	const form = useForm<z.infer<typeof PostSchema>>({
		resolver: zodResolver(PostSchema),
		defaultValues: {
			title: "",
			body: "",
		},
	});

	function onSubmit(values: z.infer<typeof PostSchema>) {
		console.log(values);
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
											/>
										</FormControl>
										<FormDescription>
											This is your public display name.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='body'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Body</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Body'
												className='bg-secondary'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type='submit'>Submit</Button>
						</form>
					</Form>
				</div>
			</SheetContent>
		</Sheet>
	);
}
