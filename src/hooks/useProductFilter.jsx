import { useState, useEffect } from 'react';

const useProductFilter = (products, searchQuery = '') => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    condition: [],
    sizes: [],
  });
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    handleFilterChange(selectedFilters, sortOption, searchQuery);
  }, [products, selectedFilters, sortOption, searchQuery]);

  const handleFilterChange = (newFilters, newSortOption = sortOption, newSearchQuery = '') => {
    setSelectedFilters(newFilters);
    let filtered = products.filter((product) => {
      const conditionMatch = newFilters.condition.length === 0 || newFilters.condition.includes(product.condition);
      const sizeMatch = newFilters.sizes.length === 0 || newFilters.sizes.includes(product.sizes);
      const searchMatch = newSearchQuery.length === 0 || product.name.toLowerCase().includes(newSearchQuery.toLowerCase());
      return conditionMatch && sizeMatch && searchMatch;
    });

    if (newSortOption) {
      filtered = [...filtered].sort((a, b) => {
        switch (newSortOption) {
          case 'Year: Newest':
            return (b.year || 0) - (a.year || 0);
          case 'Year: Oldest':
            return (a.year || 0) - (b.year || 0);
          case 'Price: Low to High':
            return a.price - b.price;
          case 'Price: High to Low':
            return b.price - a.price;
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(filtered);
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  return {
    filteredProducts,
    handleFilterChange,
    handleSortChange,
    sortOption,
  };
};

export default useProductFilter;