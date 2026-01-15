import api from "@/http/api";
import { getItem, setItem } from "@/lib/manage-localstory";
import { authStore } from "@/stores/auth.store";
import type { IResponse$Axios } from "@/types/axiosBody.type";
import type { IUserAuth } from "@/types/user.type";
import { useEffect } from "react";

export const useCheckAuth = () => {
	const { setIsAuth, setIsLoading, setUser } = authStore();
	useEffect(() => {
		const checkAuth = async () => {
			setIsLoading(true);
			try {
				const res = await api.get<IResponse$Axios<IUserAuth>>("/auth/refresh");
				setItem("x-token", res.data.body.accessToken);
				setIsAuth(true);
				console.log(res.data);
				setUser(res.data.body.user);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		if (getItem("x-token")) checkAuth();
	}, []);
};
