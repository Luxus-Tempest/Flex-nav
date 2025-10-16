import { useState, useMemo } from 'react';
import { SearchBar } from './components/SearchBar';
import { FilterTabs } from './components/FilterTabs';
import { TabList } from './components/TabList';
import { ExportButton } from './components/ExportButton';
import { useTabs } from './hooks/useTabs';
import { sortTabsByRecent } from '../shared/utils/helpers';

function Popup() {
  const { tabs, loading, toggleFavorite, switchToTab, closeTab } = useTabs();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'favorites' | 'recent'>('all');

  const filteredTabs = useMemo(() => {
    let filtered = tabs;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tab) =>
          tab.title.toLowerCase().includes(query) ||
          tab.url.toLowerCase().includes(query) ||
          tab.domain.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (activeFilter === 'favorites') {
      filtered = filtered.filter((tab) => tab.isFavorite);
    } else if (activeFilter === 'recent') {
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
      filtered = filtered.filter((tab) => tab.lastVisit > oneDayAgo);
    }

    // Sort by most recent
    return sortTabsByRecent(filtered);
  }, [tabs, searchQuery, activeFilter]);

  if (loading) {
    return (
      <div className="w-[480px] h-[600px] bg-chatgpt-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-5xl mb-4">⏳</div>
          <p className="text-gray-400">Loading tabs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[480px] h-[600px] bg-chatgpt-dark text-white flex flex-col">
      {/* Header */}
      <div className="bg-chatgpt-light border-b border-chatgpt-border p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-chatgpt-accent to-green-600 rounded-lg flex items-center justify-center text-xl">
              📑
            </div>
            <div>
              <h1 className="text-lg font-bold">Tab Tracker Pro</h1>
              <p className="text-xs text-gray-400">{tabs.length} tabs tracked</p>
            </div>
          </div>
        </div>
        
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery}
          placeholder="Search tabs..."
        />
      </div>

      {/* Filters */}
      <div className="px-4 py-3 bg-chatgpt-light border-b border-chatgpt-border">
        <FilterTabs 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Tab List */}
      <div className="flex-1 overflow-y-auto p-4">
        <TabList
          tabs={filteredTabs}
          onTabClick={(tab) => switchToTab(tab.id)}
          onToggleFavorite={toggleFavorite}
          onCloseTab={closeTab}
        />
      </div>

      {/* Footer */}
      <div className="bg-chatgpt-light border-t border-chatgpt-border p-4">
        <ExportButton />
      </div>
    </div>
  );
}

export default Popup;
