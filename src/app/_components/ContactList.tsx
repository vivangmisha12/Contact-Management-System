"use client";

import { useState } from "react";
import Link from "next/link";
import { ContactType } from "../_types/contact";
import { deleteContactAction } from "../actions/contact";

interface ContactListProps {
  contacts: ContactType[];
}

const ContactList = ({ contacts }: ContactListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Your Contacts</h1>
        <Link
          href="/contact/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add contact
        </Link>
      </div>

      {/* Search Input */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-gray-600">
            Found {filteredContacts.length} contact{filteredContacts.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Contact List */}
      {filteredContacts.length === 0 ? (
        <div className="rounded-md border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
          {searchQuery
            ? `No contacts found matching "${searchQuery}"`
            : "No contacts yet. Add your first contact."}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Phone
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredContacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{contact.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{contact.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{contact.phone || "-"}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/contact/edit/${contact.id}`}
                        className="rounded border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-50"
                      >
                        Edit
                      </Link>
                      <form action={deleteContactAction}>
                        <input type="hidden" name="id" value={contact.id} />
                        <button
                          type="submit"
                          className="rounded border border-red-300 px-3 py-1 text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactList;
