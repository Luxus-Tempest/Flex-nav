import { useState, useEffect } from 'react';
import { Tab } from '../../shared/types/tab';
import { tabService } from '../services/tabService';

export const useTabs = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTabs = async () => {
    try {
      setLoading(true);
      const allTabs = await tabService.getAllTabs();
      setTabs(allTabs);
      setError(null);
    } catch (err) {
      setError('Failed to load tabs');
      console.error('Error loading tabs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTabs();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadTabs();
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const toggleFavorite = async (tabId: number) => {
    try {
      await tabService.toggleFavorite(tabId);
      await loadTabs();
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const switchToTab = async (tabId: number) => {
    try {
      await tabService.switchToTab(tabId);
    } catch (err) {
      console.error('Error switching to tab:', err);
    }
  };

  const closeTab = async (tabId: number) => {
    try {
      await tabService.closeTab(tabId);
      await loadTabs();
    } catch (err) {
      console.error('Error closing tab:', err);
    }
  };

  return {
    tabs,
    loading,
    error,
    loadTabs,
    toggleFavorite,
    switchToTab,
    closeTab,
  };
};
