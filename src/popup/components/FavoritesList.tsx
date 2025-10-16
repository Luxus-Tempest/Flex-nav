import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { TabList } from './TabList';

export const FavoritesList: React.FC = () => {
  const { favorites, loading, switchToTab, toggleFavorite } = useFavorites();

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin text-3xl">⏳</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
        <span>⭐</span>
        <span>Favorite Tabs</span>
        <span className="text-sm text-gray-400">({favorites.length})</span>
      </h2>
      <TabList
        tabs={favorites}
        onTabClick={(tab) => switchToTab(tab.id)}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};
