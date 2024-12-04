import React from "react";
import { Product } from "../hooks/useProducts";

interface WishlistProps {
  wishlist: Product[];
  removeFromWishlist: (productId: number) => void;
}

const Wishlist: React.FC<WishlistProps> = ({
  wishlist,
  removeFromWishlist,
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6">Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">No products in the wishlist</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <span className="text-lg">{product.name}</span>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
