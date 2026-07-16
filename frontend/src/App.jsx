function App() {

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-blue-600 text-white p-5">
        <h1 className="text-3xl font-bold">
          AI E-Commerce Dashboard
        </h1>
      </header>


      <main className="p-8">

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">
              Products
            </h2>

            <p className="text-3xl mt-3">
              120
            </p>
          </div>


          <div className="bg-white p-6 rounded-lg shadow">

            <h2 className="text-xl font-semibold">
              Customers
            </h2>

            <p className="text-3xl mt-3">
              560
            </p>

          </div>


          <div className="bg-white p-6 rounded-lg shadow">

            <h2 className="text-xl font-semibold">
              Orders
            </h2>

            <p className="text-3xl mt-3">
              340
            </p>

          </div>


        </div>

      </main>

    </div>
  )
}


export default App