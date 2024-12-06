import { useState, useEffect, useMemo } from 'react';

const useProductFilter = (products, initialSearchQuery = '') => {
  const [selectedFilters, setSelectedFilters] = useState({
    condition: [],
    sizes: [],
  });
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortOption, setSortOption] = useState('');

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = products.filter((product) => {
      const conditionMatch = selectedFilters.condition.length === 0 || 
        selectedFilters.condition.includes(product.details?.condition);

        const sizeMatch = 
        selectedFilters.sizes.length === 0 || 
        selectedFilters.sizes.some(selectedSize => 
          product.details?.size?.some(
            productSize => productSize.trim().toUpperCase() === selectedSize.trim().toUpperCase()
          )
        );
    
      const searchMatch = 
        searchQuery.length === 0 || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
      return conditionMatch && sizeMatch && searchMatch;
    });

    if (sortOption) {
      result = [...result].sort((a, b) => {
        switch (sortOption) {
          case 'Year: Newest':
            return (b.details?.year || 0) - (a.details?.year || 0);
          case 'Year: Oldest':
            return (a.details?.year || 0) - (b.details?.year || 0);
          case 'Price: Low to High':
            return a.price - b.price;
          case 'Price: High to Low':
            return b.price - a.price;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [products, selectedFilters, searchQuery, sortOption]);

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  // Handler for sort changes
  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  // Handler for search query
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return {
    filteredProducts,
    handleFilterChange,
    handleSortChange,
    handleSearchChange,
    selectedFilters,
    sortOption,
    searchQuery
  };
};

export default useProductFilter;