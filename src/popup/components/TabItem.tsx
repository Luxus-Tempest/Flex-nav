import React from 'react';
import { Tab } from '../../shared/types/tab';
import { formatTimeAgo, truncateText } from '../../shared/utils/helpers';

interface TabItemProps {
  tab: Tab;
  onClick: () => void;
  onToggleFavorite: () => void;
  onClose?: () => void;
}

export const TabItem: React.FC<TabItemProps> = ({ 
  tab, 
  onClick, 
  onToggleFavorite,
  onClose 
}) => {
  return (
    <div
      className="group bg-chatgpt-light hover:bg-chatgpt-hover 
               rounded-lg p-3 cursor-pointer transition-all
               border border-transparent hover:border-chatgpt-border"
    >
      <div className="flex items-start gap-3">
        {/* Favicon */}
        <div className="flex-shrink-0 mt-0.5">
          {tab.favIconUrl ? (
            <img 
              src={tab.favIconUrl} 
              alt="" 
              className="w-5 h-5 rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center text-xs">
              🌐
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0" onClick={onClick}>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-sm mb-0.5 truncate">
                {truncateText(tab.title, 40)}
              </h3>
              <p className="text-gray-400 text-xs truncate">
                {tab.domain}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <span>👁 {tab.visitCount} visits</span>
            <span>•</span>
            <span>{formatTimeAgo(tab.lastVisit)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="p-1.5 rounded hover:bg-chatgpt-dark transition-colors"
            title={tab.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <span className="text-lg">
              {tab.isFavorite ? '⭐' : '☆'}
            </span>
          </button>
          {onClose && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-1.5 rounded hover:bg-chatgpt-dark transition-colors text-gray-400 hover:text-red-400"
              title="Close tab"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
