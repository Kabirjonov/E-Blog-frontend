import { PasswordField } from "@/components/forms/PasswordField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useResetPassword } from "@/hooks/useAuth";
import { passwordSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import type z from "zod";

export default function RecoveryAccount() {
	const { mutate, isPending } = useResetPassword();

	const form = useForm<z.infer<typeof passwordSchema>>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			password: "123456",
			confirmPassword: "123456",
		},
	});

	const { token } = useParams<{ token: string }>();
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) navigate("/login");
	}, [token, navigate]);

	function onSubmit(values: z.infer<typeof passwordSchema>) {
		if (!token) return;

		mutate({
			values,
			token,
		});
	}

	return (
		<div className='w-full h-screen flex justify-center items-center'>
			{isPending && <Loader2 />}
			<Card className='w-1/3 p-6 bg-secondary'>
				<CardContent>
					<h1 className='text-2xl font-bold'>Recovery Account</h1>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4 mt-6'
						>
							<PasswordField
								control={form.control}
								name='password'
								label='New password'
								placeholder='****'
								disabled={isPending}
							/>
							<PasswordField
								control={form.control}
								name='confirmPassword'
								label='Confirm password'
								placeholder='****'
								disabled={isPending}
							/>
							<div className='w-full flex justify-between'>
								<Button
									disabled={isPending}
									size='lg'
									variant='secondary'
									type='submit'
								>
									Submit
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
