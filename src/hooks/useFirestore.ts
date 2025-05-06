import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Post, Location, Mythology } from '../types/firestore';

export const useRecentPosts = (limit: number = 4) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('createdAt', 'desc'), limit(limit));
        const querySnapshot = await getDocs(q);
        
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Post[];
        
        setPosts(fetchedPosts);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit]);

  return { posts, loading, error };
};

export const useFeaturedLocations = (limit: number = 3) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsRef = collection(db, 'locations');
        const q = query(locationsRef, limit(limit));
        const querySnapshot = await getDocs(q);
        
        const fetchedLocations = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Location[];
        
        setLocations(fetchedLocations);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [limit]);

  return { locations, loading, error };
};

export const useMythology = (limit: number = 3) => {
  const [mythology, setMythology] = useState<Mythology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMythology = async () => {
      try {
        const mythologyRef = collection(db, 'mythology');
        const q = query(mythologyRef, limit(limit));
        const querySnapshot = await getDocs(q);
        
        const fetchedMythology = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Mythology[];
        
        setMythology(fetchedMythology);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMythology();
  }, [limit]);

  return { mythology, loading, error };
}; 