import { create } from "zustand";

type CreatePostStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};
export const useConfirm = create<CreatePostStore>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
