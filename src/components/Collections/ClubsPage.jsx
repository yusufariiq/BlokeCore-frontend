import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import Title from '../Common/Title';
import ProductItem from './ProductItem';
import FilterCategory from '../Common/FilterCategory';
import Pagination from '../Common/Pagination';
import usePagination from '../../hooks/usePagination';

const ClubsPage = () => {
    const { clubProducts } = useContext(ShopContext);
    const [ filteredProducts, setFilteredProducts ] = useState([]);
    const [ selectedFilters, setSelectedFilters ] = useState({
      condition: [],
      size: [],
    });
  
    const { currentItems, currentPage, totalPages, paginate } = usePagination(
      filteredProducts,
      8
    );
  
    useEffect(() => {
      handleFilterChange(selectedFilters);
    }, [clubProducts, selectedFilters]);
  
    const handleFilterChange = (newFilters) => {
      setSelectedFilters(newFilters);
      const filteredProducts = clubProducts.filter((product) => {
        const conditionMatch = newFilters.condition.length === 0 || newFilters.condition.includes(product.condition);
        const sizeMatch = newFilters.size.length === 0 || newFilters.size.includes(product.size);
        return conditionMatch && sizeMatch;
      });
      setFilteredProducts(filteredProducts);
    };
  
    return (
        <div className="min-h-[100vh] mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <Title text={"Clubs"} />
            <FilterCategory onFilterChange={handleFilterChange} />
            <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {currentItems.map((item, index) => (
                <div
                    key={index}
                    className="group relative"
                    onMouseEnter={() => {}}
                    onMouseLeave={() => {}}
                >
                <ProductItem id={item.id} image={item.image} name={item.name} price={item.price} />
                </div>
            ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
        </div>
    );
};
  
export default ClubsPage;