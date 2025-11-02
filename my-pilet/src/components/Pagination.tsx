import * as React from 'react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Generate page numbers array
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const baseButtonClass =
    'relative inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900';

  return (
    <div className="flex justify-center mt-8">
      <nav
        className="relative z-0 inline-flex rounded-xl shadow-lg shadow-emerald-500/10 border border-slate-700 bg-slate-900/70 backdrop-blur"
        aria-label="Pagination">
        {/* Previous Page Button */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${baseButtonClass} rounded-l-xl border-r border-slate-700 ${
            currentPage === 1
              ? 'text-slate-600 cursor-not-allowed'
              : 'text-slate-200 hover:bg-slate-800'
          }`}>
          <span className="sr-only">Previous</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            aria-current={currentPage === number ? 'page' : undefined}
            className={`${baseButtonClass} border-r border-slate-700 ${
              currentPage === number
                ? 'z-10 bg-gradient-to-r from-emerald-500/30 to-emerald-500/10 text-emerald-300'
                : 'text-slate-300 hover:bg-slate-800'
            }`}>
            {number}
          </button>
        ))}

        {/* Next Page Button */}
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${baseButtonClass} rounded-r-xl ${
            currentPage === totalPages
              ? 'text-slate-600 cursor-not-allowed'
              : 'text-slate-200 hover:bg-slate-800'
          }`}>
          <span className="sr-only">Next</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;