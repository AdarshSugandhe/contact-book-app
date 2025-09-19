const ContactList = (props) => {
  const { contacts, loading, onDelete } = props;
  if (loading) return <div className="loader">Loading...</div>;
  if (!contacts.length) return <div className="empty text-2xl">No contacts yet.</div>;

  return (
    <div className="contact-list">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c._id} className="border-t">
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.phone}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => onDelete(c._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:hidden">
        {contacts.map((c) => (
          <div
            key={c._id}
            className="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2"
          >
            <div>
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-gray-600">{c.email}</p>
              <p className="text-sm text-gray-600">{c.phone}</p>
            </div>
            <button
              onClick={() => onDelete(c._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 self-start cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
