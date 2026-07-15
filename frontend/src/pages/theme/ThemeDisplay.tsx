import { useEffect, useState } from 'react';
import { HiChevronDown, HiTrash } from 'react-icons/hi';
import { MdPalette } from 'react-icons/md';

import {
    useGetThemePropertyTypes,
    useSetThemeAsDefault,
    useUpdateTheme,
    useDeleteTheme,
} from '../../hooks/tanstackQuery/useThemeApi';
import ConfirmModal from '../../components/common/ConfirmModal';
import type { Theme } from '../../types/theme';
import PropertyInputField from './PropertyInputField';

const ThemeDisplay = ({
    theme,
}: {
    theme: Theme;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const { data: propertyTypes } = useGetThemePropertyTypes();

    const [localProperties, setLocalProperties] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!propertyTypes) return;
        const allProps: Record<string, string> = {};
        propertyTypes.forEach((pt) => {
            allProps[String(pt.id)] = theme.properties[String(pt.id)] || '';
        });
        setLocalProperties(allProps);
    }, [propertyTypes, theme.id]);

    const { mutate: setAsDefault, isPending: isSettingDefault } = useSetThemeAsDefault();
    const { mutate: updateTheme, isPending: isSaving } = useUpdateTheme();
    const { mutate: deleteTheme, isPending: isDeleting } = useDeleteTheme();

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDeleteConfirmOpen(true);
    };

    const confirmDelete = () => {
        setIsDeleteConfirmOpen(false);
        deleteTheme(theme.id);
    };

    const handleSetAsDefault = (e: React.MouseEvent) => {
        e.stopPropagation();
        setAsDefault(theme.id, { onSuccess: () => setIsOpen(false) });
    };

    const handlePropertyChange = (key: string, value: string) => {
        setLocalProperties((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        const propertiesArray = Object.entries(localProperties).map(([key, value]) => ({
            propertyTypeId: Number(key),
            propertyValue: value,
        }));
        updateTheme({ id: theme.id, params: { name: theme.name, properties: propertiesArray } });
    };

    const handleCancel = () => {
        const allProps: Record<string, string> = {};
        propertyTypes?.forEach((pt) => {
            allProps[pt.id] = theme.properties[pt.id] || '';
        });
        setLocalProperties(allProps);
        setIsOpen(false);
    };

    return (
        <>
            <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50/80 transition-colors cursor-pointer"
                >
                    <div className="flex items-center gap-4 flex-1 text-left min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                            <MdPalette size={20} className="text-indigo-500" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-[15px] font-semibold text-gray-900 truncate">{theme.name}</h2>
                            {theme.isDefault && (
                                <span className="text-[11px] font-medium bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full inline-block mt-1">
                                    Default Theme
                                </span>
                            )}
                        </div>
                    </div>

                    {!theme.isDefault && (
                        <button
                            onClick={handleSetAsDefault}
                            disabled={isSettingDefault}
                            className="mr-2 shrink-0 px-3 py-1.5 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSettingDefault ? 'Setting...' : 'Set as Default'}
                        </button>
                    )}

                    {!theme.isDefault && (
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="mr-3 shrink-0 px-3 py-1.5 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                        >
                            <HiTrash size={14} />
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    )}

                    <HiChevronDown
                        size={18}
                        className={`text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>

                {isOpen && (
                    <div className="border-t border-gray-100 p-5 bg-gray-50/60 animate-fade-in">
                        <div className="space-y-6">
                            {propertyTypes?.map((pt) => (
                                <PropertyInputField
                                    key={pt.id}
                                    id={pt.id}
                                    value={localProperties[pt.id] || ''}
                                    onChange={(val) => handlePropertyChange(String(pt.id), val)}
                                />
                            ))}
                        </div>

                        <div className="flex gap-2 pt-6 border-t border-gray-200 mt-6">
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-xl shadow-sm hover:bg-indigo-600 hover:shadow-md active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={isSaving}
                                className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-xl border border-gray-200 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <ConfirmModal
                isOpen={isDeleteConfirmOpen}
                title="Delete Theme"
                message={`Are you sure you want to delete the theme "${theme.name}"?`}
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
                onConfirm={confirmDelete}
                onCancel={() => setIsDeleteConfirmOpen(false)}
            />
        </>
    );
};

export default ThemeDisplay;