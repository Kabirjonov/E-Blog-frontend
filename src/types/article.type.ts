import type { IUser } from "./user.type";

export interface IPost {
	_id: string;
	subtitle: string;
	title: string;
	description: string;
	auther: IUser;
	picture: string[];
}
