import { Tab } from '../../shared/types/tab';
import { STORAGE_KEYS } from '../../shared/utils/constants';

export class TabService {
  async getAllTabs(): Promise<Tab[]> {
    const result = await chrome.storage.local.get([STORAGE_KEYS.TAB_TRACKER]);
    const tabData = result[STORAGE_KEYS.TAB_TRACKER] || {};
    return Object.values(tabData);
  }

  async getTabById(tabId: number): Promise<Tab | null> {
    const result = await chrome.storage.local.get([STORAGE_KEYS.TAB_TRACKER]);
    const tabData = result[STORAGE_KEYS.TAB_TRACKER] || {};
    return tabData[`tab_${tabId}`] || null;
  }

  async updateTab(tabId: number, updates: Partial<Tab>): Promise<void> {
    const result = await chrome.storage.local.get([STORAGE_KEYS.TAB_TRACKER]);
    const tabData = result[STORAGE_KEYS.TAB_TRACKER] || {};
    const tabKey = `tab_${tabId}`;
    
    if (tabData[tabKey]) {
      tabData[tabKey] = { ...tabData[tabKey], ...updates };
      await chrome.storage.local.set({ [STORAGE_KEYS.TAB_TRACKER]: tabData });
    }
  }

  async toggleFavorite(tabId: number): Promise<void> {
    const tab = await this.getTabById(tabId);
    if (tab) {
      await this.updateTab(tabId, { isFavorite: !tab.isFavorite });
    }
  }

  async switchToTab(tabId: number): Promise<void> {
    await chrome.tabs.update(tabId, { active: true });
  }

  async closeTab(tabId: number): Promise<void> {
    await chrome.tabs.remove(tabId);
  }

  async getCurrentTab(): Promise<chrome.tabs.Tab | null> {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab || null;
  }

  async searchTabs(query: string): Promise<Tab[]> {
    const allTabs = await this.getAllTabs();
    const lowerQuery = query.toLowerCase();
    
    return allTabs.filter(tab => 
      tab.title.toLowerCase().includes(lowerQuery) ||
      tab.url.toLowerCase().includes(lowerQuery) ||
      tab.domain.toLowerCase().includes(lowerQuery)
    );
  }

  async getTabsByDomain(domain: string): Promise<Tab[]> {
    const allTabs = await this.getAllTabs();
    return allTabs.filter(tab => tab.domain === domain);
  }
}

export const tabService = new TabService();
