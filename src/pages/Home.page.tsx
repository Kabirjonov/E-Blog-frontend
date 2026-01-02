import PostCard from "@/components/cards/post.card";
import AlertComponent from "@/components/shared/alert";
import PostCardLoading from "@/components/shared/post.loading";
import $axios from "@/http";
import { postStore } from "@/store/post.store";
import type { IPost } from "@/types/article.type";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
	const { setPosts, posts } = postStore();
	const { isLoading, error } = useQuery({
		queryKey: ["get-posts"],
		queryFn: async () => {
			const { data } = await $axios.get("/article/getAll");
			console.log(data?.body);
			setPosts(data?.body);
			return data?.body;
		},
	});

	return (
		<div className='container max-w-4xl mx-auto mt-28'>
			{error && <AlertComponent error={error} />}
			<div className='grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 '>
				{isLoading &&
					Array.from({ length: 6 }).map((_, index) => (
						<PostCardLoading key={index} />
					))}
				{posts.map((post: IPost) => (
					<PostCard key={post._id} post={post} />
				))}
			</div>
		</div>
	);
}
