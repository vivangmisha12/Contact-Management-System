import { requireSession } from "../actions/auth";
import { readDb } from "../_lib/db";
import ToastHandler from "../_components/ToastHandler";
import ContactList from "../_components/ContactList";

const ContactPage = async () => {
  const session = await requireSession();
  const db = await readDb();
  const contacts = db.contacts.filter((contact) => contact.userId === session.id);

  return (
    <>
      <ToastHandler />
      <ContactList contacts={contacts} />
    </>
  );
};

export default ContactPage;