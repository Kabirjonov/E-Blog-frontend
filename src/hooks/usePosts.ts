import $axios from "@/http";
import { postStore } from "@/store/posts.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useConfirm } from "../store/useConfirm";
import { toast } from "sonner";
import type { PostSchema } from "@/lib/validation";
import z from "zod";
import type { IPost } from "@/types/article.type";

export function useGetPosts() {
	const { setPosts } = postStore();
	const { isLoading, error } = useQuery({
		queryKey: ["get-posts"],
		queryFn: async () => {
			const { body } = await $axios.get("/article/getAll");
			setPosts(body);
			return body;
		},
	});
	return { isLoading, error };
}
export function useCreatePost() {
	const { posts, setPosts } = postStore();
	const mutation = useMutation({
		mutationKey: ["create-post"],
		mutationFn: async (values: z.infer<typeof PostSchema>) => {
			if (!values.picture) throw new Error("Picture is required");
			const formData = new FormData();
			formData.append("title", values.title);
			formData.append("subtitle", values.subtitle);
			formData.append("description", values.description);
			formData.append("picture", values.picture);
			const body = await $axios.post("/article/create", formData);
			return body;
		},

		onSuccess: newPost => {
			console.log(newPost);
			setPosts([...posts, newPost.body]);
			toast.success(newPost.message);
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	return mutation;
}
export function useEditPost(post: IPost) {
	const { posts, setPosts } = postStore();
	return useMutation({
		mutationKey: ["edit-post", post._id],
		mutationFn: async (values: z.infer<typeof PostSchema>) => {
			const formData = new FormData();
			formData.append("title", values.title);
			formData.append("subtitle", values.subtitle);
			formData.append("description", values.description);
			if (values.picture) formData.append("picture", values.picture);
			const response = await $axios.put(`/article/edit/${post._id}`, formData);

			return response;
		},
		onSuccess: updatedPost => {
			console.log("useEditPost onSeccess", updatedPost);
			const newPost = updatedPost.body;
			const updatedPosts = posts.map(p =>
				p._id === newPost._id ? newPost : p
			);
			setPosts(updatedPosts);
			toast.success("Post updated successfully");
		},
		onError: error => {
			toast.error(error.message);
		},
	});
}
export function useDeletePost() {
	const { post, onClose } = useConfirm();
	const { setPosts, posts } = postStore();
	const { error, mutate, isPending } = useMutation({
		mutationKey: ["delete-post"],
		mutationFn: async () => {
			const response = await $axios.delete(`/article/delete/${post._id}`);
			return response;
		},
		onSuccess: data => {
			console.log("data useDeletePost", data);
			const newData = posts.filter(c => c._id !== post._id);
			toast.success(data.message);
			setPosts(newData);
			onClose();
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	return { isPending, error, mutate };
}
