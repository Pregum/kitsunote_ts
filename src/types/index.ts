export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  bio: string;
  joinDate: Date;
  isPremium: boolean;
  savedPosts: string[];
  following: string[];
  followers: string[];
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  images: string[];
  tags: string[];
  location?: {
    name: string;
    lat: number;
    lng: number;
  };
  likes: number;
  comments: number;
  createdAt: Date;
}

export interface FoxLocation {
  id: string;
  name: string;
  description: string;
  type: 'shrine' | 'sanctuary' | 'statue' | 'museum' | 'other';
  address: string;
  lat: number;
  lng: number;
  images: string[];
  rating: number;
  reviews: number;
  website?: string;
}

export interface FoxMythology {
  id: string;
  userId: string;
  title: string;
  origin: string;
  period: string;
  description: string;
  images: string[];
  sources: string[];
  relatedLocations: string[];
}

export interface FoxMedia {
  id: string;
  userId: string;
  title: string;
  type: 'anime' | 'manga' | 'game' | 'book' | 'film' | 'art';
  creator: string;
  year: number;
  description: string;
  images: string[];
  tags: string[];
  links: {
    title: string;
    url: string;
  }[];
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
  likes: number;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}