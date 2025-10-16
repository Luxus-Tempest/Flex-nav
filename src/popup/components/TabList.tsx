import React from 'react';
import { Tab } from '../../shared/types/tab';
import { TabItem } from './TabItem';

interface TabListProps {
  tabs: Tab[];
  onTabClick: (tab: Tab) => void;
  onToggleFavorite: (tabId: number) => void;
  onCloseTab?: (tabId: number) => void;
}

export const TabList: React.FC<TabListProps> = ({ 
  tabs, 
  onTabClick, 
  onToggleFavorite,
  onCloseTab 
}) => {
  if (tabs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-gray-400 text-sm">No tabs found</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tabs.map((tab) => (
        <TabItem
          key={tab.id}
          tab={tab}
          onClick={() => onTabClick(tab)}
          onToggleFavorite={() => onToggleFavorite(tab.id)}
          onClose={onCloseTab ? () => onCloseTab(tab.id) : undefined}
        />
      ))}
    </div>
  );
};
