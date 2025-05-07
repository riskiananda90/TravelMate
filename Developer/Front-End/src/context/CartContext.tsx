
import React, { createContext, useState, useContext, useEffect } from 'react';
import { TujuanWisata } from '@/types';

interface BookingItem {
  destinasi: TujuanWisata;
  jumlahTiket: number;
  tanggalKunjungan: string;
}

interface CartContextType {
  bookings: BookingItem[];
  addBooking: (item: BookingItem) => void;
  removeBooking: (id: string | number) => void;
  updateBookingQuantity: (id: string | number, jumlah: number) => void;
  updateBookingDate: (id: string | number, tanggal: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<BookingItem[]>([]);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('travelBookings');
    if (savedBookings) {
      try {
        const parsedBookings = JSON.parse(savedBookings);
        setBookings(parsedBookings);
      } catch (error) {
        console.error("Error parsing bookings from localStorage:", error);
      }
    }
  }, []);

  // Save bookings to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('travelBookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (item: BookingItem) => {
    setBookings(prev => {
      const existingItemIndex = prev.findIndex(
        booking => booking.destinasi.id === item.destinasi.id
      );
      
      if (existingItemIndex >= 0) {
        const updatedBookings = [...prev];
        updatedBookings[existingItemIndex] = {
          ...updatedBookings[existingItemIndex],
          jumlahTiket: updatedBookings[existingItemIndex].jumlahTiket + item.jumlahTiket
        };
        return updatedBookings;
      }
      
      return [...prev, item];
    });
  };

  const removeBooking = (id: string | number) => {
    setBookings(prev => prev.filter(item => item.destinasi.id !== id));
  };

  const updateBookingQuantity = (id: string | number, jumlah: number) => {
    setBookings(prev => 
      prev.map(item => 
        item.destinasi.id === id 
          ? { ...item, jumlahTiket: jumlah } 
          : item
      )
    );
  };

  const updateBookingDate = (id: string | number, tanggal: string) => {
    setBookings(prev => 
      prev.map(item => 
        item.destinasi.id === id 
          ? { ...item, tanggalKunjungan: tanggal } 
          : item
      )
    );
  };

  const clearCart = () => {
    setBookings([]);
  };

  const getTotalPrice = () => {
    return bookings.reduce(
      (total, item) => total + item.destinasi.biaya.masuk * item.jumlahTiket, 
      0
    );
  };

  return (
    <CartContext.Provider value={{ 
      bookings, 
      addBooking, 
      removeBooking, 
      updateBookingQuantity, 
      updateBookingDate, 
      clearCart, 
      getTotalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
