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
					<p>{error?.message}</p>
				</AlertDescription>
			</Alert>
		</>
	);
}
