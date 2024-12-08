import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useProductFilter from '../hooks/useProductFilter';
import { ShopContext } from '../context/ShopContext';
import Catalogue from './Catalogue';

const SearchResults = () => {
  const { products, searchProducts, isLoading } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    if (searchQuery) {
      searchProducts(searchQuery);
    }
  }, [searchQuery, searchProducts]);

  const { filteredProducts, handleFilterChange, sortOption, handleSortChange } = useProductFilter(products, searchQuery);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen'>
      {searchQuery && (
        <Catalogue
          title={`Search Results for: '${searchQuery}'`}
          products={filteredProducts}
          handleFilterChange={handleFilterChange}
          sortOption={sortOption}
          handleSortChange={handleSortChange}
        />
      )}
      
      {(!searchQuery || filteredProducts.length === 0) && (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">
            {searchQuery ? 'No results found' : 'Please enter a search query'}
          </h2>
          {searchQuery && (
            <p className="text-gray-600">
              Try different keywords or check your spelling
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;