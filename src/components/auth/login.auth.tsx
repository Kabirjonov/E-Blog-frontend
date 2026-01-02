import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { z } from "zod";
import { authSchemaLogin } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "../forms/TextField";
import { PasswordField } from "../forms/PasswordField";
import { Button } from "../ui/button";
import { authStore } from "@/store/auth.store";
import { AuthEnum } from "@/types/auth.type";
export default function LoginAuth() {
	const { setAuth } = authStore();
	const form = useForm<z.infer<typeof authSchemaLogin>>({
		resolver: zodResolver(authSchemaLogin),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	function onSubmit(values: z.infer<typeof authSchemaLogin>) {
		console.log(values);
	}
	return (
		<>
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
						disabled={false}
					/>
					<PasswordField
						control={form.control}
						name='password'
						label='Password'
						placeholder='Enter your Password'
						disabled={false}
					/>
					<div className='w-full flex justify-end'>
						<Button size='lg' variant='secondary'>
							Subit
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
}
