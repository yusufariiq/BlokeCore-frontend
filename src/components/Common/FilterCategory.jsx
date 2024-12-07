import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSort } from '@fortawesome/free-solid-svg-icons';

const FilterCategory = ({ onFilterChange, onSortChange, currentSort }) => {
    const [openFilter, setOpenFilter] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        condition: [],
        sizes: []
    });
  
    const sortOptions = [
        { name: 'Year: Newest', value: 'Year: Newest' },
        { name: 'Year: Oldest', value: 'Year: Oldest' },
        { name: 'Price: Low to High', value: 'Price: Low to High' },
        { name: 'Price: High to Low', value: 'Price: High to Low' },
    ];

    const filters = [
        {
            id: 'condition',
            name: 'Condition',
            options: [
                { value: 'Brand new', label: 'Brand new' },
                { value: 'Excellent', label: 'Excellent' },
                { value: 'Very Good', label: 'Very Good' },
                { value: 'Good', label: 'Good' },
                { value: 'Mint', label: 'Mint' },
            ],
        },
        {
            id: 'sizes',
            name: 'Sizes',
            options: [
                { value: 'S', label: 'S' },
                { value: 'M', label: 'M' },
                { value: 'L', label: 'L' },
                { value: 'XL', label: 'XL' },
                { value: '2XL', label: '2XL' },
                { value: 'Kids', label: 'Kids' },
            ],
        },
    ];

    const handleFilterClick = (filterType) => {
        setOpenFilter(openFilter === filterType ? null : filterType);
    };

    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...selectedFilters };
        const filterArray = newFilters[filterType] || [];
        
        const updatedFilterArray = filterArray.includes(value)
            ? filterArray.filter(item => item !== value)
            : [...filterArray, value];
        
        newFilters[filterType] = updatedFilterArray;
        
        // Update local state
        setSelectedFilters(newFilters);
        
        // Propagate changes to parent component
        onFilterChange(newFilters);
    };

    const handleSortOptionClick = (optionName) => {
        // Update sort option in parent component
        onSortChange(optionName);
        setOpenFilter(null);
    };

    const getSelectedCount = (filterType) => {
        return selectedFilters[filterType]?.length || 0;
    };

    return (
        <div className="divider flex flex-wrap items-center gap-4 p-4 border-t">
            <div className="relative">
                <button 
                    onClick={() => handleFilterClick('sort')}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border rounded-lg"
                >
                    <span>{currentSort || 'Sort'}</span>
                    <FontAwesomeIcon icon={faSort} className="text-primary w-4 h-4" />
                </button>
                {openFilter === 'sort' && (
                    <div className="absolute z-10 w-48 mt-2 bg-white border rounded-lg shadow-lg">
                        <div className="p-2">
                            {sortOptions.map((option) => (
                                <div 
                                    key={option.value} 
                                    className={`px-3 py-2 hover:bg-gray-50 cursor-pointer ${
                                        currentSort === option.value ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleSortOptionClick(option.value)}
                                >
                                    {option.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-1 flex justify-end items-center gap-4">
                {filters.map((filter) => (
                    <div key={filter.id} className="relative">
                        <button
                            onClick={() => handleFilterClick(filter.id)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border rounded-lg"
                        >
                            <span>{filter.name}</span>
                            {getSelectedCount(filter.id) > 0 && (
                                <span className="ml-1 px-2 py-0.5 text-xs bg-gray-100 rounded-full">
                                    {getSelectedCount(filter.id)}
                                </span>
                            )}
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`w-4 h-4 text-primary transition-transform duration-200 ${
                                    openFilter === filter.id ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        {openFilter === filter.id && (
                            <div className="absolute z-10 w-48 mt-2 bg-white border rounded-lg shadow-lg">
                                <div className="p-2">
                                    {filter.options.map((option) => (
                                        <label
                                            key={option.value}
                                            className="flex items-center px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                                checked={selectedFilters[filter.id]?.includes(option.value)}
                                                onChange={() => handleFilterChange(filter.id, option.value)}
                                            />
                                            <span className="ml-3 text-gray-700">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterCategory;