// Simple background script without ES6 imports
const STORAGE_KEYS = {
  TAB_TRACKER: "tabActivityTracker",
  FAVORITES: "favorites",
  GROUPS: "tabGroups",
  PREFERENCES: "userPreferences",
  ANALYTICS: "analytics",
} as const;

const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return "unknown";
  }
};

interface Tab {
  id: number;
  url: string;
  title: string;
  favIconUrl?: string;
  lastUpdated: number;
  domain: string;
  isFavorite: boolean;
  tags: string[];
  visitCount: number;
  lastVisit: number;
}

class TabTracker {
  private tabData: Record<string, Tab> = {};

  async initialize() {
    console.log("Tab Tracker Pro initialized");

    // Load existing data
    const result = await chrome.storage.local.get([STORAGE_KEYS.TAB_TRACKER]);
    this.tabData = result[STORAGE_KEYS.TAB_TRACKER] || {};

    // Track existing tabs
    const tabs = await chrome.tabs.query({});
    tabs.forEach((tab) => this.trackTab(tab));
  }

  private async trackTab(chromeTab: chrome.tabs.Tab) {
    if (
      !chromeTab.id ||
      !chromeTab.url ||
      chromeTab.url.startsWith("chrome://")
    ) {
      return;
    }

    const tabKey = `tab_${chromeTab.id}`;
    const existingTab = this.tabData[tabKey];

    const tab: Tab = {
      id: chromeTab.id,
      url: chromeTab.url,
      title: chromeTab.title || "Untitled",
      favIconUrl: chromeTab.favIconUrl,
      lastUpdated: Date.now(),
      domain: extractDomain(chromeTab.url),
      isFavorite: existingTab?.isFavorite || false,
      tags: existingTab?.tags || [],
      visitCount: (existingTab?.visitCount || 0) + 1,
      lastVisit: Date.now(),
    };

    this.tabData[tabKey] = tab;
    await this.saveData();
  }

  private async saveData() {
    await chrome.storage.local.set({
      [STORAGE_KEYS.TAB_TRACKER]: this.tabData,
    });
  }

  async removeTab(tabId: number) {
    const tabKey = `tab_${tabId}`;
    delete this.tabData[tabKey];
    await this.saveData();
  }
}

const tracker = new TabTracker();

// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
  tracker.initialize();
});

// Track tab creation
chrome.tabs.onCreated.addListener(() => {
  tracker.initialize();
});

// Track tab updates
chrome.tabs.onUpdated.addListener((_tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    tracker.initialize();
  }
});

// Track tab activation
chrome.tabs.onActivated.addListener(() => {
  tracker.initialize();
});

// Clean up on tab close
chrome.tabs.onRemoved.addListener((tabId) => {
  tracker.removeTab(tabId);
});
