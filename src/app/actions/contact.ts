"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "./auth";
import { nextId, readDb, writeDb } from "../_lib/db";

const extractContactValues = (formData: FormData) => {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();

    if (!name || !email) {
        throw new Error("Name and email are required");
    }

    return { name, email, phone };
};

export const createContactAction = async (formData: FormData) => {
    const session = await requireSession();
    const { name, email, phone } = extractContactValues(formData);

    const db = await readDb();
    db.contacts.push({
        id: nextId(db.contacts),
        name,
        email,
        phone,
        userId: session.id,
    });

    await writeDb(db);
    revalidatePath("/contact");
    redirect("/contact?success=create");
};

export const updateContactAction = async (formData: FormData) => {
    const session = await requireSession();
    const id = Number(formData.get("id"));

    if (Number.isNaN(id)) {
        throw new Error("Invalid contact id");
    }

    const { name, email, phone } = extractContactValues(formData);

    const db = await readDb();
    const index = db.contacts.findIndex((contact) => contact.id === id && contact.userId === session.id);

    if (index < 0) {
        throw new Error("Contact not found");
    }

    db.contacts[index] = {
        ...db.contacts[index],
        name,
        email,
        phone,
    };

    await writeDb(db);
    revalidatePath("/contact");
    revalidatePath(`/contact/edit/${id}`);
    redirect("/contact?success=update");
};

export const deleteContactAction = async (formData: FormData) => {
    const session = await requireSession();
    const id = Number(formData.get("id"));

    if (Number.isNaN(id)) {
        throw new Error("Invalid contact id");
    }

    const db = await readDb();
    const filtered = db.contacts.filter((contact) => !(contact.id === id && contact.userId === session.id));

    if (filtered.length === db.contacts.length) {
        throw new Error("Contact not found");
    }

    db.contacts = filtered;
    await writeDb(db);
    revalidatePath("/contact");
    redirect("/contact?success=delete");
};
