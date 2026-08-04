function ProductStatus({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm text-white ${
        status === "In Stock"
          ? "bg-green-600"
          : "bg-red-600"
      }`}
    >
      {status}
    </span>
  );
}

export default ProductStatus;