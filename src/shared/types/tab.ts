export interface Tab {
  id: number;
  url: string;
  title: string;
  favIconUrl?: string;
  lastUpdated: number;
  domain: string;
  isFavorite?: boolean;
  tags?: string[];
  visitCount: number;
  lastVisit: number;
}

export interface TabSpace {
  id: string;
  name: string;
  owner: string;
  participants: string[];
  settings: {
    permissions: {
      canEdit: string[];
      canView: string[];
      canControl: string[];
    };
    privacy: "private" | "public" | "team";
    maxParticipants: number;
  };
  createdAt: number;
  updatedAt: number;
}

export interface TabGroup {
  id: string;
  name: string;
  tabs: Tab[];
  color?: string;
  createdAt: number;
}
