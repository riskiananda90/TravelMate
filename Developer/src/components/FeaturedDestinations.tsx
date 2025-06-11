import { useState, useEffect } from 'react'; // useEffect might not be needed directly here anymore unless for other purposes
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button"; // Make sure Button is imported
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ArrowRight, Trees, Mountain } from 'lucide-react';
import { Link } from "react-router-dom";

// Data destinasi unggulan (seperti yang sudah ada di file FeaturedDestinations.tsx Anda)
const allFeaturedDestinations = [
 {  id: 1,
    name: "Candi Borobudur",
    image: "/borobudur.jpg",
    additionalImages: ["/additional/1-1.jpg", "/additional/1-2.jpg"],
    description: "The world's largest Buddhist temple and UNESCO World Heritage site",
    location: "Magelang",
    rating: 4.9,
    category: "Temple",
    nature: "Surrounded by lush greenery and mountains"
  },
  {
    id: 2,
    name: "Candi Prambanan",
    image: "/prambanan.jpg",
    additionalImages: ["/additional/2-1.jpg", "/additional/2-2.jpg"],
    description: "A 9th-century Hindu temple compound dedicated to the Trimurti",
    location: "Yogyakarta",
    rating: 4.8,
    category: "Temple",
    nature: "Beautiful garden landscapes"
  },
  {
    id: 3,
    name: "Candi Ratu Boko",
    image: "/candi_ratu_boko.jpg",
    additionalImages: [],
    description: "A historic temple complex situated on a hilltop offering stunning sunset views.",
    location: "Sleman, Yogyakarta",
    rating: 4.6,
    category: "Temple",
    nature: "Stone ruins on green hills with panoramic views"
  },
  {
    id: 4,
    name: "Candi Sambisari",
    image: "/candi_sambisari.jpg",
    additionalImages: [],
    description: "An underground Hindu temple discovered buried in a paddy field.",
    location: "Sleman, Yogyakarta",
    rating: 4.4,
    category: "Temple",
    nature: "Subterranean stone temple surrounded by grass fields"
  },
  {
    id: 5,
    name: "Candi Plaosan",
    image: "/candi_plaosan.jpg",
    additionalImages: [],
    description: "A twin Buddhist temple complex symbolizing unity in diversity between Buddhism and Hinduism.",
    location: "Klaten, near Yogyakarta",
    rating: 4.5,
    category: "Temple",
    nature: "Lush fields surrounding twin stone temples"
  },
  {
    id: 6,
    name: " Pantai Parangtritis",
    image: "/parangtritis.jpg",
    additionalImages: [],
    description: "Famous black sand beach with mythical stories and amazing sunset views",
    location: "Bantul",
    rating: 4.7,
    category: "Beach",
    nature: "Ocean views and sandy shores"
  },
  {
    id: 7,
    name: "Pantai Indrayanti",
    image: "/pantai_indrayanti.jpg",
    additionalImages: [],
    description: "A beautiful white sand beach in Gunungkidul, perfect for relaxing.",
    location: "Gunungkidul, Yogyakarta",
    rating: 4.5,
    category: "Beach",
    nature: "Ocean, sand, and limestone cliffs"
  },
  {
    id: 8,
    name: "Pantai Timang",
    image: "/pantai_timang.jpg",
    additionalImages: [],
    description: "Known for its gondola ride to a rocky island and crashing waves — a favorite for thrill-seekers.",
    location: "Gunungkidul, Yogyakarta",
    rating: 4.6,
    category: "Beach",
    nature: "Rocky beach, ocean cliffs, and strong waves"
  },
  {
    id: 9, 
    name: "Pantai Drini",
    image: "/pantai_drini.jpg",
    additionalImages: [],
    description: "A serene beach divided by a small coral island, great for swimming and canoeing.",
    location: "Gunungkidul, Yogyakarta",
    rating: 4.4,
    category: "Beach",
    nature: "Coral island, calm water areas, and coastal breeze"
  },
  {
    id: 10,
    name: "Pantai Ngobaran",
    image: "/pantai_ngobaran.jpg",
    additionalImages: [],
    description: "A beach with cultural heritage, featuring statues and altars near the sea.",
    location: "Gunungkidul, Yogyakarta",
    rating: 4.4,
    category: "Beach",
    nature: "Rocky shore, tide pools, and coastal temple structures"
  },
  {
    id: 11, 
    name: "Benteng Vredeburg",
    image: "/benteng_vredeburg.jpg",
    additionalImages: [],
    description: "A Dutch fortress museum that showcases the history of Indonesian independence.",
    location: "Pusat Kota Yogyakarta",
    rating: 4.3,
    category: "Historical Site",
    nature: "Colonial fortress with museum exhibits"
  },
  {
    id: 12, 
    name: "Museum Sonobudoyo",
    image: "/museum_sonobudoyo.jpg",
    additionalImages: [],
    description: "Museum dedicated to Javanese culture and history with an extensive artifact collection.",
    location: "Pusat Kota Yogyakarta",
    rating: 4.2,
    category: "Historical Site",
    nature: "Colonial-era building with cultural exhibits"
  },
  {
    id: 13, 
    name: "Keraton Yogyakarta",
    image: "/keraton.jpg",
    additionalImages: [],
    description: "The royal palace of the Sultan of Yogyakarta, rich in culture and history.",
    location: "Pusat Kota Yogyakarta",
    rating: 4.6,
    category: "Historical Site",
    nature: "Traditional Javanese architecture with small gardens"

  },
  {
    id: 14,
    name: "Taman Sari Water Castle",
    image: "/tamansari.jpg",
    additionalImages: [],
    description: "Former royal garden of the Sultanate of Yogyakarta",
    location: "Yogyakarta",
    rating: 4.6,
    category: "Historical Site",
    nature: "Garden architecture with ponds"
  },
  {
    id: 15,
    name: "Museum Sonobudoyo",
    image: "/museum_sonobudoyo.jpg",
    additionalImages: [],
    description: "Museum dedicated to Javanese culture and history with an extensive artifact collection.",
    location: "Pusat Kota Yogyakarta",
    rating: 4.2,
    category: "Historical Site",
    nature: "Colonial-era building with cultural exhibits"
  },
  {
    id: 16,
    name: "Merapi Volcano",
    image: "/merapi.jpg",
    additionalImages: [],
    description: "One of Indonesia's most active volcanoes with exciting tours",
    location: "Sleman",
    rating: 4.7,
    category: "Adventure",
    nature: "Volcanic landscapes and forests"
  },
  {
    id: 17,
    name: "HeHa Sky View",
    image: "/heha_sky_view.jpg",
    additionalImages: [],
    description: "A modern tourist spot with city and mountain views, plus photo spots.",
    location: "Gunungkidul, Yogyakarta",
    rating: 4.3,
    category: "Adventure",
    nature: "Hilltop with landscaped scenery"
  },
  {
    id: 18,
    name: "Goa Jomblang",
    image: "/goa_jomblang.jpg",
    additionalImages: [],
    description: "A vertical cave with a heavenly light phenomenon, popular among adventurers.",
    location: "Gunungkidul, Yogyakarta",
    rating: 4.7,
    category: "Adventure",
    nature: "Limestone cave and underground forest"
  },
  {
    id: 19,
    name: "Merapi Lava Tour",
    image: "/merapi_lava_tour.jpg",
    additionalImages: [],
    description: "4x4 Jeep adventure around the slopes of Mount Merapi, exploring volcanic relics and views.",
    location: "Sleman, Yogyakarta",
    rating: 4.6,
    category: "Adventure",
    nature: "Volcanic landscape with rugged terrain"
  },
  {
    id: 20,
    name: "Kalibiru National Park",
    image: "/kalibiru.jpg",
    additionalImages: [],
    description: "Adventure park on a cliff with treetop platforms and flying fox overlooking the reservoir.",
    location: "Kulon Progo, Yogyakarta",
    rating: 4.4,
    category: "Adventure",
    nature: "Hilly forest, reservoir views, and adventure activities"
  },
  {
    id: 21,
    name: "Malioboro",
    image: "/malioboro.jpg",
    additionalImages: [],
    description: "The most famous street in Yogyakarta, perfect for shopping and food",
    location: "Yogyakarta",
    rating: 4.5,
    category: "Shopping",
    nature: "Urban trees and city parks nearby"
  },
  {
    id: 22,
    name: "Pasar Beringharjo",
    image: "/pasar_beringharjo.jpg",
    additionalImages: [],
    description: "Traditional market offering a wide range of batik, herbs, antiques, and traditional snacks.",
    location: "Malioboro, Yogyakarta",
    rating: 4.4,
    category: "Shopping",
    nature: "Indoor traditional market with dense stalls"
  },
  {
    id: 23,
    name: "Bakpia Pathok 25",
    image: "/bakpia25.jpg",
    additionalImages: [],
    description: "Famous store for authentic Yogyakarta bakpia, a must-buy sweet snack for visitors.",
    location: "Pathok, Yogyakarta",
    rating: 4.3,
    category: "Shopping",
    nature: "Urban neighborhood with local stores"
  },
  {
    id: 24,
    name: "Toko Oleh-Oleh Monggo Chocolate",
    image: "/monggo_chocolate.jpg",
    additionalImages: [],
    description: "Artisan chocolate store blending Belgian techniques with Indonesian ingredients.",
    location: "Kotagede, Yogyakarta",
    rating: 4.5,
    category: "Shopping",
    nature: "Urban shop with modern and cultural mix"
  },
  {
    id: 25,
    name: "Pusat Kerajinan Perak Kotagede",
    image: "/kotagede_silver.jpg",
    additionalImages: [],
    description: "Historical silver crafting district with handmade jewelry and silverware, ideal for gifts.",
    location: "Kotagede, Yogyakarta",
    rating: 4.4,
    category: "Shopping",
    nature: "Traditional craft village with historical streets"
  },
  {
    id: 26,
    name: "Gudeg Yu Djum",
    image: "/gudeg_yu_djum.jpg",
    additionalImages: [],
    description: "Legendary place to taste the authentic Yogyakarta gudeg, a traditional sweet jackfruit stew.",
    location: "Yogyakarta",
    rating: 4.6,
    category: "Foods",
    nature: "Urban setting with traditional Javanese decor"
  },
  {
    id: 27,
    name: "Sate Klathak Pak Pong",
    image: "/sate_klathak_pak_pong.jpg",
    additionalImages: [],
    description: "Famous for its unique goat satay grilled on iron skewers, located in Bantul.",
    location: "Bantul, Yogyakarta",
    rating: 4.5,
    category: "Foods",
    nature: "Roadside eatery with rural vibes"
  },
  {
    id: 28,
    name: "House of Raminten",
    image: "/house_of_raminten.jpg",
    additionalImages: [],
    description: "A unique restaurant serving traditional Javanese food with theatrical presentation.",
    location: "Yogyakarta",
    rating: 4.5,
    category: "Foods",
    nature: "Cultural ambiance with Javanese interiors"
  },
  {
    id: 29,
    name: "Mangut Lele Mbah Marto",
    image: "/mangut_lele.jpg",
    additionalImages: [],
    description: "Hidden gem offering spicy smoked catfish curry cooked using traditional techniques.",
    location: "Sewon, Bantul",
    rating: 4.4,
    category: "Foods",
    nature: "Rural home kitchen experience"
  },
  {
    id: 30,
    name: "Angkringan Lik Man",
    image: "/angkringan_lik_man.jpg",
    additionalImages: [],
    description: "A legendary angkringan (street food stall) known for kopi joss and traditional snacks.",
    location: "Yogyakarta",
    rating: 4.4,
    category: "Foods",
    nature: "Street side with informal outdoor seating"
  }

];

interface FeaturedDestinationsProps {
  selectedCategory: string | null;
  id: string; // Untuk scrolling
  onSelectCategory: (category: string | null) => void; // Fungsi dari parent untuk mengubah kategori
}

export const FeaturedDestinations = ({ selectedCategory, id, onSelectCategory }: FeaturedDestinationsProps) => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<{ [key: number]: number }>({});

  // Dapatkan daftar kategori unik dari data destinasi unggulan
  const uniqueFeaturedCategories = Array.from(new Set(allFeaturedDestinations.map(d => d.category)))
    .filter(Boolean) // Hilangkan nilai falsy jika ada (misal, kategori kosong)
    .sort();

  const cycleImage = (destinationId: number, hasCycle: boolean) => {
    if (!hasCycle) return;
    const intervalId = setInterval(() => {
      setActiveImage((prev) => {
        const currentDestination = allFeaturedDestinations.find(d => d.id === destinationId);
        if (!currentDestination || !currentDestination.additionalImages.length) return prev;
        const currentIndex = prev[destinationId] || 0;
        const nextIndex = (currentIndex + 1) % (currentDestination.additionalImages.length + 1);
        return { ...prev, [destinationId]: nextIndex };
      });
    }, 2000);
    return () => clearInterval(intervalId);
  };

  const getDestinationImage = (destination: typeof allFeaturedDestinations[0]) => {
    const activeIdx = activeImage[destination.id] || 0;
    if (activeIdx === 0) return destination.image;
    return destination.additionalImages[activeIdx - 1];
  };

  const displayedDestinations = selectedCategory
    ? allFeaturedDestinations.filter(destination =>
        destination.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory.toLowerCase() === "temples" && (destination.name.toLowerCase().includes("temple") || destination.category.toLowerCase().includes("temple")))
      )
    : allFeaturedDestinations;

  return (
    <section id={id} className="py-16 bg-gradient-to-b from-white to-travel-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center"> 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-2"
          >
            <Trees size={24} className="text-travel-600 dark:text-travel-400" />
            <h2 className="text-3xl font-bold text-travel-800">
              Featured <span className="text-yogya-600">Destinations</span>
            </h2>
            <Mountain size={24} className="text-travel-600 dark:text-travel-400" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-travel-600 max-w-2xl mx-auto"
          >
            {selectedCategory
              ? `Showing top destinations for the "${selectedCategory}" Category`
              : "Explore these stunning destinations surrounded by nature around Yogyakarta"}
          </motion.p>
        </div>

        {/* Tombol Kategori dan Tampilkan Semua */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          <Button
           // variant={selectedCategory }
            onClick={() => onSelectCategory(null)}
            className={`
              transition-all
              ${selectedCategory === null
                ? 'bg-transparent text-orange-600 hover:bg-blue-50' // Active: Transparent background, blue text, light blue hover
                : 'bg-transparent text-blue-500 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-slate-700' // Inactive: Transparent background, slightly lighter blue text, light blue hover
              }
            `}
          >
            Tampilkan Semua
          </Button>
          {uniqueFeaturedCategories.map(cat => (
            <Button
              key={cat}
              //variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => onSelectCategory(cat)}
              className={`
                transition-all
                ${selectedCategory === cat
                  ? 'bg-transparent text-orange-600 hover:bg-blue-50' // Active: Transparent background, blue text, light blue hover
                  : 'bg-transparent text-50-500 hover:bg-blue-50 dark:text-blue-300 orange:hover:bg-slate-700' // Inactive: Transparent background, slightly lighter blue text, light blue hover
                }
              `}
            >
              {cat}
            </Button>
          ))}
        </motion.div>

        {displayedDestinations.length === 0 && selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-travel-700 dark:text-travel-300 py-10"
          >
            <Trees size={40} className="mx-auto mb-4 text-travel-400 dark:text-travel-500" />
            Tidak ada destinasi unggulan yang cocok untuk kategori "{selectedCategory}".
            <br />
            Coba pilih kategori lain atau <Button variant="link" className="text-yogya-600 hover:underline p-0 h-auto" onClick={() => onSelectCategory(null)}>tampilkan semua</Button>.
          </motion.div>
        )}

        {displayedDestinations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Carousel
              opts={{
                align: "start",
                loop: displayedDestinations.length > 3,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {displayedDestinations.map((destination) => (
                  <CarouselItem key={destination.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="relative overflow-hidden rounded-xl h-[320px] cursor-pointer bg-white dark:bg-slate-800 shadow-lg"
                      onMouseEnter={() => {
                        setIsHovered(destination.id);
                        if (destination.additionalImages.length > 0) {
                          const cleanupFn = cycleImage(destination.id, true);
                          (window as any)[`cleanupCycleImage_${destination.id}`] = cleanupFn;
                        }
                      }}
                      onMouseLeave={() => {
                        setIsHovered(null);
                        setActiveImage(prev => ({ ...prev, [destination.id]: 0 }));
                        const cleanup = (window as any)[`cleanupCycleImage_${destination.id}`];
                        if (cleanup) {
                          cleanup();
                          delete (window as any)[`cleanupCycleImage_${destination.id}`];
                        }
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                      <img
                        src={getDestinationImage(destination)}
                        alt={destination.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500"
                        style={{
                          transform: isHovered === destination.id ? 'scale(1.1)' : 'scale(1)'
                        }}
                      />
                      {/* ... sisa kode untuk overlay, badge, rating, dots, info teks, dan tombol View Details ... */}
                      {/* (Tidak ada perubahan pada bagian ini, jadi saya singkat) */}
                       <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-5">
                         <img
                           src="/additional/overlay-trees.png"
                           alt=""
                           className="absolute bottom-0 w-full h-1/4 object-cover opacity-30"
                         />
                       </div>
                       <div className="absolute top-3 left-3 z-20">
                         <Badge className="bg-travel-600 text-white font-medium shadow-md">
                           {destination.category}
                         </Badge>
                       </div>
                       <div className="absolute top-3 right-3 z-20 flex items-center bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 shadow-md">
                         <Star size={14} className="text-yellow-500 fill-yellow-500" />
                         <span className="text-xs font-medium ml-1 text-slate-700">{destination.rating}</span>
                       </div>
                       {destination.additionalImages.length > 0 && (
                         <div className="absolute top-12 right-3 z-20 flex flex-col gap-1">
                           {[destination.image, ...destination.additionalImages].map((_, idx) => (
                             <div
                               key={idx}
                               className={`w-2 h-2 rounded-full transition-colors ${
                                 (activeImage[destination.id] || 0) === idx
                                   ? 'bg-white'
                                   : 'bg-white/40 hover:bg-white/70'
                               }`}
                             />
                           ))}
                         </div>
                       )}
                       <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                         <h3 className="text-white font-bold text-xl mb-1 drop-shadow-md">{destination.name}</h3>
                         <div className="flex items-center text-white/90 text-xs mb-2 drop-shadow-sm">
                           <MapPin size={12} className="mr-1" />
                           <span>{destination.location}</span>
                         </div>
                         <div className="bg-black/40 backdrop-blur-sm p-2 rounded-md mb-3">
                           <p className="text-white/90 text-xs line-clamp-2">
                             {destination.description}
                           </p>
                           <p className="text-yogya-200 text-xs mt-1 italic line-clamp-1">
                             <Trees size={10} className="inline mr-1" />
                             {destination.nature}
                           </p>
                         </div>
                         <Link to={`/destinasi/${destination.id}`} className="w-full block">
                           <Button
                             size="sm"
                             className="bg-white text-travel-800 hover:bg-travel-100 w-full group shadow-md"
                           >
                             View Details
                             <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                           </Button>
                         </Link>
                       </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {displayedDestinations.length > 3 && (
                  <div className="hidden md:flex justify-center gap-3 mt-8">
                      <CarouselPrevious className="h-5 w-5" />
                      <CarouselNext className="h-5 w-5" />
                    
                  </div>
                )}
            </Carousel>
          </motion.div>
        )}

        <div className="mt-12 flex justify-center">
          {/* ... Tombol Discover More Destinations ... (Tidak ada perubahan) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <Link to="/alldestination" >
                <Button className="bg-gradient-to-r from-travel-500 to-yogya-500 text-white group px-6 py-3 text-base">
                  <Trees size={18} className="mr-2" />
                  Lihat Semua Destinasi Utama
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <motion.div
                className="absolute -top-6 -left-6 text-travel-300 dark:text-travel-600"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Trees size={20} />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -right-6 text-yogya-300 dark:text-yogya-600"
                animate={{ rotate: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              >
                <Mountain size={20} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// export default FeaturedDestinations; // Komentari jika ini ada di file yang sama dengan Index