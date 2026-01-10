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
export const emailSchema = z.object({
	email: z.string().email(),
});
export const passwordSchema = z
	.object({
		password: z.string().min(4).max(30),
		confirmPassword: z.string().min(4).max(30),
	})
	.refine(data => data.confirmPassword === data.password, {
		message: "Password is not match",
		path: ["confirmPassword"],
	});
