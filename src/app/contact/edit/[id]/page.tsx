import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateContactAction } from "../../../actions/contact";
import { requireSession } from "../../../actions/auth";
import { readDb } from "../../../_lib/db";

type EditContactPageProps = {
  params: Promise<{ id: string }>;
};

const EditContactPage = async ({ params }: EditContactPageProps) => {
  const { id } = await params;
  const contactId = Number(id);

  if (Number.isNaN(contactId)) {
    notFound();
  }

  const session = await requireSession();
  const db = await readDb();
  const contact = db.contacts.find((item) => item.id === contactId && item.userId === session.id);

  if (!contact) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Contact</h1>
        <Link href="/contact" className="text-sm text-blue-600 hover:underline">
          Back to contacts
        </Link>
      </div>

      <form action={updateContactAction} className="space-y-4">
        <input type="hidden" name="id" value={contact.id} />

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={contact.name}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            defaultValue={contact.email}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            defaultValue={contact.phone ?? ""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Update contact
        </button>
      </form>
    </div>
  );
};

export default EditContactPage;