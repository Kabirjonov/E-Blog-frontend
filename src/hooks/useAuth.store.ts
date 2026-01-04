import { AuthEnum, type TAuthType } from "@/types/auth.type";
import { create } from "zustand";

type AuthStoreType = {
	authState: TAuthType;
	setAuth: (state: TAuthType) => void;
};

export const useAuthStore = create<AuthStoreType>(set => ({
	authState: AuthEnum.LOGIN,
	setAuth: state => set({ authState: state }),
}));
