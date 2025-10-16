import { AnalyticsEvent } from '../../shared/types/analytics';
import { STORAGE_KEYS } from '../../shared/utils/constants';

export class AnalyticsService {
  async trackEvent(type: string, data: Record<string, unknown>): Promise<void> {
    const event: AnalyticsEvent = {
      type,
      timestamp: Date.now(),
      data,
    };

    const result = await chrome.storage.local.get([STORAGE_KEYS.ANALYTICS]);
    const events = result[STORAGE_KEYS.ANALYTICS] || [];
    events.push(event);

    // Keep only last 1000 events
    if (events.length > 1000) {
      events.shift();
    }

    await chrome.storage.local.set({ [STORAGE_KEYS.ANALYTICS]: events });
  }

  async getEvents(limit?: number): Promise<AnalyticsEvent[]> {
    const result = await chrome.storage.local.get([STORAGE_KEYS.ANALYTICS]);
    const events = result[STORAGE_KEYS.ANALYTICS] || [];
    
    if (limit) {
      return events.slice(-limit);
    }
    
    return events;
  }

  async clearEvents(): Promise<void> {
    await chrome.storage.local.set({ [STORAGE_KEYS.ANALYTICS]: [] });
  }

  async getEventsByType(type: string): Promise<AnalyticsEvent[]> {
    const events = await this.getEvents();
    return events.filter(event => event.type === type);
  }
}

export const analyticsService = new AnalyticsService();
