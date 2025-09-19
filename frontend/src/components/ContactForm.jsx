import { useState } from "react";

const emailRx = /^\S+@\S+\.\S+$/;
const phoneRx = /^\d{10}$/;

const ContactForm = ({ onAdd }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";

    if (!emailRx.test(form.email)) e.email = "Invalid email";

    if (!phoneRx.test(form.phone)) e.phone = "Phone must be 10 digits";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    await onAdd({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    });

    setForm({ name: "", email: "", phone: "" });
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

      <input
        className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

      <input
        className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 cursor-pointer"
      >
        {submitting ? "Adding..." : "Add Contact"}
      </button>
    </form>
  );
};

export default ContactForm;
