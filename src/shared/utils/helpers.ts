import { Tab } from '../types/tab';

export const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return 'unknown';
  }
};

export const formatTimeAgo = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

export const sortTabsByRecent = (tabs: Tab[]): Tab[] => {
  return [...tabs].sort((a, b) => b.lastVisit - a.lastVisit);
};

export const groupTabsByDomain = (tabs: Tab[]): Record<string, Tab[]> => {
  return tabs.reduce((acc, tab) => {
    const domain = tab.domain;
    if (!acc[domain]) {
      acc[domain] = [];
    }
    acc[domain].push(tab);
    return acc;
  }, {} as Record<string, Tab[]>);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};
