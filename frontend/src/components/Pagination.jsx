function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;