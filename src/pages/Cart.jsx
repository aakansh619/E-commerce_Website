import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem"
import { useEffect, useState } from "react";

const Cart = () => {
  const {cart} = useSelector((state) => state)
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect( () => {
    setTotalAmount(cart.reduce( (acc, curr) => acc + curr.price,0) )
  }, [cart])

 return (
  <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#111827] text-white px-6 py-8">
    <div className="max-w-[1200px] mx-auto">

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* 🛒 Cart Items */}
          <div className="lg:col-span-2">

            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Your Shopping Cart
            </h1>

            <div className="space-y-5">
              {cart.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>

          </div>

          {/* 💳 Summary Card */}
          <div className="h-fit sticky top-8 rounded-2xl p-[1px] bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/30 shadow-2xl">

            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">

              <p className="uppercase tracking-widest text-sm text-cyan-400 font-semibold">
                Your Cart
              </p>

              <h2 className="text-4xl font-bold mt-1 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Summary
              </h2>

              <div className="mt-8 space-y-4 text-gray-300">

                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span className="font-semibold text-white">
                    {cart.length}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between text-lg">
                  <span>Total Amount</span>
                  <span className="font-bold text-cyan-400">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

              </div>

              <button
                className="mt-8 w-full py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-cyan-500 to-blue-600
                hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30
                transition-all duration-300"
              >
                Checkout Now
              </button>

            </div>
          </div>
        </div>
      ) : (
        /* 🚫 Empty Cart */
        <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">

          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
            Your Cart is Empty
          </h1>

          <p className="text-gray-400 mt-3">
            Looks like you haven’t added anything yet.
          </p>

          <Link to="/">
            <button
              className="mt-6 px-8 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-green-500 to-cyan-500
              hover:scale-105 hover:shadow-lg hover:shadow-green-500/30
              transition-all duration-300"
            >
              Shop Now
            </button>
          </Link>

        </div>
      )}

    </div>
  </div>
);
};

export default Cart;


