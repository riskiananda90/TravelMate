
import { useLocation } from '@/hooks/use-location';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Info, MapPin, Calendar, Heart } from 'lucide-react';

const About = () => {
  const lokasi = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-travel-50 dark:bg-slate-900">
      <NavBar userLocation={lokasi} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-travel-800 dark:text-travel-100 mb-3">
              Tentang TravelMate
            </h1>
            <p className="text-travel-600 dark:text-travel-400 max-w-2xl mx-auto">
              Menemukan wisata terbaik di Yogyakarta dengan cara yang mudah dan personal
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-travel-200 dark:border-slate-700 overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src="/borobudur.jpg" 
                  alt="Borobudur Temple" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-travel-800 dark:text-travel-100 mb-3">
                  Visi Kami
                </h2>
                <p className="text-travel-600 dark:text-travel-400">
                  Menjadi platform perjalanan terkemuka yang membantu wisatawan menemukan 
                  destinasi terbaik di Yogyakarta dengan pengalaman perjalanan yang personal dan autentik.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-travel-200 dark:border-slate-700 overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src="/parangtritis.jpg" 
                  alt="Parangtritis Beach" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-travel-800 dark:text-travel-100 mb-3">
                  Misi Kami
                </h2>
                <p className="text-travel-600 dark:text-travel-400">
                  Menyediakan informasi wisata terpercaya dengan harga transparan, membantu 
                  wisatawan membuat keputusan terbaik serta mendukung pariwisata berkelanjutan
                  di Yogyakarta.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-travel-800 dark:text-travel-100 mb-6 flex items-center">
              <Info className="mr-2 text-travel-600 dark:text-travel-400" />
              Cerita Kami
            </h2>
            
            <Card className="border-travel-200 dark:border-slate-700">
              <CardContent className="p-6 space-y-4 text-travel-700 dark:text-travel-300">
                <p>
                  TravelMate dimulai dari kecintaan kami terhadap keindahan budaya dan alam Yogyakarta. 
                  Sebagai kota dengan sejarah panjang dan kaya akan destinasi wisata, Yogyakarta menawarkan 
                  pengalaman yang unik bagi setiap pengunjung.
                </p>
                
                <p>
                  Kami menyadari bahwa merencanakan perjalanan bisa menjadi rumit dan menghabiskan waktu. 
                  Mencari informasi tentang harga tiket masuk, jarak tempuh, dan biaya tambahan lainnya 
                  dari berbagai sumber dapat membingungkan.
                </p>
                
                <p>
                  TravelMate hadir untuk menyederhanakan proses ini. Kami menyediakan platform yang memungkinkan 
                  wisatawan menjelajahi berbagai destinasi di Yogyakarta, melihat informasi penting seperti biaya, 
                  jarak, dan ulasan, serta merencanakan perjalanan dengan mudah.
                </p>
                
                <p>
                  Dengan fitur peta interaktif, perhitungan jarak berdasarkan lokasi Anda, dan sistem pemesanan 
                  yang sederhana, TravelMate bertujuan memberikan pengalaman terbaik mulai dari perencanaan 
                  hingga kunjungan ke tempat wisata.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-travel-800 dark:text-travel-100 mb-6 flex items-center">
              <Heart className="mr-2 text-travel-600 dark:text-travel-400" />
              Nilai-Nilai Kami
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-travel-200 dark:border-slate-700">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-travel-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-travel-600 dark:text-travel-400" />
                  </div>
                  <h3 className="font-bold text-travel-800 dark:text-travel-100 mb-2">Akurasi</h3>
                  <p className="text-travel-600 dark:text-travel-400 text-sm">
                    Kami berkomitmen menyediakan informasi yang akurat tentang lokasi, biaya, dan 
                    detail destinasi wisata.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-travel-200 dark:border-slate-700">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-travel-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-travel-600 dark:text-travel-400" />
                  </div>
                  <h3 className="font-bold text-travel-800 dark:text-travel-100 mb-2">Kemudahan</h3>
                  <p className="text-travel-600 dark:text-travel-400 text-sm">
                    Platform kami dirancang untuk memudahkan pengguna dalam merencanakan 
                    perjalanan tanpa kerumitan.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-travel-200 dark:border-slate-700">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-travel-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-travel-600 dark:text-travel-400" />
                  </div>
                  <h3 className="font-bold text-travel-800 dark:text-travel-100 mb-2">Keberlanjutan</h3>
                  <p className="text-travel-600 dark:text-travel-400 text-sm">
                    Kami mendukung pariwisata berkelanjutan yang menghormati budaya lokal dan 
                    lingkungan alam Yogyakarta.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="text-center">
            <h2 className="text-xl font-bold text-travel-800 dark:text-travel-100 mb-3">
              Mulai Jelajahi Yogyakarta Bersama Kami
            </h2>
            <p className="text-travel-600 dark:text-travel-400">
              TravelMate - Partner perjalanan terbaik untuk pengalaman wisata di Yogyakarta
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
