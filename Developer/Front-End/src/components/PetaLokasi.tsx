
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from '@/hooks/use-location';
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PetaLokasiProps {
  destinationLat: number;
  destinationLng: number;
  destinationName: string;
}

const PetaLokasi = ({ destinationLat, destinationLng, destinationName }: PetaLokasiProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const userLocation = useLocation();

  useEffect(() => {
    let iframeLoaded = false;
    
    const createStaticMap = () => {
      if (!mapRef.current || iframeLoaded) return;
      
      // Create iframe for embedded OpenStreetMap
      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '0.5rem';
      
      // Construct the OSM URL
      const zoom = 14;
      const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${destinationLng - 0.01}%2C${destinationLat - 0.01}%2C${destinationLng + 0.01}%2C${destinationLat + 0.01}&layer=mapnik&marker=${destinationLat}%2C${destinationLng}`;
      
      iframe.src = osmUrl;
      
      // Clear the container and append the iframe
      if (mapRef.current.firstChild) {
        mapRef.current.removeChild(mapRef.current.firstChild);
      }
      
      mapRef.current.appendChild(iframe);
      iframeLoaded = true;
      setMapLoaded(true);
    };
    
    // Create and attach the map
    createStaticMap();
    
    return () => {
      // Clean up if needed
    };
  }, [destinationLat, destinationLng]);

  const bukaMapDireksi = () => {
    if (userLocation.loaded && !userLocation.error) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${destinationLat},${destinationLng}`;
      window.open(url, '_blank');
    } else {
      // Jika lokasi pengguna tidak tersedia, gunakan destinasi saja
      const url = `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full">
        {!mapLoaded && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-travel-600"></div>
          </div>
        )}
      </div>
      <div className="absolute bottom-2 left-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-3 py-1 rounded-md text-xs text-gray-700 dark:text-gray-200">
        {destinationName}
      </div>
      
      <div className="absolute top-2 right-2">
        <Button 
          onClick={bukaMapDireksi}
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 text-xs px-2 py-1 h-auto"
        >
          <Navigation className="h-3 w-3" />
          Arahkan ke Sini
        </Button>
      </div>
    </div>
  );
};

export default PetaLokasi;
