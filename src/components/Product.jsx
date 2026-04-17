import {toast} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { remove, add } from "../redux/Slices/CartSlice";

const Product = ({post}) => {
  const {cart} = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () =>  {
    dispatch(add(post));
    toast.success("Item added to Cart");
  }

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Item removed from Cart");
  }

 return (
  <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1">

    {/* 🔥 Glass Card */}
    <div className="h-[390px] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-4 flex flex-col justify-between overflow-hidden transition-all duration-300 group-hover:shadow-cyan-500/20">

      {/* ✨ Glow Hover Layer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-cyan-500/5 blur-2xl"></div>

      {/* 📦 Title */}
      <div className="relative z-10">
        <p className="text-white font-semibold text-sm leading-5 line-clamp-2 min-h-[40px]">
          {post.title}
        </p>
      </div>

      {/* 📝 Description */}
      <div className="relative z-10">
        <p className="text-gray-400 text-xs leading-5">
          {post.description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
      </div>

      {/* 🖼️ Product Image */}
      <div className="relative z-10 h-[170px] flex items-center justify-center overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* 💰 Bottom Section */}
      <div className="relative z-10 flex justify-between items-center mt-3">

        {/* Price */}
        <p className="text-cyan-400 font-bold text-lg">
          ${post.price}
        </p>

        {/* Button */}
        {cart.some((p) => p.id === post.id) ? (
          <button
            onClick={removeFromCart}
            className="px-3 py-2 rounded-full text-xs font-semibold uppercase
            bg-red-500/15 text-red-400 border border-red-400/30
            hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={addToCart}
            className="px-3 py-2 rounded-full text-xs font-semibold uppercase
            bg-cyan-500/15 text-cyan-400 border border-cyan-400/30
            hover:bg-cyan-500 hover:text-white transition-all duration-300 cursor-pointer"
          >
            Add Cart
          </button>
        )}
      </div>
    </div>
  </div>
);
};

export default Product;
