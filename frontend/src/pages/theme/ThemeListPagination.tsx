import { HiChevronDown } from 'react-icons/hi';

interface ThemeListPaginationProps {
  currentPage: number;
  currentPageSize: number;
  isLastPage: boolean;
  isLoading: boolean;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
}

const ThemeListPagination = ({
  currentPage,
  currentPageSize,
  isLastPage,
  isLoading,
  onPageChange,
  onPageSizeChange,
}: ThemeListPaginationProps) => {
  return (
    <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-gray-200">
      <div className="flex items-center gap-4">
        <label htmlFor="pageSize" className="text-sm font-medium text-gray-700">
          Items per page:
        </label>
        <select
          id="pageSize"
          value={currentPageSize}
          onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
          disabled={isLoading}
          className="px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="flex items-center gap-3 justify-between">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-xl shadow-sm hover:bg-indigo-600 hover:shadow-md active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed transition-all"
        >
          <span className="flex items-center gap-2">
            <HiChevronDown size={16} className="rotate-90" />
            Previous
          </span>
        </button>

        <div className="flex items-center gap-3">
          <label htmlFor="pageNumber" className="text-sm font-medium text-gray-700">
            Page:
          </label>
          <input
            id="pageNumber"
            type="number"
            min={1}
            value={currentPage}
            disabled={isLastPage || isLoading}
            onChange={(e) => {
              const newPage = parseInt(e.target.value);
              if (newPage >= 1) onPageChange(newPage);
            }}
            className="w-16 px-3 py-2 border border-gray-200 rounded-xl text-center outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
          />
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage || isLoading}
          className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-xl shadow-sm hover:bg-indigo-600 hover:shadow-md active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed transition-all"
        >
          <span className="flex items-center gap-2">
            Next
            <HiChevronDown size={16} className="-rotate-90" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ThemeListPagination;