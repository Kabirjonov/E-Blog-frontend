import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { z } from "zod";
import { authSchemaLogin } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "../forms/TextField";
import { PasswordField } from "../forms/PasswordField";
import { Button } from "../ui/button";
import { AuthEnum } from "@/types/auth.type";
import { useAuthStore } from "@/store/useAuth";
import { useAuthLogin } from "@/hooks/useAuth";
import FillLoading from "../shared/fillLoading";

export default function LoginAuth() {
	const { setAuth } = useAuthStore();
	const { mutate, isPending } = useAuthLogin();
	const form = useForm<z.infer<typeof authSchemaLogin>>({
		resolver: zodResolver(authSchemaLogin),
		defaultValues: {
			email: "alex1234@gmail.com",
			password: "123456",
		},
	});
	function onSubmit(values: z.infer<typeof authSchemaLogin>) {
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
					<PasswordField
						control={form.control}
						name='password'
						label='Password'
						placeholder='Enter your Password'
						disabled={isPending}
					/>
					<div className='w-full flex justify-between'>
						<span
							className='text-sm text-blue-500 hover:underline cursor-pointer'
							onClick={() => setAuth(AuthEnum.FORGOTPASSWORD)}
						>
							Forgot-Password
						</span>
						<Button
							size='lg'
							variant='secondary'
							disabled={isPending}
							type='submit'
						>
							{isPending ? "Submiting..." : "Submit"}
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
}
