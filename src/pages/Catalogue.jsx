import React from 'react';
import FilterCategory from '../components/Common/FilterCategory';
import Pagination from '../components/Common/Pagination';
import ProductItem from '../components/Collections/ProductItem';
import Title from '../components/Common/Title';
import usePagination from '../hooks/usePagination';
import useProductFilter from '../hooks/useProductFilter';

const Catalogue = ({ title, products }) => {

    const {
        filteredProducts,
        handleFilterChange,
        handleSortChange,
        sortOption
    } = useProductFilter(products);

    const { 
        currentItems, 
        currentPage, 
        totalPages, 
        paginate 
    } = usePagination(filteredProducts, 16);

    return (
        <div className="min-h-[100vh] mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <Title text={title} />
            <FilterCategory 
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                currentSort={sortOption}
            />
            <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {currentItems.map((item, index) => (
                    <div
                        key={index}
                        className="group relative"
                        onMouseEnter={() => {}}
                        onMouseLeave={() => {}}
                    >
                        <ProductItem 
                            id={item.id} 
                            images={item.images} 
                            name={item.name} 
                            price={item.price} 
                        />
                    </div>
                ))}
            </div>
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={paginate} 
            />
        </div>
    );
};

export default Catalogue;