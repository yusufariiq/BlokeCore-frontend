import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="flex justify-center py-12">
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button className='items-center px-4 py-2 '>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border-2 text-base font-medium ${
                    page === currentPage
                    ? 'z-10 bg-gray-50 text-primary'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
                >
                {page}
                </button>
            ))}
            <button className='items-center px-4 py-2 '>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </nav>
      </div>
    );
  };

export default Pagination