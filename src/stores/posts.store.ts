import type { IPost } from "@/types/article.type";
import { create } from "zustand";
type PostStoreType = {
	posts: IPost[];
	setPosts: (posts: IPost[]) => void;
	limit: number;
	page: number;
	total: number;
	setPage: (page: number) => void;
	setTotal: (total: number) => void;
};
export const postStore = create<PostStoreType>(set => ({
	posts: [],
	setPosts: posts => set({ posts }),
	limit: 9,
	page: 1,
	total: 0,

	setPage: page => set({ page }),
	setTotal: total => set({ total }),
}));

interface IgetByIdPost {
	setByIdPost: (post: IPost) => void;
	post: IPost;
}

export const GetPostById = create<IgetByIdPost>(set => ({
	post: {} as IPost,
	setByIdPost: post => set({ post }),
}));
