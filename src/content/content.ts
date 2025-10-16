// Content script for Tab Tracker Pro
// This script runs on web pages to track user interactions

class TabObserver {
  private startTime: number;
  private interactions: number = 0;

  constructor() {
    this.startTime = Date.now();
    this.setupListeners();
  }

  private setupListeners() {
    // Track clicks
    document.addEventListener('click', () => {
      this.interactions++;
      this.sendAnalytics();
    });

    // Track scroll
    let scrollTimeout: number;
    document.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        this.sendAnalytics();
      }, 1000);
    });

    // Send analytics on page unload
    window.addEventListener('beforeunload', () => {
      this.sendAnalytics();
    });
  }

  private sendAnalytics() {
    const timeSpent = Date.now() - this.startTime;
    const scrollDepth = this.getScrollDepth();

    chrome.runtime.sendMessage({
      type: 'TAB_ANALYTICS',
      data: {
        timeSpent,
        interactions: this.interactions,
        scrollDepth,
        url: window.location.href,
      },
    }).catch(() => {
      // Ignore errors if extension context is invalidated
    });
  }

  private getScrollDepth(): number {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    return Math.round(((scrollTop + windowHeight) / documentHeight) * 100);
  }
}

// Initialize observer
new TabObserver();

export {};
