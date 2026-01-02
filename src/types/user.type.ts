export const ROLES = {
	USER: "user",
	ADMIN: "admin",
} as const;
export interface IUser {
	_id: string;
	username: string;
	email: string;
	picture: string[];
	role: typeof ROLES;
}
