
import { Button } from "@/components/ui/button";
import { ArrowDown, Map, Search, Compass, Trees, Mountain } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const backgroundImages = [
  "/borobudur.jpg", 
  "/prambanan.jpg",
  "/parangtritis.jpg", 
  "/tamansari.jpg"
];

export const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // For background image carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  // For animation visibility
  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToDestinations = () => {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Parallax Mountains and Trees Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute bottom-0 w-full"
          style={{ y: scrollPosition * 0.2, position: 'absolute', bottom: 0, width: '100%', zIndex: 1 }}
        >
          <img 
            src="/additional/mountains.png" 
            alt="Mountains" 
            className="w-full h-[40vh] object-cover object-bottom opacity-40"
            style={{ 
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))'
            }}
          />
        </motion.div>
        <motion.div 
          className="absolute bottom-0 w-full"
          style={{ y: scrollPosition * 0.1, position: 'absolute', bottom: 0, width: '100%', zIndex: 2 }}
        >
          <img 
            src="/additional/trees.png" 
            alt="Trees" 
            className="w-full h-[35vh] object-cover object-bottom opacity-50"
            style={{ 
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))'
            }}
          />
        </motion.div>
      </div>

      <div 
        className="h-[80vh] md:h-[90vh] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${backgroundImages[currentImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-in-out',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-travel-800/40 to-yogya-800/40 z-10"></div>
        
        <div className="text-center px-4 max-w-3xl mx-auto z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mountain size={32} className="text-white/80 animate-bounce" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 text-shadow-lg">
                Explore <span className="text-yogya-400">Yogyakarta</span> On Your Budget
              </h1>
              <Trees size={32} className="text-white/80 animate-bounce delay-75" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto text-shadow">
              Discover the perfect destinations that match your budget and preferences
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              onClick={scrollToDestinations}
              className="bg-travel-500 hover:bg-travel-600 text-white group"
              size="lg"
            >
              <Search size={18} className="mr-2" />
              Explore Destinations
              <ArrowDown size={16} className="ml-2 transition-transform group-hover:translate-y-1" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 group">
              <Map size={18} className="mr-2" />
              Browse Map
            </Button>
          </motion.div>
          
          {/* Animated tags with nature theme */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {["Adventure", "Nature", "Culture", "Beach", "Mountains", "Temples", "Forests", "Rivers"].map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              >
                <Badge className="bg-white/20 text-white backdrop-blur-sm py-1.5 px-3 text-xs">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Animated scroll indicator */}
      <motion.div 
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Button 
          onClick={scrollToDestinations}
          variant="ghost" 
          size="icon"
          className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
        >
          <ArrowDown className="h-5 w-5" />
        </Button>
      </motion.div>
      
      {/* Compass indicator */}
      <motion.div
        className="absolute top-8 right-8 hidden md:flex items-center gap-2 text-white"
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: isVisible ? 1 : 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Compass size={24} className="animate-pulse-slow" />
        <span className="text-sm font-medium">Yogyakarta, Indonesia</span>
      </motion.div>

      {/* Floating leaves animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -20, 
              rotate: Math.random() * 360 
            }}
            animate={{ 
              y: window.innerHeight + 50,
              rotate: Math.random() * 720,
            }}
            transition={{ 
              duration: 15 + Math.random() * 15, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 20 
            }}
            style={{ left: `${Math.random() * 100}%` }}
          >
            <Trees size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

import { Badge } from "@/components/ui/badge";
export default HeroSection;
