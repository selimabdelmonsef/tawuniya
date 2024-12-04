import { useState, useEffect } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface Category {
  id: string;
  name: string;
}
export const useProducts = (productsPerPage = 3) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const productsData = [
        { id: 1, name: "Product 1", price: 29.99, category: "1" },
        { id: 2, name: "Product 2", price: 19.99, category: "1" },
        { id: 3, name: "Product 3", price: 39.99, category: "2" },
        { id: 4, name: "Product 4", price: 49.99, category: "2" },
        { id: 5, name: "Product 5", price: 59.99, category: "3" },
        { id: 6, name: "Product 6", price: 69.99, category: "3" },
        { id: 7, name: "Product 7", price: 79.99, category: "1" },
        { id: 8, name: "Product 8", price: 89.99, category: "2" },
        { id: 9, name: "Product 9", price: 99.99, category: "3" },
        { id: 10, name: "Product 10", price: 109.99, category: "1" },
      ];
      const categoriesData = [
        { id: "1", name: "Category 1" },
        { id: "2", name: "Category 2" },
        { id: "3", name: "Category 3" },
      ];
      setProducts(productsData);
      setCategories(categoriesData);

      // Calculate total pages
      const total = Math.ceil(productsData.length / productsPerPage);
      setTotalPages(total);

      // Set current page products
      setCurrentProducts(productsData.slice(0, productsPerPage));
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const updatePagination = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setCurrentProducts(products.slice(startIndex, endIndex));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    updatePagination();
  }, [currentPage, products]);

  return {
    products,
    currentProducts,
    categories,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
  };
};
