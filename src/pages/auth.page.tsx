import LoginAuth from "@/components/auth/login.auth";
import RegisterAuth from "@/components/auth/register.auth";
import { Card } from "@/components/ui/card";
import { authStore } from "@/store/auth.store";
import { AuthEnum } from "@/types/auth.type";

export default function AuthPage() {
	const { authState } = authStore();
	return (
		<div className='w-full h-screen flex justify-center items-center'>
			<Card className='w-1/3 p-6 bg-secondary '>
				{authState === AuthEnum.LOGIN && <LoginAuth />}
				{authState === AuthEnum.REGISTER && <RegisterAuth />}
			</Card>
		</div>
	);
}
