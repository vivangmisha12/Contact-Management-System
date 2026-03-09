export interface ContactType {
	id: number;
	name: string;
	email: string;
	phone?: string;
	userId: number;
}

export type ContactInput = {
	name: string;
	email: string;
	phone?: string;
};
