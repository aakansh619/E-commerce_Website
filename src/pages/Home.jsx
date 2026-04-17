import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setSelectedCategory, setSelectedPrice, updateFilteredProducts } from "../redux/Slices/CartSlice";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  const { filtered, selectedCategory, selectedPrice } = useSelector((state) => state.products);




  // Fetch products from API
  async function fetchProductData() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(data);
      dispatch(setProducts(data));
      dispatch(updateFilteredProducts(data));
    } catch (err) {
      alert("Error loading products");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  // 🔹 Apply filters whenever category or price changes
  useEffect(() => {
    let filteredData = posts;

    // Filter by category
    if (selectedCategory && selectedCategory !== "All") {
      filteredData = filteredData.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by price
    if (selectedPrice) {
      filteredData = filteredData.filter((item) => {
        if (selectedPrice === "0-50") return item.price >= 0 && item.price <= 50;
        if (selectedPrice === "50-100") return item.price > 50 && item.price <= 100;
        if (selectedPrice === "100+") return item.price > 100;
        return true;
      });
    }

    dispatch(updateFilteredProducts(filteredData));
  }, [selectedCategory, selectedPrice, posts, dispatch]);

  const uniqueCategories = ["All", ...new Set(posts.map((e) => e.category))];

  console.log(filtered)

 return (
  <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#111827] text-white px-6 py-8">
    
    <div className="max-w-7xl mx-auto flex gap-6">

      {/* 🔥 Sidebar */}
      <div className="w-72 h-fit sticky top-6 rounded-2xl p-[1px] bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/30 shadow-2xl">

        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5">

          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Filters
          </h2>

          {/* Category */}
          <div className="mb-8">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">
              Category
            </p>

            <div className="flex flex-col gap-2">
              {uniqueCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => dispatch(setSelectedCategory(cat))}
                  className={`text-left px-4 py-2 rounded-xl transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg scale-[1.02]"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">
              Price
            </p>

            <div className="flex flex-col gap-3">

              <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-cyan-400 transition">
                <input
                  type="radio"
                  name="price"
                  value="0-50"
                  checked={selectedPrice === "0-50"}
                  onChange={(e) =>
                    dispatch(setSelectedPrice(e.target.value))
                  }
                  className="accent-cyan-500"
                />
                $0 - $50
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-cyan-400 transition">
                <input
                  type="radio"
                  name="price"
                  value="50-100"
                  checked={selectedPrice === "50-100"}
                  onChange={(e) =>
                    dispatch(setSelectedPrice(e.target.value))
                  }
                  className="accent-cyan-500"
                />
                $50 - $100
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-cyan-400 transition">
                <input
                  type="radio"
                  name="price"
                  value="100+"
                  checked={selectedPrice === "100+"}
                  onChange={(e) =>
                    dispatch(setSelectedPrice(e.target.value))
                  }
                  className="accent-cyan-500"
                />
                $100+
              </label>

            </div>
          </div>
        </div>
      </div>

      {/* 🔥 Products Section */}
      <div className="flex-1">

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Explore Products
          </h1>
          <p className="text-gray-400 mt-1">
            Discover trending items with premium style
          </p>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center mt-20">
            <Spinner />
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((post) => (
              <Product key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="h-[60vh] flex items-center justify-center">
            <p className="text-xl text-gray-400">
              No products found 🚫
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default Home;
