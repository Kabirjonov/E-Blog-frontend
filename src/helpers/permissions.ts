import type { IPost } from "@/types/article.type";
import type { IUser } from "@/types/user.type";

export function isPostOwner(post?: IPost, user?: IUser | null): boolean {
	// there is little stupied mistake, in backend we send user info after result dto in dto we write 	this.id = module._id;
	// but post auther is _id writed so now we must rewrite a lot code or just close ther like this
	// @ts-ignore
	console.log("userID", user.id, "Post auther id", post.auther._id);
	if (!post || !user) return false;
	// @ts-ignore
	return post.auther?._id === user.id;
}
