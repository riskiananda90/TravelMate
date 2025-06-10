import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Mountain, Trees, Compass, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Get current path for display
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
      console.error(
        "404 Error: User attempted to access non-existent route:",
        window.location.pathname
      );
    }
    setIsVisible(true);
  }, []);

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('/borobudur.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Parallax background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute bottom-0 w-full opacity-30"
          style={{
            animation: 'float 8s ease-in-out infinite'
          }}
        >
          <div className="w-full h-[30vh]">
            <Mountain className="w-full h-full text-white/20" />
          </div>
        </div>
        
        <div 
          className="absolute bottom-0 w-full opacity-40"
          style={{
            animation: 'float 6s ease-in-out infinite 1s'
          }}
        >
          <div className="w-full h-[25vh]">
            <Trees className="w-full h-full text-white/30" />
          </div>
        </div>
      </div>

      {/* Floating leaves animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/20 animate-pulse"
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <Trees size={Math.random() * 15 + 8} />
          </div>
        ))}
      </div>

      {/* Compass indicator */}
      <div
        className={`absolute top-8 right-8 hidden md:flex items-center gap-2 text-white transition-all duration-800 ${
          isVisible ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'
        }`}
      >
        <Compass size={24} className="animate-pulse" />
        <span className="text-sm font-medium">Lost in Yogyakarta</span>
      </div>

      {/* Main content */}
      <div className="text-center px-4 max-w-2xl mx-auto z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Mountain size={40} className="text-yogya-400 animate-bounce" />
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-2 text-shadow-lg">
              4<span className="text-yogya-400">0</span>4
            </h1>
            <Trees size={40} className="text-yogya-400 animate-bounce delay-75" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 text-shadow">
            Oops! You've Lost Your Way
          </h2>
          <p className="text-lg text-white/90 mb-2 text-shadow">
            It seems like you've wandered off the beaten path in Yogyakarta
          </p>
          <p className="text-base text-white/80 mb-8 text-shadow">
            The page you're looking for doesn't exist, but there's still so much to explore!
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-travel-500 hover:bg-travel-600 text-white group"
            size="lg"
          >
            <Home size={18} className="mr-2" />
            Return to Home
            <MapPin size={16} className="ml-2 transition-transform group-hover:scale-110" />
          </Button>
          
          <Button 
            onClick={() => window.history.back()}
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white/10 group"
          >
            <Compass size={18} className="mr-2" />
            Go Back
          </Button>
        </motion.div>

        {/* Suggested routes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <p className="text-white/80 mb-4 text-sm">Or explore these popular destinations:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Borobudur Temple", path: "/destinations/borobudur" },
              { name: "Malioboro Street", path: "/destinations/malioboro" },
              { name: "Prambanan Temple", path: "/destinations/prambanan" },
              { name: "Taman Sari", path: "/destinations/tamansari" }
            ].map((destination, i) => (
              <motion.a
                key={destination.name}
                href={destination.path}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 py-2 px-4 rounded-full text-sm border border-white/30 hover:border-white/50"
              >
                {destination.name}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Error path display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8 text-white/60 text-xs"
        >
          Attempted path: <code className="bg-black/30 px-2 py-1 rounded">{location.pathname}</code>
        </motion.div>
      </div>

      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-travel-800/20 to-yogya-800/20 z-10"></div>
    </div>
  );
};

export default NotFound;