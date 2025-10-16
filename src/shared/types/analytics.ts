export interface AnalyticsEvent {
  type: string;
  timestamp: number;
  data: Record<string, unknown>;
}

export interface TabAnalytics {
  tabId: number;
  timeSpent: number;
  interactions: number;
  scrollDepth: number;
}
