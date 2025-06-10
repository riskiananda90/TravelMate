
import React, { createContext, useState, useContext, useEffect } from 'react';
import { TujuanWisata } from '@/types';

interface WishlistContextType {
  wishlist: TujuanWisata[];
  addToWishlist: (destinasi: TujuanWisata) => void;
  removeFromWishlist: (id: string | number) => void;
  isInWishlist: (id: string | number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<TujuanWisata[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('travelWishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlist(parsedWishlist);
      } catch (error) {
        console.error("Error parsing wishlist from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('travelWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (destinasi: TujuanWisata) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === destinasi.id)) {
        return prev;
      }
      return [...prev, destinasi];
    });
  };

  const removeFromWishlist = (id: string | number) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id: string | number) => {
    return wishlist.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
