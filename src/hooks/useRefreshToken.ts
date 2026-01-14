import api from "@/http/api";
import { getItem, setItem } from "@/lib/manage-localstory";
import { authStore } from "@/stores/auth.store";
import { useEffect } from "react";
import { toast } from "sonner";

export const useCheckAuth = () => {
	const { setIsAuth, setIsLoading, setUser } = authStore();
	useEffect(() => {
		const checkAuth = async () => {
			setIsLoading(true);
			try {
				const res = await api.get("/auth/refresh");
				setItem("x-token", res.data.body.accessToken);
				setIsAuth(true);
				setUser(res.data.body);
			} catch (error) {
				console.log(error);
				toast.error(error.data.message);
			} finally {
				setIsLoading(false);
			}
		};
		if (getItem("x-token")) checkAuth();
	}, []);
};
