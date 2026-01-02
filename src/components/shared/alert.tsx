import "@/components/ui/alert";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
interface Prop {
	error: any;
}
export default function AlertComponent({ error }: Prop) {
	return (
		<>
			<Alert variant='destructive'>
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					<p>{error?.name}</p>
					<ul className='list-inside list-disc text-sm'>
						<li>{error?.message}</li>
					</ul>
				</AlertDescription>
			</Alert>
		</>
	);
}
