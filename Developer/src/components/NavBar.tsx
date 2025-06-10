
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Sun, Moon, MapPin, Heart, ShoppingCart, LogOut, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { useTheme } from './ThemeProvider';
import { UserLocation } from '@/types';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavBarProps {
  userLocation?: UserLocation;
}

const NavBar = ({ userLocation }: NavBarProps) => {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  // Get wishlist and cart state
  const { wishlist } = useWishlist();
  const { bookings } = useCart();
  
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navLinkStyles = 'text-travel-700 hover:text-travel-900 dark:text-travel-300 dark:hover:text-white cursor-pointer transition-colors';
  
  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Destinasi', path: '/destinasi' },
    { name: 'Tentang', path: '/about' },
    { name: 'Kontak', path: '/contact' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 shadow-md backdrop-blur-sm border-b border-travel-100 dark:border-slate-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="font-bold text-2xl text-travel-800 dark:text-travel-100 flex items-center gap-2">
            <span className="text-yogya-500">Travel</span>
            <span>Mate</span>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={navLinkStyles}>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {userLocation?.loaded && !userLocation?.error && (
            <div className="hidden md:flex items-center mr-2">
              <MapPin className="h-4 w-4 text-travel-500 mr-1" />
              <span className="text-sm text-travel-600 dark:text-travel-400">
                {userLocation.alamat?.split(',')[0] || 'Lokasi Terdeteksi'}
              </span>
            </div>
          )}
          
          {user && (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/wishlist" className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-travel-700 hover:text-travel-900 dark:text-travel-300 dark:hover:text-white"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 h-5 w-5 flex items-center justify-center p-0 text-white font-medium text-xs">
                    {wishlist.length}
                  </Badge>
                )}
              </Link>
              
              <Link to="/checkout" className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-travel-700 hover:text-travel-900 dark:text-travel-300 dark:hover:text-white"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                {bookings.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-green-500 h-5 w-5 flex items-center justify-center p-0 text-white font-medium text-xs">
                    {bookings.length}
                  </Badge>
                )}
              </Link>
            </div>
          )}
          

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6 text-travel-700 dark:text-travel-300" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white dark:bg-slate-900 border-l border-travel-100 dark:border-slate-800">
              <div className="flex flex-col h-full">
                <div className="space-y-4 py-4">
                  <div className="flex items-center justify-between mb-6">
                    <Link to="/" className="font-bold text-xl text-travel-800 dark:text-travel-100">
                      <span className="text-yogya-500">Travel</span>
                      <span>Mate</span>
                    </Link>
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={`text-lg font-medium ${navLinkStyles}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                    
                    {user && (
                      <>
                        <div className="pt-4 mt-4 border-t border-travel-100 dark:border-slate-800">
                          <Link
                            to="/wishlist"
                            className="flex items-center text-lg font-medium text-travel-700 hover:text-travel-900 dark:text-travel-300 dark:hover:text-white"
                            onClick={() => setMenuOpen(false)}
                          >
                            <Heart className="h-5 w-5 mr-2" />
                            Wishlist
                            {wishlist.length > 0 && (
                              <Badge className="ml-2 bg-red-500 text-white">{wishlist.length}</Badge>
                            )}
                          </Link>
                        </div>
                        
                        <div>
                          <Link
                            to="/checkout"
                            className="flex items-center text-lg font-medium text-travel-700 hover:text-travel-900 dark:text-travel-300 dark:hover:text-white"
                            onClick={() => setMenuOpen(false)}
                          >
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Keranjang
                            {bookings.length > 0 && (
                              <Badge className="ml-2 bg-green-500 text-white">{bookings.length}</Badge>
                            )}
                          </Link>
                        </div>
                      </>
                    )}
                  </nav>
                </div>
                
                <div className="mt-auto pt-4 border-t border-travel-100 dark:border-slate-800">
                  {user ? (
                    <div className="space-y-4">
                      <div className="text-sm text-muted-foreground">
                        Signed in as {user.email}
                      </div>
                      <Button 
                        onClick={() => {
                          handleSignOut();
                          setMenuOpen(false);
                        }}
                        variant="outline"
                        className="w-full"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          navigate('/login');
                          setMenuOpen(false);
                        }}
                        className="border-travel-200 dark:border-slate-700 text-travel-700 dark:text-travel-300"
                      >
                        Masuk
                      </Button>
                      <Button 
                        onClick={() => {
                          navigate('/register');
                          setMenuOpen(false);
                        }}
                        className="bg-yogya-500 hover:bg-yogya-600 text-white"
                      >
                        Daftar
                      </Button>
                    </div>
                  )}
                  
                  {userLocation?.loaded && !userLocation?.error && (
                    <div className="flex items-center justify-center mt-4 text-sm text-travel-600 dark:text-travel-400">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{userLocation.alamat?.split(',')[0] || 'Lokasi Terdeteksi'}</span>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {user ? (
            <div className="hidden md:flex items-center ml-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center ml-4 space-x-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="border-travel-200 dark:border-slate-700 text-travel-700 dark:text-travel-300"
              >
                Masuk
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="bg-yogya-500 hover:bg-yogya-600 text-white"
              >
                Daftar
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
