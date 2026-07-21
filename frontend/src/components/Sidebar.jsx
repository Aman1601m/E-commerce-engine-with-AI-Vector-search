function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-gray-800 text-white p-6">
            <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
            <ul className="space-y-4">
                <li className="hove:text-blue-300 cursor-pointer">Dashboard</li>
                <li className="hove:text-blue-300 cursor-pointer">Products</li>
                <li className="hove:text-blue-300 cursor-pointer">Orders</li>
                <li className="hove:text-blue-300 cursor-pointer">Customers</li>
            </ul>
        </aside>
    );
}
export default Sidebar;
