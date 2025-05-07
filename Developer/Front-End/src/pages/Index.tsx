
import { useState, useEffect } from 'react';
import { useLocation } from '@/hooks/use-location';
import { destinasiWisata } from '@/data/destinations';
import { TujuanWisata, FilterAnggaran, FilterJarak } from '@/types';
import { calculateDistance, calculateTravelCost, getTotalCost, formatRupiah } from '@/utils/calculations';
import NavBar from '@/components/NavBar';
import KartuDestinasi from '@/components/KartuDestinasi';
import LocationPermissionModal from '@/components/LocationPermissionModal';
import FilterPanel from '@/components/FilterPanel';
import HeroSection from '@/components/HeroSection';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  const location = useLocation();
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [destinasi, setDestinasi] = useState<TujuanWisata[]>([]);
  const [destinasiTerfilter, setDestinasiTerfilter] = useState<TujuanWisata[]>([]);
  const [filterAnggaran, setFilterAnggaran] = useState<FilterAnggaran>({ min: 0, max: 1000000 });
  const [filterJarak, setFilterJarak] = useState<FilterJarak>({ jarakMaksimum: 50 });

  useEffect(() => {
    // Jika lokasi dimuat, periksa apakah kita memiliki izin
    if (location.loaded) {
      setShowPermissionModal(false);
    }
  }, [location.loaded]);

  useEffect(() => {
    if (location.loaded && !location.error) {
      // Proses tujuan wisata dengan perhitungan jarak dan biaya
      const destinasiDiproses = destinasiWisata.map(destinasi => {
        const jarak = calculateDistance(
          location.latitude,
          location.longitude,
          destinasi.lokasi.latitude,
          destinasi.lokasi.longitude
        );
        
        const biayaPerjalanan = calculateTravelCost(jarak);
        const totalBiaya = getTotalCost(
          destinasi.biaya.masuk,
          destinasi.biaya.makanan,
          destinasi.biaya.penginapan,
          biayaPerjalanan
        );
        
        return {
          ...destinasi,
          jarak,
          biayaPerjalanan,
          totalBiaya
        };
      });
      
      setDestinasi(destinasiDiproses);
      terapkanFilter(destinasiDiproses, filterAnggaran, filterJarak);
    }
  }, [location.loaded, location.error]);

  const terapkanFilter = (
    dests: TujuanWisata[], 
    anggaran: FilterAnggaran, 
    jarak: FilterJarak
  ) => {
    const terfilter = dests.filter(dest => {
      const cocokDenganAnggaran = dest.totalBiaya !== undefined && 
        dest.totalBiaya >= anggaran.min && 
        dest.totalBiaya <= anggaran.max;
        
      const cocokDenganJarak = dest.jarak !== undefined && 
        dest.jarak <= jarak.jarakMaksimum;
        
      return cocokDenganAnggaran && cocokDenganJarak;
    });
    
    // Urutkan berdasarkan jarak (terdekat lebih dulu)
    terfilter.sort((a, b) => {
      if (a.jarak !== undefined && b.jarak !== undefined) {
        return a.jarak - b.jarak;
      }
      return 0;
    });
    
    setDestinasiTerfilter(terfilter);
  };

  const handleFilterChange = (anggaran: FilterAnggaran, jarakMaksimum: number) => {
    const filterAnggaranBaru = { ...anggaran };
    const filterJarakBaru = { jarakMaksimum };
    
    setFilterAnggaran(filterAnggaranBaru);
    setFilterJarak(filterJarakBaru);
    
    terapkanFilter(destinasi, filterAnggaranBaru, filterJarakBaru);
    
    toast({
      title: "Filter Diterapkan",
      description: `Menampilkan destinasi dalam radius ${jarakMaksimum}km dan rentang anggaran ${formatRupiah(anggaran.min)} - ${formatRupiah(anggaran.max)}.`,
    });
  };

  const handlePermissionGranted = () => {
    setShowPermissionModal(false);
    toast({
      title: "Akses lokasi diberikan",
      description: "Kami akan menggunakan lokasi Anda untuk menemukan destinasi terdekat",
    });
  };

  const handlePermissionDenied = () => {
    setShowPermissionModal(false);
    toast({
      title: "Menggunakan lokasi default",
      description: "Kami akan menggunakan pusat kota Yogyakarta sebagai lokasi Anda",
    });
  };

  const resetFilter = () => {
    const filterAnggaranDefault = { min: 0, max: 1000000 };
    const filterJarakDefault = { jarakMaksimum: 50 };
    
    setFilterAnggaran(filterAnggaranDefault);
    setFilterJarak(filterJarakDefault);
    
    terapkanFilter(destinasi, filterAnggaranDefault, filterJarakDefault);
    
    toast({
      title: "Filter Direset",
      description: "Menampilkan semua destinasi dalam parameter default.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-travel-50 to-white dark:from-slate-900 dark:to-slate-800">
      {showPermissionModal && (
        <LocationPermissionModal
          onPermissionGranted={handlePermissionGranted}
          onPermissionDenied={handlePermissionDenied}
        />
      )}
      
      <NavBar userLocation={location} />
      
      <main className="flex-grow">
        <HeroSection />
        
        <FeaturedDestinations />
        
        <section id="destinations" className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center text-travel-800 dark:text-travel-100">
                Destinasi Wisata Untuk <span className="text-yogya-600">Anda</span>
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Sidebar dengan filter */}
              <motion.div 
                className="md:col-span-3 space-y-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <FilterPanel onFilterChange={handleFilterChange} />
                <Button 
                  variant="outline" 
                  className="w-full border-travel-300 text-travel-700 hover:bg-travel-50 dark:border-slate-600 dark:text-travel-300 dark:hover:bg-slate-800" 
                  onClick={resetFilter}
                >
                  Reset Filter
                </Button>
              </motion.div>
              
              {/* Grid destinasi */}
              <div className="md:col-span-9">
                {location.loaded && !location.error ? (
                  <>
                    <motion.div 
                      className="mb-4 flex justify-between items-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <p className="text-travel-600 dark:text-travel-400">
                        {destinasiTerfilter.length} destinasi ditemukan
                      </p>
                      
                      <ThemeToggle />
                    </motion.div>
                    
                    {destinasiTerfilter.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {destinasiTerfilter.map((destinasi, index) => (
                          <motion.div
                            key={destinasi.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                          >
                            <Link to={`/destinasi/${destinasi.id}`} className="block">
                              <KartuDestinasi destinasi={destinasi} />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <motion.div 
                        className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md text-center border border-travel-100 dark:border-slate-700"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        <h3 className="text-xl font-medium mb-2 text-travel-800 dark:text-travel-100">Tidak ada destinasi ditemukan</h3>
                        <p className="text-travel-600 dark:text-travel-400 mb-4">
                          Coba sesuaikan filter atau tingkatkan rentang anggaran Anda
                        </p>
                        <Button onClick={resetFilter} className="bg-travel-600 hover:bg-travel-700 text-white">
                          Reset Filter
                        </Button>
                      </motion.div>
                    )}
                  </>
                ) : (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-12 w-12 bg-travel-200 dark:bg-travel-700 rounded-full mb-4"></div>
                      <div className="h-4 w-48 bg-travel-100 dark:bg-travel-800 rounded mb-2"></div>
                      <div className="h-3 w-32 bg-travel-100 dark:bg-travel-800 rounded"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
