import React from 'react';
import { storageService } from '../services/storageService';

export const ExportButton: React.FC = () => {
  const handleExport = async () => {
    try {
      const data = await storageService.exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tab-tracker-export-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting data:', err);
      alert('Failed to export data');
    }
  };

  const handleImport = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        await storageService.importData(text);
        alert('Data imported successfully!');
        window.location.reload();
      } catch (err) {
        console.error('Error importing data:', err);
        alert('Failed to import data');
      }
    };

    input.click();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExport}
        className="flex-1 px-4 py-2 bg-chatgpt-light hover:bg-chatgpt-hover 
                 text-white rounded-lg text-sm font-medium transition-all
                 border border-chatgpt-border"
      >
        📤 Export
      </button>
      <button
        onClick={handleImport}
        className="flex-1 px-4 py-2 bg-chatgpt-light hover:bg-chatgpt-hover 
                 text-white rounded-lg text-sm font-medium transition-all
                 border border-chatgpt-border"
      >
        📥 Import
      </button>
    </div>
  );
};
