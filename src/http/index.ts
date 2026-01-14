import axios from "axios";
export const API_URL = import.meta.env.BACKAND_API || "http://localhost:8000";
console.log("BACKAND_API", import.meta.env.BACKAND_API);

const $axios = axios.create({
	withCredentials: true,
	baseURL: `${API_URL}/api`,
});

$axios.interceptors.response.use(
	response => response, // success
	async error => {
		const message =
			error?.response?.data?.message || error.message || "Something went wrong";

		return Promise.reject({ ...error, message });
	}
);

export default $axios;
