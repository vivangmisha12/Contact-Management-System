import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { ContactType } from "../_types/contact";
import { DbUserType } from "../_types/user";

const dbPath = path.join(process.cwd(), "src", "app", "_data", "db.json");

export type DbShape = {
    contacts: ContactType[];
    users: DbUserType[];
};

export const readDb = async (): Promise<DbShape> => {
    const raw = await readFile(dbPath, "utf-8");
    const db = JSON.parse(raw) as DbShape;
    return {
        contacts: db.contacts ?? [],
        users: db.users ?? [],
    };
};

export const writeDb = async (db: DbShape): Promise<void> => {
    await writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");
};

export const nextId = (items: Array<{ id: number }>): number => {
    if (items.length === 0) {
        return 1;
    }

    return Math.max(...items.map((item) => item.id)) + 1;
};
