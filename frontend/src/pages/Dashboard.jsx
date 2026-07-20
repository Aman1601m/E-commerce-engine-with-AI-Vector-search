import ProductGrid from "../components/ProductGrid";

function Dashboard() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Product Dashboard
      </h1>

      <ProductGrid />
    </main>
  );
}

export default Dashboard;