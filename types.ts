export interface User {
  email: string;
  name: string;
  token: string;
}

export interface GeoData {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string; // "lat,lng"
  org?: string;
  postal?: string;
  timezone?: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  data: GeoData;
}

export interface ApiError {
  message: string;
}
