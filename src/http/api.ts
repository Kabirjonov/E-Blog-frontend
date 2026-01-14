import axios from "axios";
import { API_URL } from ".";
import { deleteItem, getItem, setItem } from "@/lib/manage-localstory";

const api = axios.create({
	withCredentials: true,
	baseURL: `${API_URL}/api`,
});
api.interceptors.request.use(config => {
	if (getItem("x-token")) {
		config.headers.authorization = `Bearer ${getItem("x-token")}`;
	}
	return config;
});

api.interceptors.response.use(
	response => response, // success
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
				return api.request(originalRequest);
			} catch (refreshError) {
				deleteItem("x-token");
				console.log("Not authorized", refreshError);
			}
		}

		return Promise.reject({ ...error, message });
	}
);
export default api;
