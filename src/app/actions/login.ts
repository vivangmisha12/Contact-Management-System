"use server";

import { loginAction as loginActionCore } from "./auth";

export async function loginAction(formData: FormData) {
	return loginActionCore(formData);
}