import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Wishlist from "../components/Wishlist";
import { useProducts } from "../hooks/useProducts";

const ProductPage: React.FC = () => {
  const {
    products,
    categories,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useProducts();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const addToWishlist = (product: any) => {
    const isAlreadyInWishlist = wishlist.some((item) => item.id === product.id);
    if (isAlreadyInWishlist) {
      alert("This product is already in your wishlist!");
      return;
    }

    setWishlist([...wishlist, product]);
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(wishlist.filter((product) => product.id !== productId));
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )
    .filter((product) => {
      return selectedCategory ? product.category === selectedCategory : true;
    });

  // Calculate the starting index and ending index for pagination
  const productsPerPage = 3;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-6">
      <CategoryFilter
        categories={categories}
        onFilterChange={setSelectedCategory}
      />
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToWishlist={addToWishlist}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-800 p-3 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-800 p-3 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} />
    </div>
  );
};

export default ProductPage;
