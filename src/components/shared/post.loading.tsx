import { Skeleton } from "../ui/skeleton";

export default function PostCardLoading() {
	return (
		<div className='w-full border rounded-md pb-4'>
			<Skeleton className='w-full h-36' />
			<div className='mt-2 px-2'>
				<Skeleton className='w-1/2 h-8 mt-2' />
				<div className='space-y-2 mt-2'>
					<Skeleton className='h-4 w-50 ' />
					<Skeleton className='h-4 w-50' />
				</div>
				<div className='grid grid-cols-2 gap-2 mt-6'>
					<Skeleton className='w-full h-6 bg-primary' />
					<Skeleton className='w-full h-6 bg-primary' />
				</div>
			</div>
		</div>
	);
}
