import { getItem } from "@/lib/manage-localstory";
import axios from "axios";
export const API_URL = "http://localhost:8000";

const $axios = axios.create({
	withCredentials: true,
	baseURL: `${API_URL}/api`,
});

$axios.interceptors.response.use(
	response => response.data, // <-- MUHIM
	error => {
		const message =
			error?.response?.data?.message || error.message || "Something went wrong";

		return Promise.reject({
			...error,
			message,
		});
	}
);

$axios.interceptors.request.use(config => {
	if (getItem("x-token")) {
		config.headers.authorization = `Bearer ${getItem("x-token")}`;
	}
	return config;
});
export default $axios;
