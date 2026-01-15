import type { IUser } from "./user.type";

export interface IPost {
	_id: string;
	subtitle: string;
	title: string;
	description: string;
	auther: IUser;
	picture: string[];
	createdAt: Date;
	updateAt: Date;
}
export interface IPaginatedResponse<T> {
	data: T;
	page: number;
	limit: number;
	total: number;
}
