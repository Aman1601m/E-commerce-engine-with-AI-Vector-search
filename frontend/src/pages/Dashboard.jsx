function App(){

return(
<div className="min-h-screen bg-gray-100">

<h1 className="text-3xl font-bold p-5">
AI E-Commerce Dashboard
</h1>


<div className="grid grid-cols-3 gap-5 p-5">

<div className="bg-white p-5 shadow rounded">
<h2>Products</h2>
<p className="text-3xl">120</p>
</div>


<div className="bg-white p-5 shadow rounded">
<h2>Orders</h2>
<p className="text-3xl">340</p>
</div>


<div className="bg-white p-5 shadow rounded">
<h2>Customers</h2>
<p className="text-3xl">560</p>
</div>

</div>

</div>
)

}

export default App;