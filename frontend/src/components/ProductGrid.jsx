import ProductCard from "./ProductCard";

function ProductGrid() {
  const products = [
    {
      id: 1,
      name: "Wireless Mouse",
      price: 799,
      category: "Electronics",
    },
    {
      id: 2,
      name: "Keyboard",
      price: 1499,
      category: "Electronics",
    },
    {
      id: 3,
      name: "Headphones",
      price: 2499,
      category: "Accessories",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mt-8">
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