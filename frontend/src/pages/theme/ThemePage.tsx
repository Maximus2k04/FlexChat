import { useNavigate } from 'react-router-dom';

import {
  useGetAllThemes,
} from '../../hooks/tanstackQuery/useThemeApi';
import useQueryParams from '../../hooks/useQueryParams';
import { useUpdateUrl } from '../../hooks/useUpdateUrl';
import type { Theme } from '../../types/theme';
import Loader from '../../components/common/Loader';
import ThemeDisplay from './ThemeDisplay';
import ThemeListPagination from './ThemeListPagination';
import routes from '../../constants/routes/routes';

const ThemePage = () => {
  const navigate = useNavigate();
  const changeQueryParams = useUpdateUrl();
  const currentQueryParams = useQueryParams();

  const currentPage = parseInt(currentQueryParams.page as string) || 1;
  const currentPageSize = parseInt(currentQueryParams.pageSize as string) || 10;

  const { data, isLoading: isFetching } = useGetAllThemes(currentQueryParams);

  const handlePageChange = (newPage: number) => {
    changeQueryParams('', { page: newPage, pageSize: currentPageSize });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    changeQueryParams('', { page: 1, pageSize: newPageSize });
  };

  if (isFetching) return <Loader />;

  const hasThemes = data && data.length > 0;
  const isLastPage = !!data && data.length < currentPageSize;

  return (
    <div className="min-h-screen bg-gray-50 py-10 relative">
      <div className="max-w-2xl mx-auto px-4 space-y-3">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Themes</h1>
            <p className="text-sm text-gray-400 mt-1">Customize how your chats look and feel.</p>
          </div>
          <button
            onClick={() => navigate(routes.themesCreate)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-indigo-600 hover:shadow-md active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
          >
            Create Theme
          </button>
        </div>

        {hasThemes ? (
          <>
            <div className="space-y-3">
              {data?.map((theme: Theme) => (
                <ThemeDisplay
                  key={theme.id}
                  theme={theme}
                />
              ))}
            </div>

            <ThemeListPagination
              currentPage={currentPage}
              currentPageSize={currentPageSize}
              isLastPage={isLastPage}
              isLoading={false}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No themes yet</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">Create your first theme to get started with customization.</p>
            <button
              onClick={() => navigate(routes.themesCreate)}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-indigo-600 hover:shadow-md active:scale-95 transition-all"
            >
              Create Theme
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemePage;