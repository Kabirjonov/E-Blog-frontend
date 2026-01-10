import { getItem } from "@/lib/manage-localstory";
import axios from "axios";

export const API_URL = "http://localhost:8000";

const $api = axios.create({
	withCredentials: true,
	baseURL: `${API_URL}/api`,
});

$api.interceptors.request.use(config => {
	config.headers.authorization = `Bearer ${getItem("x-token")}`;
	return config;
});

export default $api;
