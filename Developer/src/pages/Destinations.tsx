
import { useState, useEffect } from 'react';
import { useLocation } from '@/hooks/use-location';
import { destinasiWisata } from '@/data/destinations';
import { TujuanWisata, FilterAnggaran, FilterJarak } from '@/types';
import { calculateDistance, calculateTravelCost, getTotalCost, formatRupiah } from '@/utils/calculations';
import NavBar from '@/components/NavBar';
import KartuDestinasi from '@/components/KartuDestinasi';
import FilterPanel from '@/components/FilterPanel';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { Search, MapPin, Filter } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Destinations = () => {
  const location = useLocation();
  const [destinasi, setDestinasi] = useState<TujuanWisata[]>([]);
  const [destinasiTerfilter, setDestinasiTerfilter] = useState<TujuanWisata[]>([]);
  const [filterAnggaran, setFilterAnggaran] = useState<FilterAnggaran>({ min: 0, max: 1000000 });
  const [filterJarak, setFilterJarak] = useState<FilterJarak>({ jarakMaksimum: 50 });
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    if (location.loaded && !location.error) {
      // Process destinations with distance and cost calculations
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
      terapkanFilter(destinasiDiproses, filterAnggaran, filterJarak, searchTerm);
    }
  }, [location.loaded, location.error]);

  const terapkanFilter = (
    dests: TujuanWisata[], 
    anggaran: FilterAnggaran, 
    jarak: FilterJarak,
    search: string
  ) => {
    const terfilter = dests.filter(dest => {
      const cocokDenganAnggaran = dest.totalBiaya !== undefined && 
        dest.totalBiaya >= anggaran.min && 
        dest.totalBiaya <= anggaran.max;
        
      const cocokDenganJarak = dest.jarak !== undefined && 
        dest.jarak <= jarak.jarakMaksimum;
      
      const cocokDenganPencarian = search === "" || 
        dest.nama.toLowerCase().includes(search.toLowerCase()) ||
        // Fix: Check if kategori is an array before using .some()
        (Array.isArray(dest.kategori) && dest.kategori.some(k => k.toLowerCase().includes(search.toLowerCase())));
        
      return cocokDenganAnggaran && cocokDenganJarak && cocokDenganPencarian;
    });
    
    // Sort by distance
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
    
    terapkanFilter(destinasi, filterAnggaranBaru, filterJarakBaru, searchTerm);
    
    toast({
      title: "Filter Diterapkan",
      description: `Menampilkan destinasi dalam radius ${jarakMaksimum}km dan rentang anggaran ${formatRupiah(anggaran.min)} - ${formatRupiah(anggaran.max)}.`,
    });
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    terapkanFilter(destinasi, filterAnggaran, filterJarak, value);
  };

  const resetFilter = () => {
    const filterAnggaranDefault = { min: 0, max: 1000000 };
    const filterJarakDefault = { jarakMaksimum: 50 };
    
    setFilterAnggaran(filterAnggaranDefault);
    setFilterJarak(filterJarakDefault);
    setSearchTerm("");
    
    terapkanFilter(destinasi, filterAnggaranDefault, filterJarakDefault, "");
    
    toast({
      title: "Filter Direset",
      description: "Menampilkan semua destinasi dalam parameter default.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-travel-50 to-white dark:from-slate-900 dark:to-slate-800">
      <NavBar userLocation={location} />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl font-bold text-travel-800 dark:text-travel-100 mb-3">
              Destinasi Wisata <span className="text-yogya-600">Yogyakarta</span>
            </h1>
            <p className="text-travel-600 dark:text-travel-400 max-w-2xl mx-auto">
              Temukan tempat wisata terbaik sesuai anggaran dan lokasi Anda
            </p>
          </motion.div>
          
          <div className="mb-8">
            <div className="max-w-2xl mx-auto flex gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-travel-400" size={18} />
                <Input 
                  placeholder="Cari destinasi wisata..." 
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 bg-white dark:bg-slate-800 border-travel-200 dark:border-slate-700"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="border-travel-200 dark:border-slate-700"
              >
                <Filter size={18} className="mr-2" /> 
                Filter
              </Button>
            </div>
          </div>
          
          {isFilterOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border border-travel-200 dark:border-slate-700">
                <FilterPanel onFilterChange={handleFilterChange} />
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-travel-300 text-travel-700 hover:bg-travel-50 dark:border-slate-600 dark:text-travel-300 dark:hover:bg-slate-800" 
                  onClick={resetFilter}
                >
                  Reset Filter
                </Button>
              </div>
            </motion.div>
          )}
          
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center text-travel-600 dark:text-travel-400">
              <MapPin size={16} className="mr-1" />
              {location.loaded && !location.error ? (
                <span>Menampilkan destinasi dari lokasi Anda</span>
              ) : (
                <span>Menggunakan lokasi default (Yogyakarta)</span>
              )}
            </div>
            
            {location.loaded && !location.error && (
              <div className="text-travel-600 dark:text-travel-400">
                {destinasiTerfilter.length} destinasi ditemukan
              </div>
            )}
          </div>
          
          {location.loaded && !location.error ? (
            <>
              {destinasiTerfilter.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {destinasiTerfilter.map((destinasi, index) => (
                    <motion.div
                      key={destinasi.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.05 * (index % 4) }}
                    >
                      <Link to={`/destinasi/${destinasi.id}`} className="block h-full">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(8).fill(0).map((_, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md border border-travel-100 dark:border-slate-700">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
    </div>
  );
};

export default Destinations;
