import { useMemo } from 'react';
import { useTabs } from './useTabs';

export const useFavorites = () => {
  const { tabs, loading, error, toggleFavorite, switchToTab } = useTabs();

  const favorites = useMemo(() => {
    return tabs.filter(tab => tab.isFavorite);
  }, [tabs]);

  return {
    favorites,
    loading,
    error,
    toggleFavorite,
    switchToTab,
  };
};
