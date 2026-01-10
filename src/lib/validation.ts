import { z } from "zod";

export const PostSchema = z.object({
	title: z.string().min(2).max(50),
	subtitle: z.string().min(2),
	description: z.string().min(2).max(250),
	picture: z.instanceof(File).optional(),
});

export const authSchemaLogin = z.object({
	email: z.string().email(),
	password: z.string().min(4).max(30),
});

export const authSchemaRegister = z.object({
	username: z.string().min(2).max(30),
	email: z.string().email(),
	password: z.string().min(4).max(30),
	picture: z.instanceof(File).optional(),
});
