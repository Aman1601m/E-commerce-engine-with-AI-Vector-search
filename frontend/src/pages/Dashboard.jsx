import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";

function Dashboard() {
  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Product Dashboard
      </h1>

      <SearchBar />

      <CategoryFilter />

      <ProductGrid />

    </main>
  );
}

export default Dashboard;