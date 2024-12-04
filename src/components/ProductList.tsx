import React, { useState } from "react";
import { Product, useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import { useAtom } from "jotai";
import { wishlistAtom } from "../atom/wishlistAtom";
import { searchQueryAtom } from "../atom/productAtoms";

const ProductList: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setSearchQuery(event.target.value);
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search for products"
        className="p-3 border border-gray-300 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToWishlist={addToWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
