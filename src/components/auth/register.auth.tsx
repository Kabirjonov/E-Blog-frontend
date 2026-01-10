import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { z } from "zod";
import { authSchemaRegister } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "../forms/TextField";
import { PasswordField } from "../forms/PasswordField";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuth";
import { AuthEnum } from "@/types/auth.type";
import { FileField } from "../forms/FileField";
import { useAuthRegister } from "@/hooks/useAuthRegisterAndLogin";
import FillLoading from "../shared/fillLoading";

export default function RegisterAuth() {
	const { setAuth } = useAuthStore();
	const { mutate, isPending } = useAuthRegister();
	const form = useForm<z.infer<typeof authSchemaRegister>>({
		resolver: zodResolver(authSchemaRegister),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof authSchemaRegister>) {
		mutate(values);
	}
	return (
		<>
			{isPending && <FillLoading />}
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
						disabled={isPending}
					/>
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
					<FileField
						control={form.control}
						name={"picture"}
						label='Avatar'
						accept='image/*'
						disabled={isPending}
					/>
					<div className='w-full flex justify-end'>
						<Button
							size='lg'
							disabled={isPending}
							variant='secondary'
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
