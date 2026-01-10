import type { IPost } from "@/types/article.type";
import { create } from "zustand";

type CreatePostStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	setPost: (post: IPost) => void;
	post: IPost;
};
export const useConfirm = create<CreatePostStore>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
	post: {} as IPost,
	setPost: post => set({ post }),
}));
