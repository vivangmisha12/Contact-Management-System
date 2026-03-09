"use server";

import { redirect } from "next/navigation";
import { deleteSession, getSession, setSession } from "../_lib/session";
import { nextId, readDb, writeDb } from "../_lib/db";

export const loginAction = async (formData: FormData) => {
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "").trim();

    if (!email || !password) {
        redirect("/login?error=missing-fields");
    }

    const db = await readDb();
    const user = db.users.find((candidate) => candidate.email.toLowerCase() === email && candidate.password === password);

    if (!user) {
        redirect("/login?error=invalid-credentials");
    }

    await setSession({ id: user.id, name: user.name, email: user.email });
    redirect("/contact?success=login");
};

export const registerAction = async (formData: FormData) => {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "").trim();

    if (!name || !email || !password) {
        redirect("/register?error=missing-fields");
    }

    const db = await readDb();
    const existing = db.users.find((candidate) => candidate.email.toLowerCase() === email);

    if (existing) {
        redirect("/register?error=email-already-exists");
    }

    const newUser = {
        id: nextId(db.users),
        name,
        email,
        password,
    };

    db.users.push(newUser);
    await writeDb(db);
    await setSession({ id: newUser.id, name: newUser.name, email: newUser.email });
    redirect("/contact?success=register");
};

export const logoutAction = async () => {
    await deleteSession();
    redirect("/login");
};

export const requireSession = async () => {
    const session = await getSession();
    if (!session) {
        redirect("/login");
    }

    return session;
};
