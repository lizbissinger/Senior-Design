import React from 'react';

type CustomPaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
};

const CustomPagination: React.FC<CustomPaginationProps> = ({ currentPage, totalPages, handlePageChange }) => {
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 dark:text-white" aria-label="Table navigation">
      <ul className="mb-0 inline-flex items-stretch -space-x-px">
        <li>
          <a
            href="#"
            onClick={() => !isPreviousDisabled && handlePageChange(currentPage - 1)}
            className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 dark:text-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${isPreviousDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <span className="sr-only">Previous</span>
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </li>
        {[...Array(totalPages).keys()].map((index) => (
          <li key={index + 1}>
            <a
              href="#"
              onClick={() => handlePageChange(index + 1)}
              className={`flex items-center justify-center text-sm py-2 px-3 leading-tight  dark:text-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === index + 1 ? 'text-primary-600 bg-primary-50 border-primary-300 dark:text-white dark:bg-primary-600' : ''}`}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            onClick={() => !isNextDisabled && handlePageChange(currentPage + 1)}
            className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight  dark:text-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white ${isNextDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <span className="sr-only">Next</span>
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default CustomPagination;
