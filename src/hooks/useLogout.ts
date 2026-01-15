import api from "@/http/api";
import { deleteItem } from "@/lib/manage-localstory";
import { authStore } from "@/stores/auth.store";
import type { IResponse$Axios } from "@/types/axiosBody.type";
import type { IUser } from "@/types/user.type";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogout = () => {
	const navigate = useNavigate();
	const { setUser, setIsAuth, setIsLoading } = authStore();

	const logout = async () => {
		setIsLoading(true);
		try {
			await api.post<IResponse$Axios<IUser>>("/auth/logout");
			setIsAuth(false);
			setUser({} as IUser);
			deleteItem("x-token");

			navigate("/auth");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("Unknown error occurred");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return logout;
};
