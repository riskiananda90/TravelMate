import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, DollarSign, Filter, X } from 'lucide-react';
import { destinasiWisata } from '@/data/destinations'; // Adjust path if needed
import { useLocation } from '@/hooks/use-location';
import NavBar from '@/components/NavBar';
import { Link } from "react-router-dom";

// Tipe data yang diharapkan oleh komponen AllDestinations
interface Destination {
  id: number;
  nama: string;
  lokasi: string;
  kategori: string;
  rating: number;
  harga: number;
  gambar: string;
  deskripsi: string; 
}

// Fungsi untuk memetakan kategori
// This function now primarily ensures the category displayed on the card
// matches the filter options you've defined, by returning the original category
// if it aligns with your desired filter categories.
const mapKategori = (kategoriDariTs: string): string => {
  // Define the exact categories you want to see on the cards and in filters.
  // This assumes 'destinasiWisata' contains these exact strings or very similar ones.
  const desiredCategories = ["Adventure", "Beach", "Foods", "Historical Site", "Shopping", "Temple"];

  if (desiredCategories.includes(kategoriDariTs)) {
    return kategoriDariTs;
  }

  // Add specific mappings for other categories if needed,
  // e.g., if 'destinasiWisata' has "Culture" and you want it to appear as "Budaya".
  const specificMappings = {
    "Modern": "Budaya", // Example: if "Modern" is a category in your raw data
    // Add more specific mappings here if necessary
  };

  if (specificMappings[kategoriDariTs]) {
    return specificMappings[kategoriDariTs];
  }

  // Fallback: if no specific mapping or direct match, return the original category.
  // This prevents categories from becoming "Lainnya" if not explicitly handled.
  return kategoriDariTs;
};

// Transformasi data: apply the mapping during transformation
const transformedDestinations: Destination[] = destinasiWisata.map(item => ({
  id: Number(item.id),
  nama: item.nama,
  lokasi: item.lokasi.alamat,
  kategori: mapKategori(item.kategori), // Use the refined mapKategori
  rating: item.rating,
  harga: item.biaya.masuk,
  gambar: item.gambar,
  deskripsi: item.deskripsi,
}));

// Explicitly define the categories for the filter panel to match the image.
// "Tampilkan Semua" is for the "Show All" option.
//const categories = ["Tampilkan Semua", "Adventure", "Beach", "Foods", "Historical Site", "Shopping", "Temple"].sort();
const uniqueActualCategories = Array.from(new Set(transformedDestinations.map(d => d.kategori)))
                                .filter(cat => cat !== "Tampilkan Semua"); // Remove if it accidentally got in

const categories = ["Tampilkan Semua", ...uniqueActualCategories.sort()];
// Komponen Filter Panel
const FilterPanel = ({ onFilterChange, activeCategory, activeMinRating }) => {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [minRating, setMinRating] = useState(activeMinRating);

  // Sync internal state with external props when they change (e.g., from reset)
  useEffect(() => {
    setSelectedCategory(activeCategory);
    setMinRating(activeMinRating);
  }, [activeCategory, activeMinRating]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange({
      category: category === "Tampilkan Semua" ? "" : category,
      minRating
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-travel-100 dark:border-slate-700">
      <h3 className="text-lg font-semibold mb-4 text-travel-800 dark:text-travel-100 flex items-center">
        <Filter className="mr-2 h-5 w-5" />
        Filter Destinasi
      </h3>
      
      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-travel-700 dark:text-travel-300">
          Kategori
        </label>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-travel-600 text-white'
                  : 'bg-travel-50 dark:bg-slate-700 text-travel-700 dark:text-travel-300 hover:bg-travel-100 dark:hover:bg-slate-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="block text-sm font-medium mb-2 text-travel-700 dark:text-travel-300">
          Minimal Rating
        </label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => {
                const newMinRating = minRating === star ? 0 : star; // Toggle rating
                setMinRating(newMinRating);
                onFilterChange({
                  category: selectedCategory === "Tampilkan Semua" ? "" : selectedCategory,
                  minRating: newMinRating
                });
              }}
              className={`p-1 rounded-full transition-colors ${
                star <= minRating ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-300 hover:text-gray-400'
              }`}
            >
              <Star className="h-5 w-5 fill-current" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Komponen Kartu Destinasi
// Komponen Kartu Destinasi
const KartuDestinasi = ({ destinasi }: { destinasi: Destination }) => {
  return (
    // Wrap the entire card with Link
    <Link to={`/destinasi/${destinasi.id}`} className="block h-full">
      {/* The `passHref` prop is important for correct behavior with custom children */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden border border-travel-100 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300 h-full cursor-pointer">
        {/* Added cursor-pointer to indicate it's clickable */}
        <div className="relative h-48">
          <img
            src={destinasi.gambar}
            alt={destinasi.nama}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white dark:bg-slate-800 px-2 py-1 rounded-full text-xs font-medium text-travel-700 dark:text-travel-300">
            {destinasi.kategori}
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold mb-2 text-travel-800 dark:text-travel-100">
            {destinasi.nama}
          </h3>
          
          <div className="flex items-center text-sm text-travel-600 dark:text-travel-400 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {destinasi.lokasi}
          </div>
          
          <p className="text-sm text-travel-600 dark:text-travel-400 mb-3 flex-grow">
            {destinasi.deskripsi}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="text-sm font-medium text-travel-700 dark:text-travel-300">
                {destinasi.rating}
              </span>
            </div>
            
            <div className="flex items-center text-travel-600 dark:text-travel-400">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="font-semibold">
                {destinasi.harga === 0 ? 'Gratis' : `Rp ${destinasi.harga.toLocaleString()}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Komponen Utama All Destinations
const AllDestinations = () => {
  const [destinations] = useState<Destination[]>(transformedDestinations);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(transformedDestinations);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // State for active filters, managed in AllDestinations for reset functionality
  const [activeFilters, setActiveFilters] = useState<{ category: string; minRating: number }>({
    category: "", // Empty string means "Tampilkan Semua" (show all)
    minRating: 0,
  });

  // Filter destinations based on criteria
  const handleFilterChange = (filters: { category: string; minRating: number }) => {
    setActiveFilters(filters); // Store the active filters
    let currentDestinations = [...destinations]; // Always start from the original data

    // Apply search term if present
    if (searchTerm) {
      currentDestinations = currentDestinations.filter(dest =>
          dest.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.lokasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dest.kategori.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filters.category) {
      currentDestinations = currentDestinations.filter(dest => dest.kategori === filters.category);
    }

    // Filter by rating
    if (filters.minRating > 0) {
      currentDestinations = currentDestinations.filter(dest => dest.rating >= filters.minRating);
    }

    setFilteredDestinations(currentDestinations);
  };

  // Handle search (re-apply filters when search term changes)
  useEffect(() => {
    handleFilterChange(activeFilters);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, destinations]); // destinations added as dependency if it could change

  // Reset filter
  const resetFilter = () => {
    setSearchTerm("");
    const defaultFilters = { category: "", minRating: 0 };
    setActiveFilters(defaultFilters); // Reset active filters state
    handleFilterChange(defaultFilters); // Trigger re-filtering with default values
  };

  const lokasi = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-travel-50 to-travel-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header Section */}
      <NavBar userLocation={lokasi} />
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-travel-100 dark:border-slate-700 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-travel-800 dark:text-travel-100 mb-2">
              Semua Destinasi Wisata
            </h1>
            <p className="text-travel-600 dark:text-travel-400">
              Temukan destinasi impian Anda dari koleksi lengkap kami
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto mt-6"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-travel-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari destinasi, lokasi, atau kategori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-travel-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-travel-500 focus:border-transparent bg-white dark:bg-slate-700 text-travel-800 dark:text-travel-100"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-travel-400 hover:text-travel-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Filter Panel */}
            <motion.div
              className="md:col-span-3 space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FilterPanel 
                onFilterChange={handleFilterChange}
                // Pass active filter states down to FilterPanel for correct display
                activeCategory={activeFilters.category === "" ? "Tampilkan Semua" : activeFilters.category}
                activeMinRating={activeFilters.minRating}
              />
              <button
                onClick={resetFilter}
                className="w-full px-4 py-2 border border-travel-300 dark:border-slate-600 text-travel-700 dark:text-travel-300 hover:bg-travel-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Reset Filter
              </button>
            </motion.div>

            {/* Destinations Grid */}
            <div className="md:col-span-9">
              {!isLoading ? (
                <>
                  <motion.div
                    className="mb-6 flex justify-between items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <p className="text-travel-600 dark:text-travel-400">
                      {filteredDestinations.length} destinasi ditemukan
                    </p>
                    
                  </motion.div>

                  {filteredDestinations.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredDestinations.map((destinasi, index) => (
                        <motion.div
                          key={destinasi.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="h-full"
                        >
                          <div
                            className="block h-full hover:transform hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
                            onClick={() => console.log(`Maps to destination ${destinasi.id}`)}
                          >
                            <KartuDestinasi destinasi={destinasi} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md text-center border border-travel-100 dark:border-slate-700"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h3 className="text-xl font-medium mb-2 text-travel-800 dark:text-travel-100">
                        Tidak ada destinasi ditemukan
                      </h3>
                      <p className="text-travel-600 dark:text-travel-400 mb-4">
                        Coba sesuaikan filter atau kata kunci pencarian Anda
                      </p>
                      <button 
                        onClick={resetFilter} 
                        className="px-6 py-2 bg-travel-600 hover:bg-travel-700 text-white rounded-lg transition-colors"
                      >
                        Reset Filter
                      </button>
                    </motion.div>
                  )}
                </>
              ) : (
                <div className="flex justify-center items-center h-64">
                  {/* Loading state */}
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-travel-600"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllDestinations;