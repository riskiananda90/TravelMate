
import { Button } from "@/components/ui/button";
import { ArrowDown, Map, Search, Wind } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const backgroundImages = [
  "/borobudur.jpg", 
  "/prambanan.jpg",
  "/parangtritis.jpg", 
  "/tamansari.jpg"
];

const EnhancedHeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const tagOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const scrollToDestinations = () => {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleWeather = () => {
    toast({
      title: "Weather Information",
      description: "Current weather in Yogyakarta: Sunny, 30°C",
    });
  };

  return (
    <div ref={scrollRef} className="relative h-[100vh] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url(${backgroundImages[currentImageIndex]})`,
            y: backgroundY,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-travel-800/40 to-yogya-800/40"></div>
        </motion.div>
        
        <motion.div 
          className="relative h-full flex flex-col items-center justify-center text-center px-4"
          style={{ opacity, y: textY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-3xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              <span className="block">Jelajahi</span>
              <span className="text-gradient bg-gradient-to-r from-yogya-300 to-travel-300 bg-clip-text text-transparent">Yogyakarta</span>
              <span className="block">Sesuai Budget</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl text-white/90 mb-12 max-w-2xl mx-auto"
            >
              Temukan destinasi impian yang sesuai dengan anggaran dan preferensi perjalanan Anda
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button 
                onClick={scrollToDestinations}
                className="bg-travel-500 hover:bg-travel-600 text-white group px-6 py-6 text-lg"
                size="lg"
              >
                <Search size={20} className="mr-2" />
                Explore Destinations
                <ArrowDown size={18} className="ml-2 transition-transform group-hover:translate-y-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white/10 group px-6 py-6 text-lg"
              >
                <Map size={20} className="mr-2" />
                Browse Map
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Interactive Weather Button */}
        <motion.div 
          className="absolute top-10 right-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Button 
            onClick={toggleWeather}
            size="sm"
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full flex items-center gap-2 px-4"
          >
            <Wind size={16} className="animate-pulse" />
            <span>30°C</span>
          </Button>
        </motion.div>
        
        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Button 
            onClick={scrollToDestinations}
            variant="ghost" 
            size="icon"
            className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/10 shadow-glow"
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Destination Tags - modified to fade out on scroll */}
        <motion.div 
          className="absolute bottom-20 left-0 right-0 flex justify-center overflow-hidden"
          style={{ opacity: tagOpacity }}
        >
          <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
            {["Adventure", "Culture", "Beach", "Mountains", "Temples", "Cuisine", "Art", "History"].map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              >
                <Badge className="bg-white/10 text-white backdrop-blur-sm px-3 py-1.5 border border-white/10 hover:bg-white/20 cursor-pointer">
                  #{tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedHeroSection;
