
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatRupiah } from '@/utils/calculations';
import { useLocation } from '@/hooks/use-location';
import { motion } from 'framer-motion';
import { Heart, Trash, ChevronLeft, Image, Calendar, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { EmptyState } from '@/components/EmptyState';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const removeItem = (id: string | number) => {
    removeFromWishlist(id);
    toast({
      title: "Item dihapus",
      description: "Destinasi berhasil dihapus dari wishlist.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-travel-50 dark:bg-slate-900">
      <NavBar userLocation={location} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="mr-2"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft size={16} className="mr-1" />
              Kembali
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-travel-800 dark:text-travel-100">
              Wishlist Saya
            </h1>
          </div>
          <div className="flex items-center">
            <Heart className="text-red-500 fill-red-500 mr-2" size={20} />
            <span className="text-travel-700 dark:text-travel-300 font-medium">
              {wishlist.length} destinasi
            </span>
          </div>
        </div>
        
        <Separator className="mb-6" />
        
        {wishlist.length === 0 ? (
          <EmptyState 
            icon={Heart}
            title="Wishlist Anda Kosong"
            description="Jelajahi destinasi wisata dan tambahkan ke wishlist Anda."
            action={
              <Button 
                onClick={() => navigate('/')}
                className="bg-travel-600 hover:bg-travel-700 text-white"
              >
                Jelajahi Destinasi
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((destinasi) => (
              <motion.div 
                key={destinasi.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden h-full flex flex-col border-travel-200 dark:border-slate-700 hover:border-travel-400 dark:hover:border-travel-500">
                  <div className="relative h-48">
                    <img 
                      src={destinasi.gambar} 
                      alt={destinasi.nama} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => removeItem(destinasi.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                  
                  <CardContent className="p-4 flex-grow">
                    <h3 className="font-bold text-lg text-travel-800 dark:text-travel-100">
                      {destinasi.nama}
                    </h3>
                    
                    <div className="flex items-center text-travel-600 dark:text-travel-400 text-sm mt-2">
                      <MapPin size={14} className="mr-1" />
                      <span className="truncate">{destinasi.lokasi.alamat.split(',')[0]}</span>
                    </div>
                    
                    <p className="text-travel-600 dark:text-travel-400 text-sm mt-2 line-clamp-2">
                      {destinasi.deskripsi}
                    </p>
                    
                    <div className="mt-4 font-medium">
                      <p className="text-travel-700 dark:text-travel-300">Tiket Masuk:</p>
                      <p className="text-travel-800 dark:text-travel-100 text-lg">{formatRupiah(destinasi.biaya.masuk)}</p>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0 flex gap-2 justify-between">
                    <Button
                      className="flex-1 bg-travel-600 hover:bg-travel-700 text-white"
                      onClick={() => navigate(`/destinasi/${destinasi.id}`)}
                    >
                      Lihat Detail
                    </Button>
                    <Button
                      className="flex-1 bg-yogya-500 hover:bg-yogya-600 text-white"
                      onClick={() => navigate(`/booking/${destinasi.id}`)}
                    >
                      Pesan Tiket
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
