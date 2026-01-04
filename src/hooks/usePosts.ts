import $axios from "@/http";
import { postStore } from "@/store/posts.store";
import { useQuery } from "@tanstack/react-query";
const { setPosts } = postStore();

export function useGetPosts() {
	const { isLoading, error } = useQuery({
		queryKey: ["get-posts"],
		queryFn: async () => {
			const { data } = await $axios.get("/article/getAll");
			setPosts(data?.body);
			return data?.body;
		},
	});
	return { isLoading, error };
}
