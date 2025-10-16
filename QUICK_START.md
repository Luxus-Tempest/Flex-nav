# 🚀 Quick Start Guide

## Installation in 3 Steps

### 1️⃣ Setup
```bash
npm install
```

### 2️⃣ Build
```bash
npm run build
```

### 3️⃣ Load in Chrome
1. Open Chrome → `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `dist` folder

**Done!** 🎉 Click the Tab Tracker Pro icon in your toolbar.

---

## Features

- 🔍 **Search** - Find tabs instantly
- ⭐ **Favorites** - Mark important tabs
- 🎯 **Filters** - All, Favorites, Recent
- 📊 **Tracking** - Visit counts & timestamps
- 📤 **Export/Import** - Backup your data
- 🎨 **Beautiful UI** - ChatGPT-inspired design

---

## File Structure

```
dist/                 ← Load this folder in Chrome
├── popup.html       # Extension popup
├── popup.js         # React app bundle
├── background.js    # Service worker
├── content.js       # Content script
├── manifest.json    # Extension config
└── *.png           # Icons
```

---

## Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build extension
npm run lint         # Check code quality
npm run type-check   # Verify TypeScript
```

---

## Documentation

- 📖 [README.md](./README.md) - Overview
- 📦 [INSTALLATION.md](./INSTALLATION.md) - Detailed install guide
- 👨‍💻 [DEVELOPMENT.md](./DEVELOPMENT.md) - Developer guide
- ✅ [FINAL_SUMMARY.md](./FINAL_SUMMARY.md) - Complete summary

---

## Need Help?

See [INSTALLATION.md](./INSTALLATION.md) for troubleshooting.

---

**Tab Tracker Pro** - Transform your browsing! 🚀✨
