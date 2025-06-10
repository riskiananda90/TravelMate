
import { TujuanWisata } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from '@/utils/calculations';
import { MapPin, Info, Calendar, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";

interface DestinationCardProps {
  destination: TujuanWisata;
}

export const DestinationCard = ({ destination }: DestinationCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Additional images for carousel
  const additionalImages = [
    destination.gambar,
    `/additional/${destination.id}-1.jpg`,
    `/additional/${destination.id}-2.jpg`,
  ];

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in group bg-white border-travel-200 hover:border-travel-400">
      <div className="relative">
        <Link to={`/destinasi/${destination.id}`}>
          <Carousel className="w-full">
            <CarouselContent>
              {additionalImages.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={img} 
                      alt={`${destination.nama} - view ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <CarouselPrevious className="h-8 w-8 left-2 bg-white/80" />
              <CarouselNext className="h-8 w-8 right-2 bg-white/80" />
            </div>
          </Carousel>
        </Link>
        
        <div className="absolute top-2 right-2 z-10">
          <Badge className="bg-travel-600 text-white font-medium">
            {destination.rating} ★
          </Badge>
        </div>
        
        {destination.jarak !== undefined && (
          <div className="absolute bottom-2 left-2 z-10">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm text-gray-800">
              {destination.jarak} km away
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-travel-800">{destination.nama}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate text-xs">{destination.lokasi.alamat}</span>
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-travel-600 p-1 h-auto"
            onClick={() => setShowDetails(!showDetails)}
          >
            <Info size={18} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <p className="text-sm line-clamp-2 text-gray-600">
          {destination.deskripsi}
        </p>
      </CardContent>
      
      <Collapsible open={showDetails} onOpenChange={setShowDetails}>
        <CollapsibleContent className="px-4 pb-2 animate-accordion-down">
          <div className="p-3 rounded-md bg-travel-50 border border-travel-100 mb-3">
            <h4 className="text-sm font-medium text-travel-800 mb-1 flex items-center">
              <Calendar size={14} className="mr-1" /> Waktu Kunjung Terbaik
            </h4>
            <p className="text-xs text-travel-600">
              {destination.waktuTerbaikUntukMengunjungi || "Sepanjang tahun!"}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-travel-50 rounded-md">
              <p className="text-travel-800 font-medium">Kategori</p>
              <p>{destination.kategori || "Tempat Wisata"}</p>
            </div>
            <div className="p-2 bg-travel-50 rounded-md">
              <p className="text-travel-800 font-medium">Jam Buka</p>
              <p>{destination.jamBuka || "09:00 - 17:00"}</p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <CardFooter className="p-4 pt-0 flex flex-col items-start">
        <div className="w-full grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-travel-700">Tiket Masuk</p>
            <p className="font-medium">{formatRupiah(destination.biaya.masuk)}</p>
          </div>
          <div>
            <p className="text-travel-700">Makanan</p>
            <p className="font-medium">{formatRupiah(destination.biaya.makanan)}</p>
          </div>
          <div>
            <p className="text-travel-700">Penginapan</p>
            <p className="font-medium">{formatRupiah(destination.biaya.penginapan)}</p>
          </div>
          {destination.biayaPerjalanan !== undefined && (
            <div>
              <p className="text-travel-700">Biaya Perjalanan</p>
              <p className="font-medium">{formatRupiah(destination.biayaPerjalanan)}</p>
            </div>
          )}
        </div>
        
        {destination.totalBiaya !== undefined && (
          <div className="mt-3 w-full">
            <div className="flex justify-between items-center mt-2 border-t pt-2 border-travel-100">
              <span className="font-semibold text-travel-800">Total Biaya</span>
              <span className="font-bold text-travel-600">
                {formatRupiah(destination.totalBiaya)}
              </span>
            </div>
            
            <Link to={`/destinasi/${destination.id}`} className="block w-full">
              <Button className="w-full mt-3 bg-yogya-500 hover:bg-yogya-600 text-white group">
                Lihat Detail
                <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default DestinationCard;
