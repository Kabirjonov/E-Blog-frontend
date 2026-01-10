export const AuthEnum = {
	LOGIN: "login",
	REGISTER: "register",
	FORGOTPASSWORD: "forgot-password",
} as const;
export type TAuthType = "login" | "register" | "forgot-password";
