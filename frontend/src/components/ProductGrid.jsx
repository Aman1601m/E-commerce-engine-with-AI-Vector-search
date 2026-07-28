import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../services/productService";

function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
        />
      ))}
    </div>
  );
}

export default ProductGrid;