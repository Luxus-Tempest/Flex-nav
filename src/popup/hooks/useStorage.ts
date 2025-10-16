import { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

export const useStorage = <T,>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const stored = await storageService.get<T>(key);
        if (stored !== null) {
          setValue(stored);
        }
      } catch (err) {
        console.error('Error loading from storage:', err);
      } finally {
        setLoading(false);
      }
    };

    loadValue();
  }, [key]);

  const updateValue = async (newValue: T) => {
    try {
      await storageService.set(key, newValue);
      setValue(newValue);
    } catch (err) {
      console.error('Error saving to storage:', err);
    }
  };

  return [value, updateValue, loading] as const;
};
