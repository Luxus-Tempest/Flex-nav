# Tab Tracker Pro - Chrome Extension

A modern Chrome extension built with React + TypeScript and Tailwind CSS, featuring a ChatGPT-inspired design with black and grey tones.

## 🚀 Features

- **Tab Tracking**: Automatically tracks all your browser tabs with visit counts and timestamps
- **Smart Search**: Real-time search across tab titles, URLs, and domains
- **Favorites System**: Mark and filter your favorite tabs for quick access
- **Filters**: View all tabs, favorites only, or recent tabs (last 24 hours)
- **Modern UI**: ChatGPT-inspired dark theme with smooth animations
- **Export/Import**: Backup and restore your tab data
- **Tab Management**: Close tabs directly from the extension popup

## 🛠️ Technologies

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Chrome APIs**: Tabs API, Storage API, Runtime API
- **Architecture**: Chrome Extension Manifest V3

## 📦 Installation

### For Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Luxus-Tempest/Flex-nav.git
   cd Flex-nav
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist` folder from this project

### For Production

Download the latest release from the Chrome Web Store (coming soon).

## 🔧 Development

- **Dev Mode**: `npm run dev` (starts Vite development server)
- **Build**: `npm run build` (compiles and bundles the extension)
- **Lint**: `npm run lint` (runs ESLint)
- **Type Check**: `npm run type-check` (runs TypeScript type checking)

## 📁 Project Structure

```
Flex-nav/
├── public/
│   ├── manifest.json      # Chrome extension manifest
│   └── icon-*.png         # Extension icons
├── src/
│   ├── popup/             # Extension popup UI
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # Service layer
│   │   ├── Popup.tsx      # Main popup component
│   │   ├── main.tsx       # Entry point
│   │   ├── index.html     # Popup HTML
│   │   └── index.css      # Popup styles
│   ├── background/        # Background service worker
│   │   └── background.ts  # Tab tracking logic
│   ├── content/           # Content scripts
│   │   └── content.ts     # Page interaction tracking
│   └── shared/            # Shared code
│       ├── types/         # TypeScript types
│       ├── utils/         # Utility functions
│       └── services/      # Shared services
├── dist/                  # Built extension (generated)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🎨 Design System

The extension uses a ChatGPT-inspired color scheme:

- **Background**: `#202123` (chatgpt-dark)
- **Surface**: `#343541` (chatgpt-light)
- **Hover**: `#2a2b32` (chatgpt-hover)
- **Border**: `#4d4d4f` (chatgpt-border)
- **Accent**: `#10a37f` (chatgpt-accent)

## 📊 Key Components

### Popup Components

- **SearchBar**: Real-time tab search
- **FilterTabs**: Filter tabs by category (All, Favorites, Recent)
- **TabList**: Display tabs with visit counts and actions
- **TabItem**: Individual tab card with favicon, title, and domain
- **ExportButton**: Export/import data functionality
- **FavoritesList**: Dedicated favorites view

### Services

- **TabService**: Tab management operations
- **StorageService**: Chrome storage abstraction
- **AnalyticsService**: Event tracking

### Hooks

- **useTabs**: Tab state management
- **useStorage**: Generic storage hook
- **useFavorites**: Favorites-specific logic

## 🔐 Permissions

The extension requires the following permissions:

- `tabs`: Access to browser tabs
- `storage`: Local storage for tab data
- `activeTab`: Interact with the current tab

## 📈 Future Features

See [CAHIER-DES-CHARGES-COMPLET.md](./CAHIER-DES-CHARGES-COMPLET.md) for the complete roadmap including:

- TabSpaces (collaborative browsing)
- TabControl (remote control)
- TabStream (session streaming)
- AI-powered features
- Advanced analytics
- And much more!

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Tab Tracker Pro** - Transform your browsing experience! 🚀✨
