export interface IResponse$Axios<T> {
	status: number;
	message: string;
	body: T;
}
