import ForgotPassword from "@/components/auth/forgot.auth";
import LoginAuth from "@/components/auth/login.auth";
import RegisterAuth from "@/components/auth/register.auth";
import { Card } from "@/components/ui/card";
import { getItem } from "@/lib/manage-localstory";
import { useAuthStore } from "@/stores/authPage.store";
import { AuthEnum } from "@/types/auth.type";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
	const { authState } = useAuthStore();
	const navigate = useNavigate();
	useEffect(() => {
		if (getItem("x-token")) {
			navigate("/");
		}
	}, []);
	return (
		<div className='w-full h-screen flex justify-center items-center'>
			<Card className='w-1/3 p-6 bg-secondary '>
				{authState === AuthEnum.LOGIN && <LoginAuth />}
				{authState === AuthEnum.REGISTER && <RegisterAuth />}
				{authState === AuthEnum.FORGOTPASSWORD && <ForgotPassword />}
			</Card>
		</div>
	);
}
