import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import useProductFilter from '../hooks/useProductFilter';
import { ShopContext } from '../context/ShopContext';
import Catalogue from './Catalogue';

const SearchResults = () => {
  const { products } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');

  const { filteredProducts, handleFilterChange, sortOption, handleSortChange } = useProductFilter(products, searchQuery);

  return (
    <Catalogue
      title={`Search Results for: '${searchQuery}'`}
      products={filteredProducts}
      handleFilterChange={handleFilterChange}
      sortOption={sortOption}
      handleSortChange={handleSortChange}
    />
  );
};

export default SearchResults;