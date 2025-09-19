import { useEffect, useState } from "react";
import api from "./api";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Pagination from "./components/Pagination";
import "./index.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get all contacts
  const fetchContacts = async (p = page) => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get(`/contacts?page=${p}&limit=${limit}`);
      setContacts(res.data.contacts || []);
      setTotal(res.data.total ?? 0);
      setPage(res.data.page ?? p);
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Failed to fetch"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(page);
  }, [page]);

  // Add contact
  const addContact = async (contact) => {
    const tempId = `temp-${Date.now()}`;
    const optimistic = { ...contact, _id: tempId };
    setContacts((prev) => [optimistic, ...prev]);
    try {
      await api.post("/contacts", contact);

      await fetchContacts(1);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add");

      setContacts((prev) => prev.filter((c) => c._id !== tempId));
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    const original = contacts;
    setContacts((prev) => prev.filter((c) => c._id !== id));
    try {
      await api.delete(`/contacts/${id}`);
      fetchContacts(page);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete");
      setContacts(original);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
        Contacts
      </h1>
      <ContactForm onAdd={addContact} />
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}
      <ContactList
        contacts={contacts}
        loading={loading}
        onDelete={deleteContact}
      />
      <Pagination
        page={page}
        limit={limit}
        total={total}
        onChange={(p) => setPage(p)}
      />
    </div>
  );
}

export default App;
