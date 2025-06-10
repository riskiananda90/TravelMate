
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { destinasiWisata } from '@/data/destinations'; 
import { formatRupiah, calculateDistance } from '@/utils/calculations';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PetaLokasi from '@/components/PetaLokasi';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/hooks/use-location';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  DollarSign, 
  ChevronLeft,
  Trees,
  Mountain,
  MessageSquare,
  Navigation,
  CloudRain,
  Sun,
  Heart,
  ShoppingCart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import { Separator } from '@/components/ui/separator';
import KomentarDestinasi from '@/components/KomentarDestinasi';

const DetailDestinasi = () => {
  const { id } = useParams<{ id: string }>();
  const [destinasi, setDestinasi] = useState(destinasiWisata.find(d => d.id.toString() === id));
  const lokasi = useLocation();
  const { theme } = useTheme();
  const [weather, setWeather] = useState<'sunny' | 'rainy' | 'cloudy' | 'mixed'>('sunny');
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get wishlist and cart functionality
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addBooking } = useCart();
  
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundDestinasi = destinasiWisata.find(d => d.id.toString() === id);
      if (foundDestinasi) {
        setDestinasi(foundDestinasi);
        // Check if item is in wishlist
        if (isInWishlist) {
          setIsInWishlistState(isInWishlist(foundDestinasi.id));
        }
      }
    }
  }, [id, isInWishlist]);

  // Efek untuk menghitung cuaca (simulasi)
  useEffect(() => {
    const weatherTypes: ('sunny' | 'rainy' | 'cloudy' | 'mixed')[] = ['sunny', 'rainy', 'cloudy', 'mixed'];
    const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    setWeather(randomWeather);
  }, []);

  // Simulasi perhitungan jarak jika lokasi pengguna tersedia
  useEffect(() => {
    if (lokasi.loaded && !lokasi.error && destinasi) {
      const jarak = calculateDistance(
        lokasi.latitude,
        lokasi.longitude,
        destinasi.lokasi.latitude,
        destinasi.lokasi.longitude
      );
      
      setDestinasi({
        ...destinasi,
        jarak: Math.round(jarak * 10) / 10
      });
    }
  }, [lokasi, destinasi]);

  const bukaMapDireksi = () => {
    if (destinasi) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${destinasi.lokasi.latitude},${destinasi.lokasi.longitude}`;
      window.open(url, '_blank');
    }
  };
  
  const handleToggleWishlist = () => {
    if (!destinasi) return;
    
    if (isInWishlistState) {
      removeFromWishlist(destinasi.id);
      setIsInWishlistState(false);
      toast({
        title: "Dihapus dari Wishlist",
        description: `${destinasi.nama} telah dihapus dari wishlist.`,
        variant: "default",
      });
    } else {
      addToWishlist(destinasi);
      setIsInWishlistState(true);
      toast({
        title: "Ditambahkan ke Wishlist",
        description: `${destinasi.nama} telah ditambahkan ke wishlist.`,
        variant: "default",
      });
    }
  };
  
  const handlePesanTiket = () => {
    if (destinasi) {
      navigate(`/booking/${destinasi.id}`);
    }
  };

  if (!destinasi) {
    return (
      <div className="min-h-screen flex flex-col bg-travel-50 dark:bg-slate-900">
        <NavBar userLocation={lokasi} />
        
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-travel-800 dark:text-travel-100">Destinasi tidak ditemukan</h2>
            <p className="text-travel-600 dark:text-travel-300 mt-2">Maaf, destinasi yang Anda cari tidak tersedia</p>
            <Button 
              className="mt-4 bg-travel-600 hover:bg-travel-700 text-white"
              onClick={() => navigate('/')}
            >
              <ChevronLeft size={16} className="mr-1" />
              Kembali
            </Button>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  // Fungsi untuk menampilkan ikon cuaca sesuai kondisi
  const renderWeatherIcon = () => {
    switch(weather) {
      case 'sunny':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'rainy':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'cloudy':
        return <Trees className="w-5 h-5 text-gray-500" />; // Ganti dengan ikon cloud
      case 'mixed':
        return <Star className="w-5 h-5 text-orange-500" />; // Ganti dengan ikon cloudsun
      default:
        return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  // Terjemahan cuaca ke bahasa Indonesia
  const weatherInIndonesian = () => {
    switch(weather) {
      case 'sunny': return 'Cerah';
      case 'rainy': return 'Hujan';
      case 'cloudy': return 'Berawan';
      case 'mixed': return 'Berawan Sebagian';
      default: return 'Cerah';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-travel-50 dark:bg-slate-900 ${theme}`}>
      <NavBar userLocation={lokasi} />
      
      <main className="flex-grow">
        {/* Header dengan gambar latar belakang */}
        <div className="relative h-[300px] md:h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          
          <img
            src={destinasi.gambar}
            alt={destinasi.nama}
            className="w-full h-full object-cover"
          />
          
          {/* Elemen dekoratif tema alam */}
          <img 
            src="/additional/overlay-trees.png" 
            alt="" 
            className="absolute bottom-0 w-full h-1/4 object-cover opacity-40"
          />
          
          <div className="absolute top-4 left-4 z-20">
            <Button 
              variant="ghost" 
              size="sm"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft size={16} className="mr-1" />
              Kembali
            </Button>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 z-20">
            <div className="container mx-auto">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {destinasi.nama}
              </motion.h1>
              
              <motion.div 
                className="flex flex-wrap items-center gap-3 md:gap-4 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{destinasi.lokasi.alamat.split(',')[0]}</span>
                </div>
                
                <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                  <Star size={16} className="mr-1 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm">{destinasi.rating}</span>
                </div>
                
                <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                  {renderWeatherIcon()}
                  <span className="text-sm ml-1">{weatherInIndonesian()}</span>
                </div>
                
                {destinasi.jarak !== undefined && (
                  <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm">{destinasi.jarak} km dari Anda</span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Konten Utama */}
            <div className="md:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-travel-100 dark:border-slate-700"
              >
                <h2 className="text-2xl font-bold mb-4 text-travel-800 dark:text-travel-100">
                  Tentang {destinasi.nama}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {destinasi.deskripsi}
                </p>
                
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="w-full grid grid-cols-3 mb-6">
                    <TabsTrigger value="info">Informasi</TabsTrigger>
                    <TabsTrigger value="lokasi">Lokasi</TabsTrigger>
                    <TabsTrigger value="fasilitas">Fasilitas</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-start p-3 bg-travel-50 dark:bg-slate-700/50 rounded-lg">
                        <Calendar className="w-5 h-5 text-travel-600 dark:text-travel-300 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-travel-800 dark:text-travel-100">
                            Waktu Kunjungan Terbaik
                          </p>
                          <p className="text-sm text-travel-600 dark:text-travel-300">
                            {destinasi.waktuTerbaikUntukMengunjungi || "Sepanjang tahun"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start p-3 bg-travel-50 dark:bg-slate-700/50 rounded-lg">
                        <Clock className="w-5 h-5 text-travel-600 dark:text-travel-300 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-travel-800 dark:text-travel-100">
                            Jam Operasional
                          </p>
                          <p className="text-sm text-travel-600 dark:text-travel-300">
                            {destinasi.jamBuka || "09:00 - 17:00"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start p-3 bg-travel-50 dark:bg-slate-700/50 rounded-lg">
                        <DollarSign className="w-5 h-5 text-travel-600 dark:text-travel-300 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-travel-800 dark:text-travel-100">
                            Tiket Masuk
                          </p>
                          <p className="text-sm text-travel-600 dark:text-travel-300">
                            {formatRupiah(destinasi.biaya.masuk)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start p-3 bg-travel-50 dark:bg-slate-700/50 rounded-lg">
                        <Mountain className="w-5 h-5 text-travel-600 dark:text-travel-300 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-travel-800 dark:text-travel-100">
                            Kategori
                          </p>
                          <p className="text-sm text-travel-600 dark:text-travel-300">
                            {destinasi.kategori || "Tempat Wisata"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="lokasi">
                    <div className="space-y-4">
                      <div className="flex flex-col items-center">
                        <Button 
                          onClick={() => setShowMap(!showMap)}
                          className="mb-3 bg-travel-600 hover:bg-travel-700 text-white"
                        >
                          {showMap ? "Sembunyikan Peta" : "Lihat Peta Lokasi"}
                        </Button>
                        
                        {showMap && destinasi && (
                          <div className="w-full h-[300px] rounded-lg overflow-hidden">
                            <PetaLokasi 
                              destinationLat={destinasi.lokasi.latitude} 
                              destinationLng={destinasi.lokasi.longitude} 
                              destinationName={destinasi.nama}
                            />
                          </div>
                        )}
                      </div>

                      <div className="bg-travel-50 dark:bg-slate-700/50 p-4 rounded-lg text-center">
                        <div>
                          <MapPin className="w-8 h-8 text-travel-400 dark:text-travel-500 mx-auto mb-3" />
                          <p className="text-travel-700 dark:text-travel-300 mb-1">Koordinat Lokasi</p>
                          <p className="text-sm text-travel-600 dark:text-travel-400">
                            {destinasi.lokasi.latitude}, {destinasi.lokasi.longitude}
                          </p>
                          
                          <div className="flex flex-col sm:flex-row gap-2 mt-4 justify-center">
                            <Button 
                              className="bg-travel-600 hover:bg-travel-700 text-white"
                              onClick={() => window.open(`https://maps.google.com/?q=${destinasi.lokasi.latitude},${destinasi.lokasi.longitude}`, '_blank')}
                            >
                              Lihat di Google Maps
                            </Button>
                            
                            <Button 
                              className="bg-green-600 hover:bg-green-700 text-white flex items-center"
                              onClick={bukaMapDireksi}
                            >
                              <Navigation className="mr-2 h-4 w-4" />
                              Arahkan ke Sini
                            </Button>
                          </div>
                          
                          {destinasi.jarak !== undefined && (
                            <div className="mt-3 p-2 bg-travel-100 dark:bg-slate-700 rounded-lg inline-block">
                              <p className="text-travel-800 dark:text-travel-200">
                                Jarak dari lokasi Anda: <span className="font-bold">{destinasi.jarak} km</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="fasilitas">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Toilet', 'Tempat Parkir', 'Tempat Ibadah', 'Tempat Makan', 'Toko Souvenir', 'Area Foto'].map((facility) => (
                        <div key={facility} className="flex items-center p-3 bg-travel-50 dark:bg-slate-700/50 rounded-lg">
                          <Trees className="w-4 h-4 text-travel-500 dark:text-travel-400 mr-2" />
                          <span className="text-sm text-travel-700 dark:text-travel-300">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
              
              {/* Bagian Galeri Foto */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-travel-100 dark:border-slate-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-travel-800 dark:text-travel-100">Galeri Foto</h2>
                  <Button variant="outline" className="text-travel-700 dark:text-travel-300 border-travel-200 dark:border-travel-700">
                    <span className="mr-1">Lihat Semua</span>
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={destinasi.gambar} 
                      alt={destinasi.nama} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={`/additional/${destinasi.id}-1.jpg`} 
                      alt={destinasi.nama} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={`/additional/${destinasi.id}-2.jpg`} 
                      alt={destinasi.nama} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>
              </motion.div>
              
              {/* Bagian Ulasan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-travel-100 dark:border-slate-700"
              >
                <h2 className="text-2xl font-bold mb-2 text-travel-800 dark:text-travel-100 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-travel-600 dark:text-travel-400" />
                  Ulasan Pengunjung
                </h2>
                <p className="text-travel-600 dark:text-travel-400 mb-6">
                  Bagikan pengalaman Anda dan baca ulasan dari pengunjung lainnya
                </p>
                
                <KomentarDestinasi komentar={destinasi.komentar || []} destinasiId={destinasi.id} />
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-travel-100 dark:border-slate-700 sticky top-20"
              >
                <h3 className="text-xl font-bold mb-4 text-travel-800 dark:text-travel-100">
                  Rencanakan Kunjungan Anda
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-2 border-b border-travel-100 dark:border-slate-700">
                    <span className="text-travel-700 dark:text-travel-300">Tiket Masuk</span>
                    <span className="font-medium text-travel-800 dark:text-travel-100">{formatRupiah(destinasi.biaya.masuk)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-travel-100 dark:border-slate-700">
                    <span className="text-travel-700 dark:text-travel-300">Biaya Makanan (rata-rata)</span>
                    <span className="font-medium text-travel-800 dark:text-travel-100">{formatRupiah(destinasi.biaya.makanan)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-travel-100 dark:border-slate-700">
                    <span className="text-travel-700 dark:text-travel-300">Biaya Penginapan</span>
                    <span className="font-medium text-travel-800 dark:text-travel-100">{formatRupiah(destinasi.biaya.penginapan)}</span>
                  </div>
                  
                  {destinasi.biayaPerjalanan && (
                    <div className="flex justify-between items-center pb-2 border-b border-travel-100 dark:border-slate-700">
                      <span className="text-travel-700 dark:text-travel-300">Biaya Perjalanan (est.)</span>
                      <span className="font-medium text-travel-800 dark:text-travel-100">
                        {formatRupiah(destinasi.biayaPerjalanan)}
                      </span>
                    </div>
                  )}
                  
                  {destinasi.totalBiaya && (
                    <div className="flex justify-between items-center pt-2 font-bold">
                      <span className="text-travel-800 dark:text-travel-100">Total Estimasi</span>
                      <span className="text-travel-600 dark:text-travel-400">
                        {formatRupiah(destinasi.totalBiaya)}
                      </span>
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-yogya-500 hover:bg-yogya-600 text-white flex items-center justify-center"
                    onClick={handlePesanTiket}
                  >
                    <ShoppingCart className="mr-2 w-5 h-5" />
                    Pesan Tiket Sekarang
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className={`w-full ${
                      isInWishlistState 
                        ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" 
                        : "border-travel-200 dark:border-travel-700 text-travel-700 dark:text-travel-300"
                    } flex items-center justify-center`}
                    onClick={handleToggleWishlist}
                  >
                    <Heart 
                      className={`mr-2 w-5 h-5 ${isInWishlistState ? "fill-red-500 text-red-500" : ""}`} 
                    />
                    {isInWishlistState ? "Hapus dari Wishlist" : "Tambahkan ke Wishlist"}
                  </Button>
                </div>
              </motion.div>
              
              {/* Cuaca Lokal */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-travel-100 dark:border-slate-700"
              >
                <h3 className="text-lg font-bold mb-4 text-travel-800 dark:text-travel-100">
                  Cuaca Lokal
                </h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-travel-600 dark:text-travel-400">Hari ini</p>
                    <p className="font-medium text-travel-800 dark:text-travel-100">{weatherInIndonesian()}</p>
                  </div>
                  
                  <div className="text-3xl">
                    {renderWeatherIcon()}
                  </div>
                </div>
              </motion.div>
              
              {/* Wisata Terdekat */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-travel-100 dark:border-slate-700"
              >
                <h3 className="text-lg font-bold mb-4 text-travel-800 dark:text-travel-100">
                  Wisata Terdekat
                </h3>
                
                <div className="space-y-3">
                  {destinasiWisata
                    .filter(d => d.id !== destinasi.id)
                    .slice(0, 3)
                    .map(d => (
                      <div 
                        key={d.id} 
                        className="flex items-start gap-3 cursor-pointer hover:bg-travel-50 dark:hover:bg-slate-700/50 p-2 rounded-md transition-colors"
                        onClick={() => navigate(`/destinasi/${d.id}`)}
                      >
                        <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={d.gambar} 
                            alt={d.nama} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-travel-800 dark:text-travel-100 text-sm">{d.nama}</p>
                          <p className="text-xs text-travel-500 dark:text-travel-400">{d.lokasi.alamat.split(',')[0]}</p>
                          <div className="flex items-center mt-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs text-travel-600 dark:text-travel-300 ml-1">{d.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                
                <Button 
                  variant="ghost" 
                  className="w-full mt-3 text-travel-600 dark:text-travel-400 hover:text-travel-800 dark:hover:text-travel-100"
                  onClick={() => navigate('/')}
                >
                  Lihat Semua
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default DetailDestinasi;
