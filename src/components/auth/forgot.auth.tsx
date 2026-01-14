import { Form } from "../ui/form";
import { TextField } from "../forms/TextField";
import { Button } from "../ui/button";
import type z from "zod";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/authPage.store";
import { zodResolver } from "@hookform/resolvers/zod";
import FillLoading from "../shared/fillLoading";
import { AuthEnum } from "@/types/auth.type";
import { emailSchema } from "@/lib/validation";

export default function ForgotPassword() {
	const { setAuth } = useAuthStore();
	const { mutate, isPending } = useForgotPassword();
	const form = useForm<z.infer<typeof emailSchema>>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: "alex1234@gmail.com",
		},
	});
	function onSubmit(values: z.infer<typeof emailSchema>) {
		mutate(values);
	}
	return (
		<>
			{isPending && <FillLoading />}
			<h1 className='text-2xl font-bold'>Login</h1>
			<p className='text-md text-muted-foreground'>
				Don't have an account?
				<span
					onClick={() => setAuth(AuthEnum.REGISTER)}
					className='cursor-pointer text-blue-500 hover:underline'
				>
					Sign Up
				</span>
			</p>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-6'>
					<TextField
						control={form.control}
						name='email'
						label='Email'
						placeholder='Enter your Email'
						disabled={isPending}
					/>
					<Button type='submit'>Submit</Button>
				</form>
			</Form>
		</>
	);
}
