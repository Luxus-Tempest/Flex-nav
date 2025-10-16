export const STORAGE_KEYS = {
  TAB_TRACKER: 'tabActivityTracker',
  FAVORITES: 'favorites',
  GROUPS: 'tabGroups',
  PREFERENCES: 'userPreferences',
  ANALYTICS: 'analytics',
} as const;

export const MAX_FREE_TABS = 100;
export const MAX_FREE_SPACES = 3;

export const THEME_COLORS = {
  dark: '#202123',
  light: '#343541',
  hover: '#2a2b32',
  border: '#4d4d4f',
  accent: '#10a37f',
  grey: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const;
