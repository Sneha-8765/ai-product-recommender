import { useState } from "react";
import axios from "axios";
import products from "./products";

function App() {
  const [query, setQuery] = useState("");
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://ai-product-recommender-6d2b.onrender.com/recommend",
        {
          query,
          products,
        }
      );

      setRecommended(response.data.recommendations);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
  <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-4">
    AI Product Recommender
  </h1>

  <p className="text-slate-600 text-xl">
    Find products using AI-powered recommendations
  </p>
</div>

        {/* Search Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-10">
          
          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="I want a phone under $500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border border-slate-300 rounded-xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-8 py-4 rounded-xl font-semibold shadow-md"
            >
              {loading ? "Searching..." : "Get Recommendations"}
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="mb-12">

          <h2 className="text-3xl font-bold text-slate-800 mb-6">
            Available Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-slate-100"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                    {product.category}
                  </span>

                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-slate-800">
                  {product.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>

          <h2 className="text-3xl font-bold text-slate-800 mb-6">
            AI Recommendations
          </h2>

          {recommended.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500 shadow-md">
              No recommendations yet
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {recommended.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex justify-between items-center mb-4">

                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      Recommended
                    </span>

                    <span className="text-2xl font-bold">
                      ${item.price}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold">
                    {item.name}
                  </h3>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;