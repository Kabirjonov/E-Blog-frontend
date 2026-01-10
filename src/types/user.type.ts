import type { ROLES } from "@/constants/roles";

export interface IUser {
	_id: string;
	username: string;
	email: string;
	picture: string[];
	role: typeof ROLES;
}
