import { useState } from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ArrowRight, Trees, Mountain, ArrowLeft } from 'lucide-react';
import { Link, Navigate, useNavigate } from "react-router-dom";

const featuredDestinations = [
  {
    id: 1,
    name: "Borobudur Temple",
    image: "/borobudur.jpg",
    additionalImages: ["/additional/1-1.jpg", "/additional/1-2.jpg"],
    description: "The world's largest Buddhist temple and UNESCO World Heritage site",
    location: "Magelang",
    rating: 4.9,
    category: "Cultural Heritage",
    nature: "Surrounded by lush greenery and mountains"
  },
  {
    id: 2,
    name: "Prambanan Temple",
    image: "/prambanan.jpg",
    additionalImages: ["/additional/2-1.jpg", "/additional/2-2.jpg"],
    description: "A 9th-century Hindu temple compound dedicated to the Trimurti",
    location: "Yogyakarta",
    rating: 4.8,
    category: "Cultural Heritage",
    nature: "Beautiful garden landscapes"
  },
  {
    id: 3,
    name: "Parangtritis Beach",
    image: "/parangtritis.jpg",
    additionalImages: [],
    description: "Famous black sand beach with mythical stories and amazing sunset views",
    location: "Bantul",
    rating: 4.7,
    category: "Beach",
    nature: "Ocean views and sandy shores"
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
    name: "Malioboro Street",
    image: "/malioboro.jpg",
    additionalImages: [],
    description: "The most famous street in Yogyakarta, perfect for shopping and food",
    location: "Yogyakarta",
    rating: 4.5,
    category: "Shopping",
    nature: "Urban trees and city parks nearby"
  }
];

export const FeaturedDestinations = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<{[key: number]: number}>({});
  
  const navigate = useNavigate();
  const cycleImage = (destinationId: number, hasCycle: boolean) => {
    if (!hasCycle) return;
    
    const intervalId = setInterval(() => {
      setActiveImage((prev) => {
        const currentDestination = featuredDestinations.find(d => d.id === destinationId);
        if (!currentDestination || !currentDestination.additionalImages.length) return prev;
        
        const currentIndex = prev[destinationId] || 0;
        const nextIndex = (currentIndex + 1) % (currentDestination.additionalImages.length + 1);
        return { ...prev, [destinationId]: nextIndex };
      });
    }, 2000);
    
    return () => clearInterval(intervalId);
  };
  
  const getDestinationImage = (destination: typeof featuredDestinations[0]) => {
    const activeIdx = activeImage[destination.id] || 0;
    if (activeIdx === 0) return destination.image;
    return destination.additionalImages[activeIdx - 1];
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-travel-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-2"
          >
            <Trees size={24} className="text-travel-600" />
            <h2 className="text-3xl font-bold text-travel-800">
              Featured <span className="text-yogya-600">Destinations</span>
            </h2>
            <Mountain size={24} className="text-travel-600" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-travel-600 max-w-2xl mx-auto"
          >
            Explore these stunning destinations surrounded by nature around Yogyakarta
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredDestinations.map((destination) => (
                <CarouselItem key={destination.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="relative overflow-hidden rounded-xl h-[320px] cursor-pointer"
                    onMouseEnter={() => {
                      setIsHovered(destination.id);
                      if (destination.additionalImages.length > 0) {
                        const cleanupFn = cycleImage(destination.id, true);
                        return () => cleanupFn && cleanupFn();
                      }
                    }}
                    onMouseLeave={() => {
                      setIsHovered(null);
                      setActiveImage(prev => ({ ...prev, [destination.id]: 0 }));
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
                    
                    {/* Nature overlay elements */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-5">
                      <img 
                        src="/additional/overlay-trees.png" 
                        alt="" 
                        className="absolute bottom-0 w-full h-1/4 object-cover opacity-30"
                      />
                    </div>
                    
                    <div className="absolute top-3 left-3 z-20">
                      <Badge className="bg-travel-600 text-white font-medium">
                        {destination.category}
                      </Badge>
                    </div>
                    
                    <div className="absolute top-3 right-3 z-20 flex items-center bg-white/80 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-medium ml-1">{destination.rating}</span>
                    </div>
                    
                    {/* Image dots indicator if there are additional images */}
                    {destination.additionalImages.length > 0 && (
                      <div className="absolute top-12 right-3 z-20 flex flex-col gap-1">
                        {[destination.image, ...destination.additionalImages].map((_, idx) => (
                          <div 
                            key={idx} 
                            className={`w-2 h-2 rounded-full ${
                              (activeImage[destination.id] || 0) === idx 
                                ? 'bg-white' 
                                : 'bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <h3 className="text-white font-bold text-xl mb-1">{destination.name}</h3>
                      <div className="flex items-center text-white/90 text-xs mb-2">
                        <MapPin size={12} className="mr-1" />
                        <span>{destination.location}</span>
                      </div>
                      
                      <div className="bg-black/30 backdrop-blur-sm p-2 rounded-md mb-3">
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
                          className="bg-white text-travel-800 hover:bg-travel-100 w-full group"
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
            
            <div className="hidden md:flex justify-end gap-2 mt-6">
              <Button variant="outline" size="icon" className="h-8 w-8   rounded-full">
                <ArrowLeft className="h-4 w-4 " />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full ">
                <ArrowRight className="h-4 w-4 "/>
              </Button>
            </div>
          </Carousel>
          
          <div className="mt-12 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <Link to="/destinasi" className="block">
                  <Button className="bg-gradient-to-r from-travel-500 to-yogya-500 text-white group" onClick={()=> navigate('/destinasi')}>
                    <Trees size={16} className="mr-2" />
                    Discover More Destinations
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                
                {/* Decorative leaf elements */}
                <motion.div
                  className="absolute -top-6 -left-6"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Trees size={20} className="text-travel-300" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-6 -right-6"
                  animate={{ rotate: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                >
                  <Mountain size={20} className="text-yogya-300" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
