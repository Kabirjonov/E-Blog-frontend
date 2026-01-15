import $axios from "@/http";
import { setItem } from "@/lib/manage-localstory";
import type {
	authSchemaLogin,
	authSchemaRegister,
	emailSchema,
	passwordSchema,
} from "@/lib/validation";
import { authStore } from "@/stores/auth.store";
import type { IResponse$Axios } from "@/types/axiosBody.type";
import type { IUserAuth } from "@/types/user.type";
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
			const res = await $axios.post<IResponse$Axios<IUserAuth>>(
				"/auth/register",
				formData
			);
			return res.data;
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
			const res = await $axios.post<IResponse$Axios<IUserAuth>>(
				"/auth/login",
				formData
			);
			return res.data;
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
export function useForgotPassword() {
	const { mutate, isPending } = useMutation({
		mutationKey: ["auth-forgot-password"],
		mutationFn: async (values: z.infer<typeof emailSchema>) => {
			const formData = new FormData();
			formData.append("email", values.email);
			const res = await $axios.post("/auth/forgot-password", formData);
			return res.data;
		},
		onSuccess: data => {
			toast.success(data.message);
		},
		onError: error => {
			console.log(error);
			toast.error(error.message);
		},
	});
	return { mutate, isPending };
}
interface ResetPasswordPayload {
	values: z.infer<typeof passwordSchema>;
	token: string;
}

export function useResetPassword() {
	const navigate = useNavigate();
	const { mutate, isPending } = useMutation({
		mutationKey: ["auth-reset-password"],
		mutationFn: async ({ values, token }: ResetPasswordPayload) => {
			const formData = new FormData();
			formData.append("password", values.password);
			const res = await $axios.post(`/auth/reset-password/${token}`, formData);
			return res.data;
		},
		onSuccess: data => {
			toast.success(data.message);
			navigate("/auth");
		},
		onError: error => {
			console.log(error);
			toast.error(error.message);
		},
	});
	return { mutate, isPending };
}
