import $axios from "@/http";
import { setItem } from "@/lib/manage-localstory";
import type { authSchemaLogin, authSchemaRegister } from "@/lib/validation";
import { authStore } from "@/store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type z from "zod";

export function useAuthRegister() {
	const setIsAuth = authStore().setIsAuth;
	const setUser = authStore().setUser;
	const navigate = useNavigate();

	const { isPending, mutate } = useMutation({
		mutationKey: ["auth-register"],
		mutationFn: async (values: z.infer<typeof authSchemaRegister>) => {
			const formData = new FormData();
			formData.append("email", values.email);
			formData.append("password", values.password);
			formData.append("username", values.username);
			if (values.picture) formData.append("picture", values.picture);
			const response = await $axios.post("/auth/register", formData);
			return response;
		},

		onSuccess: data => {
			const { user, accessToken } = data.body;
			toast.success(data.message);
			setIsAuth(true);
			setUser(user);
			setItem("x-token", accessToken);
			navigate("/");
		},
		onError: error => {
			console.log(error);
			toast.error(error.message);
		},
	});
	return { isPending, mutate };
}
export function useAuthLogin() {
	const navigate = useNavigate();
	const setIsAuth = authStore().setIsAuth;
	const setUser = authStore().setUser;
	const { mutate, isPending } = useMutation({
		mutationKey: ["auth-login"],
		mutationFn: async (values: z.infer<typeof authSchemaLogin>) => {
			const formData = new FormData();
			formData.append("email", values.email);
			formData.append("password", values.password);
			const register = await $axios.post("/auth/login", formData);
			return register;
		},
		onSuccess: data => {
			const { user, accessToken } = data.body;
			toast.success(data.message);
			setIsAuth(true);
			setUser(user);
			setItem("x-token", accessToken);
			navigate("/");
		},
		onError: error => {
			console.log(error);
			toast.error(error.message);
		},
	});
	return { mutate, isPending };
}
