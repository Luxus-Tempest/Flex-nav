export class StorageService {
  async get<T>(key: string): Promise<T | null> {
    const result = await chrome.storage.local.get([key]);
    return result[key] || null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    await chrome.storage.local.set({ [key]: value });
  }

  async remove(key: string): Promise<void> {
    await chrome.storage.local.remove(key);
  }

  async clear(): Promise<void> {
    await chrome.storage.local.clear();
  }

  async getAll(): Promise<Record<string, unknown>> {
    return await chrome.storage.local.get(null);
  }

  async exportData(): Promise<string> {
    const data = await this.getAll();
    return JSON.stringify(data, null, 2);
  }

  async importData(jsonData: string): Promise<void> {
    const data = JSON.parse(jsonData);
    await chrome.storage.local.set(data);
  }
}

export const storageService = new StorageService();
