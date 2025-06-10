
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Map, 
  Heart, 
  ShoppingBag, 
  X, 
  ChevronUp, 
  Star,
  CalendarDays,
  Compass,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { wishlist } = useWishlist();
  const { bookings } = useCart();
  const navigate = useNavigate();

  // Show assistant after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Assistant buttons
  const assistantButtons = [
    {
      icon: <Map className="h-5 w-5" />,
      label: "Destinasi",
      action: () => navigate("/destinasi"),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: <Heart className="h-5 w-5" />,
      label: `Wishlist${wishlist.length > 0 ? ` (${wishlist.length})` : ""}`,
      action: () => navigate("/wishlist"),
      color: "bg-red-500 hover:bg-red-600",
      badge: wishlist.length > 0
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      label: `Keranjang${bookings.length > 0 ? ` (${bookings.length})` : ""}`,
      action: () => navigate("/checkout"),
      color: "bg-blue-500 hover:bg-blue-600",
      badge: bookings.length > 0
    },
    {
      icon: <Star className="h-5 w-5" />,
      label: "Promo",
      action: () => {
        toast({
          title: "Promo Spesial!",
          description: "Dapatkan diskon 25% untuk pemesanan liburan Anda berikutnya! Gunakan kode: TRAVEL25",
        });
      },
      color: "bg-yellow-500 hover:bg-yellow-600"
    },
    {
      icon: <CalendarDays className="h-5 w-5" />,
      label: "Events",
      action: () => {
        toast({
          title: "Coming Soon!",
          description: "Fitur events akan segera hadir untuk Anda!",
        });
      },
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      icon: <Compass className="h-5 w-5" />,
      label: "Navigate",
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsOpen(false);
      },
      color: "bg-travel-500 hover:bg-travel-600"
    }
  ];

  // Spring animation variants
  const containerVariants = {
    open: { 
      scale: 1,
      transition: { 
        staggerChildren: 0.05, 
        delayChildren: 0.1 
      }
    },
    closed: { 
      scale: 0.8, 
      transition: { 
        staggerChildren: 0.05, 
        staggerDirection: -1 
      }
    }
  };

  const itemVariants = {
    open: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={containerVariants}
            className="mb-4 flex flex-col gap-2 items-end"
          >
            {assistantButtons.map((button, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-2"
              >
                <motion.div
                  className="bg-white dark:bg-slate-800 py-1 px-3 rounded-full shadow-lg text-sm font-medium"
                >
                  {button.label}
                </motion.div>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={button.action}
                  className={`${button.color} rounded-full p-3 text-white shadow-lg relative`}
                >
                  {button.icon}
                  {button.badge && (
                    <span className="absolute -top-1 -right-1 bg-white text-xs text-travel-800 w-4 h-4 flex items-center justify-center rounded-full">
                      !
                    </span>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "bg-yogya-500" : "bg-travel-500"
        } rounded-full p-4 text-white shadow-lg flex items-center justify-center`}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <PlusCircle className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingAssistant;
