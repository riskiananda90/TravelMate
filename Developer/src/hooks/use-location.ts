
import { useState, useEffect } from 'react';
import { LokasiPengguna } from '@/types';
import { toast } from '@/hooks/use-toast';

export const useLocation = () => {
  const [location, setLocation] = useState<LokasiPengguna>({
    latitude: 0,
    longitude: 0,
    loaded: false,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        loaded: true,
        error: "Geolocation is not supported by your browser"
      }));
      toast({
        title: "Location Error",
        description: "Geolocation is not supported by your browser. We'll use default location (Yogyakarta).",
        variant: "destructive"
      });
      
      // Set default location to Yogyakarta
      setLocation({
        latitude: -7.797068,
        longitude: 110.370529,
        alamat: "Yogyakarta, Indonesia",
        loaded: true
      });
      return;
    }

    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      
      // Try to reverse geocode the coordinates to get address
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
          setLocation({
            latitude,
            longitude,
            alamat: data.display_name,
            loaded: true
          });
          toast({
            title: "Location Found",
            description: `Your current location: ${data.display_name}`,
          });
        })
        .catch(() => {
          setLocation({
            latitude,
            longitude,
            loaded: true
          });
        });
    };

    const error = () => {
      setLocation(prev => ({
        ...prev,
        loaded: true,
        error: "Unable to retrieve your location"
      }));
      toast({
        title: "Location Error",
        description: "Unable to retrieve your location. Using default location (Yogyakarta).",
        variant: "destructive"
      });
      
      // Set default location to Yogyakarta
      setLocation({
        latitude: -7.797068,
        longitude: 110.370529,
        alamat: "Yogyakarta, Indonesia",
        loaded: true
      });
    };

    toast({
      title: "Finding your location",
      description: "Please allow location access for personalized recommendations",
    });
    
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return location;
};
