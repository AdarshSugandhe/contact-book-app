const Pagination = (props) => {
  const { page, limit, total, onChange } = props;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-all cursor-pointer"
      >
        Prev
      </button>
      <span className="text-gray-700">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-all cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
