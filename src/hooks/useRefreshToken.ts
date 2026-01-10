import $axios from "@/http";
import { getItem, setItem } from "@/lib/manage-localstory";
import { authStore } from "@/store/auth.store";
import { useEffect } from "react";
import { toast } from "sonner";

export const useCheckAuth = () => {
	const { setIsAuth, setIsLoading, setUser } = authStore();
	useEffect(() => {
		const checkAuth = async () => {
			setIsLoading(true);
			try {
				const { body } = await $axios.get("/auth/refresh");
				setItem("x-token", body.accessToken);
				setIsAuth(true);
				setUser(body.user);
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			} finally {
				setIsLoading(false);
			}
		};
		if (getItem("x-token")) checkAuth();
	}, []);
};
