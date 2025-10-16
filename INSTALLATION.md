# Installation Guide - Tab Tracker Pro

## 📦 Quick Start

### Prerequisites

- Node.js 18+ and npm installed
- Google Chrome browser
- Git (for cloning the repository)

### Step 1: Clone and Setup

```bash
# Clone the repository
git clone https://github.com/Luxus-Tempest/Flex-nav.git
cd Flex-nav

# Install dependencies
npm install
```

### Step 2: Build the Extension

```bash
# Build for production
npm run build
```

This will create a `dist` folder with the compiled extension.

### Step 3: Load Extension in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle switch in the top-right corner)
4. Click **Load unpacked**
5. Select the `dist` folder from your project directory
6. The Tab Tracker Pro extension should now appear in your extensions list

### Step 4: Pin the Extension

1. Click the puzzle piece icon (🧩) in Chrome's toolbar
2. Find "Tab Tracker Pro" in the list
3. Click the pin icon (📌) to pin it to your toolbar
4. Click the Tab Tracker Pro icon to open the popup

## 🔧 Development Mode

For active development with hot reload:

```bash
# Start development server
npm run dev
```

**Note**: For Chrome extensions, you'll still need to run `npm run build` and reload the extension manually in Chrome after making changes, as Vite's hot reload doesn't work directly with Chrome extensions.

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build extension for production |
| `npm run lint` | Run ESLint on all TypeScript/TSX files |
| `npm run type-check` | Run TypeScript type checking without emitting files |

## 🔍 Verifying the Build

After building, your `dist` folder should contain:

```
dist/
├── background.js      # Background service worker
├── content.js         # Content script
├── popup.js          # Popup JavaScript
├── popup.html        # Popup HTML
├── index.css         # Styles
├── manifest.json     # Extension manifest
├── icon-16.png       # Extension icons
├── icon-48.png
└── icon-128.png
```

## 🐛 Troubleshooting

### Extension Not Loading

**Problem**: Chrome shows an error when loading the extension.

**Solution**: 
- Make sure you selected the `dist` folder, not the root project folder
- Check that `npm run build` completed without errors
- Look at the error message in Chrome's extensions page for specific issues

### Build Fails

**Problem**: `npm run build` fails with errors.

**Solution**:
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Make sure you're using Node.js 18 or later: `node --version`
- Check for TypeScript errors: `npm run type-check`

### Popup Doesn't Show Tabs

**Problem**: The extension loads but doesn't show any tabs.

**Solution**:
- Browse to a few websites first to generate tab data
- The extension only tracks tabs that were opened after the extension was installed
- Check the browser console for any errors (right-click popup → Inspect)

### Styles Not Applied

**Problem**: The popup appears but styles are not applied correctly.

**Solution**:
- Make sure `index.css` is in the `dist` folder
- Check that `popup.html` has the correct CSS link
- Try rebuilding: `npm run build`

## 🔄 Reloading After Changes

After making code changes:

1. Run `npm run build`
2. Go to `chrome://extensions/`
3. Click the refresh icon (🔄) on the Tab Tracker Pro extension card
4. Close and reopen the extension popup

## 📦 Building for Distribution

To create a production build for distribution:

1. Run `npm run build`
2. Zip the `dist` folder:
   ```bash
   cd dist
   zip -r tab-tracker-pro.zip .
   ```
3. The `tab-tracker-pro.zip` file can be uploaded to the Chrome Web Store

## 🔐 Permissions Explained

The extension requests the following permissions:

- **tabs**: Required to access information about open tabs
- **storage**: Required to save tab tracking data locally
- **activeTab**: Required to interact with the currently active tab

All data is stored locally on your device. No data is sent to external servers.

## 📱 Testing the Extension

### Test Checklist

- [ ] Extension loads without errors
- [ ] Popup opens when clicking the extension icon
- [ ] Tabs are tracked and displayed in the popup
- [ ] Search functionality works
- [ ] Filters (All, Favorites, Recent) work correctly
- [ ] Clicking a tab in the list switches to that tab
- [ ] Favorite/unfavorite functionality works
- [ ] Export/Import data works
- [ ] Closing tabs from the popup works

### Manual Testing Steps

1. **Tab Tracking**:
   - Open several tabs
   - Open the extension popup
   - Verify all tabs are listed

2. **Search**:
   - Type in the search box
   - Verify tabs are filtered in real-time

3. **Favorites**:
   - Click the star icon on a tab
   - Click the "Favorites" filter
   - Verify only favorited tabs appear

4. **Export/Import**:
   - Click "Export" button
   - Download should start with JSON file
   - Click "Import" and select the exported file
   - Data should be restored

## 🆘 Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/Luxus-Tempest/Flex-nav/issues)
2. Open a new issue with:
   - Your Chrome version
   - Node.js version
   - Steps to reproduce the problem
   - Any error messages from the console

## 🔄 Updating the Extension

When a new version is released:

1. Pull the latest changes:
   ```bash
   git pull origin main
   ```

2. Reinstall dependencies (if package.json changed):
   ```bash
   npm install
   ```

3. Rebuild the extension:
   ```bash
   npm run build
   ```

4. Reload the extension in Chrome (see "Reloading After Changes" above)

---

**Happy tracking!** 🚀
