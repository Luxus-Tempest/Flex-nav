# Developer Guide - Tab Tracker Pro

## 🏗️ Architecture Overview

Tab Tracker Pro is built using modern web technologies and follows Chrome Extension Manifest V3 specifications.

### Tech Stack

- **React 18**: UI framework with hooks for state management
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Chrome Extension APIs**: tabs, storage, runtime

### Project Structure

```
Flex-nav/
├── src/
│   ├── popup/              # Extension popup
│   │   ├── components/     # React components
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterTabs.tsx
│   │   │   ├── TabList.tsx
│   │   │   ├── TabItem.tsx
│   │   │   ├── ExportButton.tsx
│   │   │   └── FavoritesList.tsx
│   │   ├── hooks/          # Custom React hooks
│   │   │   ├── useTabs.ts
│   │   │   ├── useStorage.ts
│   │   │   └── useFavorites.ts
│   │   ├── services/       # Business logic
│   │   │   ├── tabService.ts
│   │   │   ├── storageService.ts
│   │   │   └── analyticsService.ts
│   │   ├── Popup.tsx       # Main popup component
│   │   ├── main.tsx        # React entry point
│   │   ├── index.html      # HTML template
│   │   └── index.css       # Global styles
│   ├── background/         # Background service worker
│   │   └── background.ts   # Tab tracking logic
│   ├── content/            # Content scripts
│   │   └── content.ts      # Page interaction tracking
│   └── shared/             # Shared code
│       ├── types/          # TypeScript type definitions
│       │   ├── tab.ts
│       │   ├── user.ts
│       │   └── analytics.ts
│       ├── utils/          # Utility functions
│       │   ├── constants.ts
│       │   ├── helpers.ts
│       │   └── validators.ts
│       └── services/       # Shared services (placeholder)
├── public/                 # Static assets
│   ├── manifest.json       # Extension manifest
│   └── icon-*.png         # Extension icons
├── dist/                   # Built extension (gitignored)
└── config files...
```

## 🔧 Key Components

### Background Service Worker

**File**: `src/background/background.ts`

The background service worker runs independently of the popup and tracks tabs in real-time.

```typescript
class TabTracker {
  // Tracks all open tabs
  private tabData: Record<string, Tab> = {};
  
  async initialize() {
    // Load existing data
    // Track current tabs
  }
  
  private async trackTab(chromeTab: chrome.tabs.Tab) {
    // Update tab information
    // Save to storage
  }
}
```

**Key Responsibilities**:
- Listen to tab events (created, updated, activated, removed)
- Maintain tab metadata (visit count, last visit time, domain)
- Persist data to Chrome storage

### Popup UI

**File**: `src/popup/Popup.tsx`

The main popup component that users interact with.

**Features**:
- Real-time tab search
- Category filters (All, Favorites, Recent)
- Tab list with actions
- Export/Import functionality

### Services Layer

#### TabService

Handles all tab-related operations:

```typescript
class TabService {
  async getAllTabs(): Promise<Tab[]>
  async getTabById(tabId: number): Promise<Tab | null>
  async updateTab(tabId: number, updates: Partial<Tab>): Promise<void>
  async toggleFavorite(tabId: number): Promise<void>
  async switchToTab(tabId: number): Promise<void>
  async closeTab(tabId: number): Promise<void>
}
```

#### StorageService

Abstracts Chrome storage operations:

```typescript
class StorageService {
  async get<T>(key: string): Promise<T | null>
  async set<T>(key: string, value: T): Promise<void>
  async remove(key: string): Promise<void>
  async exportData(): Promise<string>
  async importData(jsonData: string): Promise<void>
}
```

#### AnalyticsService

Tracks user interactions (for future features):

```typescript
class AnalyticsService {
  async trackEvent(type: string, data: Record<string, unknown>): Promise<void>
  async getEvents(limit?: number): Promise<AnalyticsEvent[]>
}
```

### Custom Hooks

#### useTabs

Main hook for tab state management:

```typescript
const {
  tabs,           // All tracked tabs
  loading,        // Loading state
  error,          // Error state
  loadTabs,       // Reload tabs
  toggleFavorite, // Toggle favorite status
  switchToTab,    // Switch to tab
  closeTab,       // Close tab
} = useTabs();
```

#### useStorage

Generic storage hook with type safety:

```typescript
const [value, setValue, loading] = useStorage<T>(key, defaultValue);
```

#### useFavorites

Specialized hook for favorites:

```typescript
const {
  favorites,      // Favorite tabs only
  loading,
  error,
  toggleFavorite,
  switchToTab,
} = useFavorites();
```

## 🎨 Styling Guidelines

### Tailwind Classes

The project uses custom Tailwind colors for the ChatGPT-inspired theme:

```javascript
// tailwind.config.js
colors: {
  'chatgpt-dark': '#202123',
  'chatgpt-light': '#343541',
  'chatgpt-hover': '#2a2b32',
  'chatgpt-border': '#4d4d4f',
  'chatgpt-accent': '#10a37f',
}
```

### Component Styling Patterns

```tsx
// Card-like components
<div className="bg-chatgpt-light hover:bg-chatgpt-hover 
               rounded-lg p-3 transition-all
               border border-transparent hover:border-chatgpt-border">

// Buttons
<button className="px-4 py-2 bg-chatgpt-accent text-white 
                   rounded-lg hover:bg-opacity-90 transition-all">

// Input fields
<input className="w-full px-4 py-2.5 bg-chatgpt-light text-white 
                 rounded-lg border border-chatgpt-border
                 focus:border-chatgpt-accent focus:outline-none">
```

## 🔌 Chrome Extension APIs

### Tabs API

```typescript
// Query tabs
const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

// Update tab
await chrome.tabs.update(tabId, { active: true });

// Remove tab
await chrome.tabs.remove(tabId);

// Listen to events
chrome.tabs.onCreated.addListener((tab) => { /* ... */ });
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { /* ... */ });
chrome.tabs.onRemoved.addListener((tabId) => { /* ... */ });
```

### Storage API

```typescript
// Save data
await chrome.storage.local.set({ key: value });

// Load data
const result = await chrome.storage.local.get(['key']);
const value = result.key;

// Listen to changes
chrome.storage.onChanged.addListener((changes, areaName) => {
  // Handle changes
});
```

## 🧪 Testing

### Manual Testing

1. **Build the extension**: `npm run build`
2. **Load in Chrome**: See INSTALLATION.md
3. **Test each feature**:
   - Tab tracking
   - Search
   - Filters
   - Favorites
   - Export/Import

### Debugging

**Popup Debugging**:
- Right-click the popup → Inspect
- Console logs appear in DevTools

**Background Script Debugging**:
- Go to `chrome://extensions/`
- Click "Inspect views: background page"
- Console logs appear in DevTools

**Content Script Debugging**:
- Open any webpage
- Open DevTools (F12)
- Content script logs appear in the page's console

### Common Issues

**TypeScript Errors**:
```bash
npm run type-check
```

**Linting Issues**:
```bash
npm run lint
```

## 📦 Build Process

The build process uses Vite with custom configuration:

1. **TypeScript Compilation**: `tsc` compiles all TypeScript files
2. **Vite Build**: Bundles the application
3. **Custom Plugin**: Copies and fixes `popup.html` paths

### Build Configuration

**vite.config.ts**:
```typescript
export default defineConfig({
  plugins: [react(), fixPopupHtmlPlugin()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/popup/index.html"),
        background: resolve(__dirname, "src/background/background.ts"),
        content: resolve(__dirname, "src/content/content.ts"),
      },
    },
  },
});
```

## 🚀 Adding New Features

### Adding a New Component

1. Create the component file in `src/popup/components/`
2. Define props interface
3. Implement the component with TypeScript
4. Style with Tailwind classes
5. Export and use in parent component

Example:
```typescript
// src/popup/components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  onClick: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <div className="bg-chatgpt-light p-4 rounded-lg">
      <h3 className="text-white">{title}</h3>
      <button onClick={onClick} className="mt-2 px-4 py-2 bg-chatgpt-accent rounded">
        Click me
      </button>
    </div>
  );
};
```

### Adding a New Service

1. Create service file in `src/popup/services/` or `src/shared/services/`
2. Define service class
3. Export singleton instance
4. Use in components via hooks

Example:
```typescript
// src/popup/services/myService.ts
export class MyService {
  async doSomething(): Promise<void> {
    // Implementation
  }
}

export const myService = new MyService();
```

### Adding a New Hook

1. Create hook file in `src/popup/hooks/`
2. Follow React hooks naming convention (`use...`)
3. Use existing services
4. Return useful state and functions

Example:
```typescript
// src/popup/hooks/useMyFeature.ts
import { useState, useEffect } from 'react';
import { myService } from '../services/myService';

export const useMyFeature = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const result = await myService.doSomething();
      setData(result);
      setLoading(false);
    };
    load();
  }, []);

  return { data, loading };
};
```

## 📝 Code Style

### TypeScript

- Use interfaces for object shapes
- Use type aliases for unions/intersections
- Enable strict mode
- Avoid `any` type

### React

- Functional components only
- Use hooks for state management
- Props destructuring in function signature
- Explicit return types for clarity

### Naming Conventions

- Components: PascalCase (`TabList.tsx`)
- Hooks: camelCase with 'use' prefix (`useTabs.ts`)
- Services: camelCase class, exported singleton (`tabService`)
- Files: Match the main export name
- CSS classes: Tailwind utilities

## 🔄 Version Management

Follow semantic versioning (semver):

- **MAJOR**: Breaking changes
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes

Update version in:
- `package.json`
- `public/manifest.json`

## 📚 Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

---

**Happy coding!** 🚀
