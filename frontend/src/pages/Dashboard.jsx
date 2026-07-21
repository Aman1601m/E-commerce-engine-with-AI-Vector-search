import StatsCard from "../components/StatsCard";
import ProductGrid from "../components/ProductGrid";

function Dashboard() {
  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatsCard title="Products" value="120" />
        <StatsCard title="Orders" value="340" />
        <StatsCard title="Customers" value="560" />
      </div>

      <ProductGrid />

    </main>
  );
}

export default Dashboard;