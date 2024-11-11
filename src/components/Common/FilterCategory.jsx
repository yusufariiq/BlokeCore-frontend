import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSort } from '@fortawesome/free-solid-svg-icons';

const FilterCategory = ({ onFilterChange }) => {
    const [openFilter, setOpenFilter] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        condition: [],
        size: []
    });
  
    const sortOptions = [
        { name: 'Year: Newest', href: '#', current: false },
        { name: 'Year: Oldest', href: '#', current: false },
        { name: 'Price: Low to High', href: '#', current: false },
        { name: 'Price: High to Low', href: '#', current: false },
    ];

    const filters = [
        {
            id: 'condition',
            name: 'Condition',
            options: [
                { value: 'Brand new', label: 'Brand new', checked: false },
                { value: 'Excellent', label: 'Excellent', checked: false },
                { value: 'Very Good', label: 'Very Good', checked: false },
                { value: 'Good', label: 'Good', checked: false },
                { value: 'Mint', label: 'Mint', checked: false },
            ],
        },
        {
            id: 'size',
            name: 'Size',
            options: [
                { value: 'S', label: 'S', checked: false },
                { value: 'M', label: 'M', checked: false },
                { value: 'L', label: 'L', checked: false },
                { value: 'XL', label: 'XL', checked: false },
                { value: '2XL', label: '2XL', checked: false },
                { value: 'Kids', label: 'Kids', checked: false },
            ],
        },
        
    ];

    const handleFilterClick = (filterType) => {
        setOpenFilter(openFilter === filterType ? null : filterType);
    };

    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...selectedFilters };
        const filterArray = newFilters[filterType];
        
        if (filterArray.includes(value)) {
            newFilters[filterType] = filterArray.filter(item => item !== value);
        } else {
            newFilters[filterType] = [...filterArray, value];
        }
        
        setSelectedFilters(newFilters);
        onFilterChange(newFilters);
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
                    <span>Sort</span>
                    <FontAwesomeIcon icon={faSort} className="text-primary w-4 h-4" />
                </button>
                {openFilter === 'sort' && (
                    <div className="absolute z-10 w-48 mt-2 bg-white border rounded-lg shadow-lg">
                        <div className="p-2">
                            {sortOptions.map((option) => (
                                <div key={option.name} className="px-3 py-2 hover:bg-gray-50 cursor-pointer">
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
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                checked={selectedFilters[filter.id].includes(option.value)}
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