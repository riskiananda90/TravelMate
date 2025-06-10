
import { TujuanWisata } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from '@/utils/calculations';
import { MapPin, Info, Calendar, ChevronRight, Star, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import KomentarDestinasi from "./KomentarDestinasi";

interface KartuDestinasiProps {
  destinasi: TujuanWisata;
}

export const KartuDestinasi = ({ destinasi }: KartuDestinasiProps) => {
  const [tampilkanDetail, setTampilkanDetail] = useState(false);
  const [tabAktif, setTabAktif] = useState("informasi");
  
  // Gambar tambahan untuk carousel
  const gambarTambahan = [
    destinasi.gambar,
    `/additional/${destinasi.id}-1.jpg`,
    `/additional/${destinasi.id}-2.jpg`,
  ];

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in group bg-white dark:bg-slate-800 border-travel-200 dark:border-slate-700 hover:border-travel-400 dark:hover:border-travel-500">
      <div className="relative">
        <Link to={`/destinasi/${destinasi.id}`}>
          <Carousel className="w-full">
            <CarouselContent>
              {gambarTambahan.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={img} 
                      alt={`${destinasi.nama} - tampilan ${index + 1}`}
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
              <CarouselPrevious className="h-8 w-8 left-2 bg-white/80 dark:bg-slate-800/80" />
              <CarouselNext className="h-8 w-8 right-2 bg-white/80 dark:bg-slate-800/80" />
            </div>
          </Carousel>
        </Link>
        
        <div className="absolute top-2 right-2 z-10">
          <Badge className="bg-travel-600 text-white font-medium flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
            {destinasi.rating}
          </Badge>
        </div>
        
        {destinasi.jarak !== undefined && (
          <div className="absolute bottom-2 left-2 z-10">
            <Badge variant="outline" className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-gray-800 dark:text-gray-200">
              {destinasi.jarak} km dari lokasi Anda
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-travel-800 dark:text-travel-100">{destinasi.nama}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate text-xs">{destinasi.lokasi.alamat}</span>
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-travel-600 dark:text-travel-400 p-1 h-auto"
            onClick={() => setTampilkanDetail(!tampilkanDetail)}
          >
            <Info size={18} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <p className="text-sm line-clamp-2 text-gray-600 dark:text-gray-300">
          {destinasi.deskripsi}
        </p>
        
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 text-xs text-travel-600 dark:text-travel-300">
            <Calendar size={12} />
            <span>{destinasi.jamBuka || "09:00 - 17:00"}</span>
          </div>
          {destinasi.komentar && (
            <div className="flex items-center gap-1 text-xs text-travel-600 dark:text-travel-300">
              <MessageSquare size={12} />
              <span>{destinasi.komentar.length} ulasan</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <Collapsible open={tampilkanDetail} onOpenChange={setTampilkanDetail}>
        <CollapsibleContent className="px-4 pb-2 animate-accordion-down">
          <Tabs defaultValue="informasi" value={tabAktif} onValueChange={setTabAktif} className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="informasi">Informasi</TabsTrigger>
              <TabsTrigger value="ulasan">Ulasan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="informasi" className="mt-0">
              <div className="p-3 rounded-md bg-travel-50 dark:bg-slate-700/50 border border-travel-100 dark:border-slate-600 mb-3">
                <h4 className="text-sm font-medium text-travel-800 dark:text-travel-100 mb-1 flex items-center">
                  <Calendar size={14} className="mr-1" /> Waktu Terbaik Untuk Kunjungan
                </h4>
                <p className="text-xs text-travel-600 dark:text-travel-300">
                  {destinasi.waktuTerbaikUntukMengunjungi || "Sepanjang tahun bagus untuk dikunjungi!"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-travel-50 dark:bg-slate-700/50 rounded-md">
                  <p className="text-travel-800 dark:text-travel-100 font-medium">Kategori</p>
                  <p className="text-travel-600 dark:text-travel-300">{destinasi.kategori || "Tempat Wisata"}</p>
                </div>
                <div className="p-2 bg-travel-50 dark:bg-slate-700/50 rounded-md">
                  <p className="text-travel-800 dark:text-travel-100 font-medium">Jam Buka</p>
                  <p className="text-travel-600 dark:text-travel-300">{destinasi.jamBuka || "09:00 - 17:00"}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ulasan" className="mt-0 max-h-80 overflow-y-auto">
              {destinasi.komentar && destinasi.komentar.length > 0 ? (
                <div className="space-y-3">
                  {destinasi.komentar.map((komentar) => (
                    <div key={komentar.id} className="p-3 bg-travel-50 dark:bg-slate-700/50 rounded-md border border-travel-100 dark:border-slate-600">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-xs text-travel-700 dark:text-travel-200">{komentar.namaPengguna}</span>
                        <div className="flex items-center">
                          <Star size={12} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-xs ml-0.5">{komentar.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-travel-600 dark:text-travel-300 line-clamp-2">{komentar.pesan}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-xs text-travel-500 dark:text-travel-400">Belum ada ulasan</p>
                </div>
              )}
              <Button 
                variant="ghost" 
                className="w-full mt-2 text-xs text-travel-600 dark:text-travel-300 hover:text-travel-800 dark:hover:text-travel-100"
              >
                Lihat Semua Ulasan
              </Button>
            </TabsContent>
          </Tabs>
        </CollapsibleContent>
      </Collapsible>
      
      <CardFooter className="p-4 pt-0 flex flex-col items-start">
        <div className="w-full grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-travel-700 dark:text-travel-300">Tiket Masuk</p>
            <p className="font-medium text-travel-800 dark:text-travel-100">{formatRupiah(destinasi.biaya.masuk)}</p>
          </div>
          <div>
            <p className="text-travel-700 dark:text-travel-300">Makanan</p>
            <p className="font-medium text-travel-800 dark:text-travel-100">{formatRupiah(destinasi.biaya.makanan)}</p>
          </div>
          <div>
            <p className="text-travel-700 dark:text-travel-300">Penginapan</p>
            <p className="font-medium text-travel-800 dark:text-travel-100">{formatRupiah(destinasi.biaya.penginapan)}</p>
          </div>
          {destinasi.biayaPerjalanan !== undefined && (
            <div>
              <p className="text-travel-700 dark:text-travel-300">Biaya Perjalanan</p>
              <p className="font-medium text-travel-800 dark:text-travel-100">{formatRupiah(destinasi.biayaPerjalanan)}</p>
            </div>
          )}
        </div>
        
        {destinasi.totalBiaya !== undefined && (
          <div className="mt-3 w-full">
            <div className="flex justify-between items-center mt-2 border-t pt-2 border-travel-100 dark:border-slate-700">
              <span className="font-semibold text-travel-800 dark:text-travel-100">Total Biaya</span>
              <span className="font-bold text-travel-600 dark:text-travel-300">
                {formatRupiah(destinasi.totalBiaya)}
              </span>
            </div>
            
            <Link to={`/destinasi/${destinasi.id}`} className="block w-full">
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

export default KartuDestinasi;
