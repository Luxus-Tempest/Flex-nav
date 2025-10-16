import React from 'react';

interface FilterTabsProps {
  activeFilter: 'all' | 'favorites' | 'recent';
  onFilterChange: (filter: 'all' | 'favorites' | 'recent') => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All Tabs', icon: '📑' },
    { id: 'favorites', label: 'Favorites', icon: '⭐' },
    { id: 'recent', label: 'Recent', icon: '🕒' },
  ] as const;

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all
            ${activeFilter === filter.id
              ? 'bg-chatgpt-accent text-white shadow-lg'
              : 'bg-chatgpt-light text-gray-300 hover:bg-chatgpt-hover'
            }`}
        >
          <span className="mr-1">{filter.icon}</span>
          {filter.label}
        </button>
      ))}
    </div>
  );
};
