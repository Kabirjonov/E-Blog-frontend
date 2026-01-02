import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { z } from "zod";
import { authSchemaRegister } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "../forms/TextField";
import { PasswordField } from "../forms/PasswordField";
import { Button } from "../ui/button";
import { authStore } from "@/store/auth.store";
import { AuthEnum } from "@/types/auth.type";
import { FileField } from "../forms/FileField";

export default function RegisterAuth() {
	const { setAuth } = authStore();
	const form = useForm<z.infer<typeof authSchemaRegister>>({
		resolver: zodResolver(authSchemaRegister),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof authSchemaRegister>) {
		console.log(values);
		const formData = new FormData();
		formData.append("username", values.username);
		formData.append("email", values.email);
		formData.append("password", values.password);
		if (values.image) {
			formData.append("picture", values.image);
		}
	}
	return (
		<>
			<h1 className='text-2xl font-bold'>Register</h1>
			<p className='text-md text-muted-foreground'>
				Do you already have account?
				<span
					onClick={() => setAuth(AuthEnum.LOGIN)}
					className='cursor-pointer text-blue-500 hover:underline'
				>
					Sign In
				</span>
			</p>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-6'>
					<TextField
						control={form.control}
						name='username'
						label='UserName'
						placeholder='Enter your UserName'
						disabled={false}
					/>
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
					<FileField
						control={form.control}
						name='picture'
						label='Avatar'
						accept='image/*'
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
