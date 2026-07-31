function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold">{product.name}</h2>

        <p className="mt-4">
          Category: {product.category}
        </p>

        <p className="mt-2">
          Price: ₹{product.price}
        </p>

        <button
          onClick={onClose}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ProductModal;