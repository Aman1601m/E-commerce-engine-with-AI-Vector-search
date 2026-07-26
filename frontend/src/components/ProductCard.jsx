function ProductCard({ name, price, category }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h2 className="text-xl font-semibold">{name}</h2>

      <p className="text-gray-500 mt-2">
        Category: {category}
      </p>

      <p className="text-blue-600 font-bold mt-3">
        ₹{price}
      </p>

      <button className="mt-4 bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded">
        View Details
      </button>
    </div>
  );
}

export default ProductCard;