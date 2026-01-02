import { z } from "zod";

export const PostSchema = z.object({
	title: z.string().min(2).max(50),
	subtitle: z.string().min(2),
	description: z.string().min(2).max(250),
});
