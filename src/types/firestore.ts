import { Timestamp } from 'firebase/firestore';

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
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  images?: string[];
  likes: number;
  comments: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  tags: string[];
}

export interface Location {
  id: string;
  name: string;
  description: string;
  address: string;
  prefecture: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  images: string[];
  type: 'shrine' | 'temple' | 'spot' | 'other';
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Mythology {
  id: string;
  title: string;
  content: string;
  region: string;
  era?: string;
  images?: string[];
  references?: string[];
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
} 