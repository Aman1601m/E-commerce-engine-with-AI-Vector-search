import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <AppRoutes />
        </div>
      </div>

    </div>
  );
}

export default App;