import { deleteItem, getItem, setItem } from "@/lib/manage-localstory";
import axios from "axios";
export const API_URL = import.meta.env.BACKAND_API;

const $axios = axios.create({
	withCredentials: true,
	baseURL: `${API_URL}/api`,
});
$axios.interceptors.request.use(config => {
	if (getItem("x-token")) {
		config.headers.authorization = `Bearer ${getItem("x-token")}`;
	}
	return config;
});

$axios.interceptors.response.use(
	response => response.data, // success
	async error => {
		const originalRequest = error.config;
		const message =
			error?.response?.data?.message || error.message || "Something went wrong";
		if (
			error.response?.status === 401 &&
			!originalRequest._isRetry &&
			error.config
		) {
			originalRequest._isRetry = true;

			try {
				const response = await axios.get(`${API_URL}/api/auth/refresh`, {
					withCredentials: true,
				});
				const newAccessToken = response.data.body.accessToken;
				console.log(response);
				setItem("x-token", newAccessToken);
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				console.log("axios refresh token ishladi");

				return $axios.request(originalRequest);
			} catch (refreshError) {
				deleteItem("x-token");
				console.log("Not authorized");
			}
		}

		return Promise.reject({ ...error, message });
	}
);

export default $axios;
