import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { postStore } from "@/stores/posts.store";

export function PaginationDemo() {
	const { page, total, limit, setPage } = postStore();

	const totalPages = Math.ceil(total / limit);

	if (totalPages <= 1) return null;

	return (
		<Pagination className='mt-10'>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious onClick={() => page > 1 && setPage(page - 1)} />
				</PaginationItem>

				{Array.from({ length: totalPages }).map((_, i) => {
					const p = i + 1;
					return (
						<PaginationItem key={p}>
							<PaginationLink isActive={p === page} onClick={() => setPage(p)}>
								{p}
							</PaginationLink>
						</PaginationItem>
					);
				})}

				<PaginationItem>
					<PaginationNext
						onClick={() => page < totalPages && setPage(page + 1)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
