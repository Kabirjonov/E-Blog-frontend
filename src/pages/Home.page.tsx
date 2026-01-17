import PostCard from "@/components/cards/post.card";
import ConfirmModal from "@/components/modales/confirm.modale";
import { PaginationDemo } from "@/components/pagination";
import AlertComponent from "@/components/shared/alert";
import PostCardLoading from "@/components/shared/post.loading";
import { useGetPosts } from "@/hooks/usePosts";
import { postStore } from "@/stores/posts.store";
import type { IPost } from "@/types/article.type";

export default function Home() {
	const { posts } = postStore();
	const { isLoading, error } = useGetPosts();

	return (
		<>
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
			<ConfirmModal />
			<PaginationDemo />
		</>
	);
}
