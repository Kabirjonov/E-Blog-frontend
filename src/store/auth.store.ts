import { AuthEnum, type TAuthType } from "@/types/auth.type";
import { create } from "zustand";

type AuthStoreType = {
	authState: TAuthType;
	setAuth: (state: TAuthType) => void;
};

export const authStore = create<AuthStoreType>(set => ({
	authState: AuthEnum.LOGIN,
	setAuth: state => set({ authState: state }),
}));
