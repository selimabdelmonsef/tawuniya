import React from "react";
import { Category } from "../hooks/useProducts";

interface CategoryFilterProps {
  categories: Category[];
  onFilterChange: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onFilterChange,
}) => {
  return (
    <div className="mb-6">
      <label htmlFor="category" className="text-sm font-semibold text-gray-700">
        Filter by Category
      </label>
      <select
        id="category"
        onChange={(e) => onFilterChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
