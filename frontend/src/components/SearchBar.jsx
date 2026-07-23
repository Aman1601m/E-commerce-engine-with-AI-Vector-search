function SearchBar() {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;