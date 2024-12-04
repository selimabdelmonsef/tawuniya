import React from "react";
import { Product } from "../hooks/useProducts";

interface ProductCardProps {
  product: Product;
  addToWishlist: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  addToWishlist,
}) => {
  return (
    <div className="border p-4 m-4 w-full sm:w-48 bg-white shadow-lg rounded-lg transition-transform hover:scale-105">
      <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
      <button
        onClick={() => addToWishlist(product)}
        className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
      >
        Add to Wishlist
      </button>
    </div>
  );
};

export default ProductCard;
