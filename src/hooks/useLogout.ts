import api from "@/http/api";
import { deleteItem } from "@/lib/manage-localstory";
import { authStore } from "@/stores/auth.store";
import type { IUser } from "@/types/user.type";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogout = () => {
	const navigate = useNavigate();
	const { setUser, setIsAuth, setIsLoading } = authStore();

	const logout = async () => {
		setIsLoading(true);
		try {
			await api.post("/auth/logout");
			setIsAuth(false);
			setUser({} as IUser);
			deleteItem("x-token");

			navigate("/auth");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return logout;
};
