import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useConfirm } from "@/stores/useConfirm";
import { useDeletePost } from "@/hooks/usePosts";
import AlertComponent from "../shared/alert";
import FillLoading from "../shared/fillLoading";
export default function ConfirmModal() {
	const { isOpen, onClose } = useConfirm();
	const { error, mutate, isPending } = useDeletePost();

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				{error && <AlertComponent error={error} />}
				{isPending && <FillLoading />}
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button onClick={onClose}>Cancel</Button>

					<Button
						variant={"destructive"}
						onClick={() => mutate()}
						disabled={isPending}
					>
						{isPending ? "Deleting..." : "Continue"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
