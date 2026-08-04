function ProductSummary() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">

      <div className="bg-white shadow rounded p-5">
        <h3>Total Products</h3>
        <p className="text-3xl font-bold mt-2">120</p>
      </div>

      <div className="bg-white shadow rounded p-5">
        <h3>In Stock</h3>
        <p className="text-3xl font-bold mt-2">95</p>
      </div>

      <div className="bg-white shadow rounded p-5">
        <h3>Out of Stock</h3>
        <p className="text-3xl font-bold mt-2">25</p>
      </div>

    </div>
  );
}

export default ProductSummary;
