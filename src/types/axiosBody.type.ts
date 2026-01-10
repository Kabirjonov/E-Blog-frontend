import type { IUser } from "./user.type";

interface IPost {
	_id: string;
	title: string;
	description: string;
	subtitle: string;
	auther: IUser;
	picture: string[];
	createdAt: Date;
	updatedAt: Date;
}
export interface IResponseBody {
	status: number;
	message: string;
	body: IUser | IPost;
}
