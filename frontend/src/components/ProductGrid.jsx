import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import SortProducts from "./SortProducts";
import { getProducts } from "../services/productService";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort filtered products based on sort selection
  const sortedProducts = [...filteredProducts];
  if (sort === "priceLow") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "priceHigh") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (loading) {
    return <div className="text-center text-lg">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600 font-semibold text-center">{error}</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Display Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <SearchBar value={search} onChange={setSearch} />
        <SortProducts value={sort} onChange={setSort} />
      </div>

      {/* Render Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;