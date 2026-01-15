import $axios from "@/http";
import { postStore } from "@/stores/posts.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useConfirm } from "../stores/useConfirm";
import { toast } from "sonner";
import type { PostSchema } from "@/lib/validation";
import z from "zod";
import type { IPaginatedResponse, IPost } from "@/types/article.type";
import type { IResponse$Axios } from "@/types/axiosBody.type";
import api from "@/http/api";
import { useParams } from "react-router-dom";

export function useGetPosts() {
	const { setPosts, setTotal, page, limit } = postStore();
	const { isLoading, error } = useQuery({
		queryKey: ["get-posts", page, limit],
		queryFn: async () => {
			const res = await $axios.get<
				IResponse$Axios<IPaginatedResponse<IPost[]>>
			>("/article/getAll", {
				params: {
					page,
					limit,
				},
			});
			setPosts(res.data.body.data);
			console.log(res.data.body.data);

			setTotal(res.data.body.total);
			return res.data.body;
		},
	});
	return { isLoading, error };
}
export function useGetPostById() {
	const { id } = useParams<{ id: string }>();
	return useQuery({
		queryKey: ["getPostById", id],
		enabled: !!id,
		queryFn: async () => {
			const res = await $axios.get<IResponse$Axios<IPost>>(
				`/article/getById/${id}`
			);
			console.log(res.data.body);

			return res.data.body;
		},
	});
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
			const res = await api.post<IResponse$Axios<IPost>>(
				"/article/create",
				formData
			);
			return res.data;
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
			const res = await api.put<IResponse$Axios<IPost>>(
				`/article/edit/${post._id}`,
				formData
			);

			return res.data;
		},
		onSuccess: updatedPost => {
			const newPost = updatedPost.body;
			const updatedPosts = posts.map(p =>
				p._id === newPost._id ? newPost : p
			);
			setPosts(updatedPosts);
			toast.success(updatedPost.message);
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
			const res = await api.delete<IResponse$Axios<IPost>>(
				`/article/delete/${post._id}`
			);
			return res.data;
		},
		onSuccess: data => {
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
