import type { IUser } from "@/types/user.type";
import { create } from "zustand";
interface IAuthStoreType {
	isLoading: boolean;
	isAuth: boolean;
	user: IUser;
	setUser: (user: IUser) => void;
	setIsLoading: (bool: boolean) => void;
	setIsAuth: (bool: boolean) => void;
}
export const authStore = create<IAuthStoreType>(set => ({
	isLoading: false,
	isAuth: false,
	user: {} as IUser,
	setUser: user => set({ user }),
	setIsLoading: bool => set({ isLoading: bool }),
	setIsAuth: bool => set({ isAuth: bool }),
}));
