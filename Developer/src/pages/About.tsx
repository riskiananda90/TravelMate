
import { useLocation } from '@/hooks/use-location';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Info, MapPin, Calendar, Heart, Users, Award, Sparkles, Mountain } from 'lucide-react';

const About = () => {
  const lokasi = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-travel-50 dark:bg-slate-900">
      <NavBar userLocation={lokasi} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative py-20 bg-gradient-to-r from-travel-900 to-slate-900 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('/additional/mountains.png')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Tentang <span className="text-yogya-400">TravelMate</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-300"
              >
                Menemukan wisata terbaik di Yogyakarta dengan cara yang mudah dan personal
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-8"
              >
                <Link to="/destinasi">
                  <Button className="bg-yogya-500 hover:bg-yogya-600 text-white font-medium">
                    Jelajahi Destinasi
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Vision & Mission */}
        <section className="py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-travel-200 dark:border-slate-700 overflow-hidden h-full shadow-md hover:shadow-lg transition-shadow">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src="/borobudur.jpg" 
                      alt="Borobudur Temple" 
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-travel-100 dark:bg-slate-700 flex items-center justify-center mr-3">
                        <Sparkles className="w-5 h-5 text-travel-600 dark:text-travel-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-travel-800 dark:text-travel-100">
                        Visi Kami
                      </h2>
                    </div>
                    <p className="text-travel-600 dark:text-travel-400">
                      Menjadi platform perjalanan terkemuka yang membantu wisatawan menemukan 
                      destinasi terbaik di Yogyakarta dengan pengalaman perjalanan yang personal dan autentik.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-travel-200 dark:border-slate-700 overflow-hidden h-full shadow-md hover:shadow-lg transition-shadow">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src="/parangtritis.jpg" 
                      alt="Parangtritis Beach" 
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-travel-100 dark:bg-slate-700 flex items-center justify-center mr-3">
                        <Mountain className="w-5 h-5 text-travel-600 dark:text-travel-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-travel-800 dark:text-travel-100">
                        Misi Kami
                      </h2>
                    </div>
                    <p className="text-travel-600 dark:text-travel-400">
                      Menyediakan informasi wisata terpercaya dengan harga transparan, membantu 
                      wisatawan membuat keputusan terbaik serta mendukung pariwisata berkelanjutan
                      di Yogyakarta.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 bg-travel-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-travel-800 dark:text-travel-100 mb-6 flex items-center justify-center">
                <Info className="mr-3 text-travel-600 dark:text-travel-400" />
                Cerita Kami
              </h2>
              
              <Card className="border-travel-200 dark:border-slate-700 max-w-4xl mx-auto shadow-md">
                <CardContent className="p-6 md:p-8 space-y-4 text-travel-700 dark:text-travel-300">
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
                  
                  <div className="flex justify-center md:justify-start">
                    <div className="grid grid-cols-2 gap-4 mt-4 max-w-md">
                      <div className="aspect-square overflow-hidden rounded-lg shadow-sm">
                        <img 
                          src="/additional/1-1.jpg" 
                          alt="Yogyakarta Experience" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-square overflow-hidden rounded-lg shadow-sm">
                        <img 
                          src="/additional/1-2.jpg" 
                          alt="Local Culture" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <p>
                    Dengan fitur peta interaktif, perhitungan jarak berdasarkan lokasi Anda, dan sistem pemesanan 
                    yang sederhana, TravelMate bertujuan memberikan pengalaman terbaik mulai dari perencanaan 
                    hingga kunjungan ke tempat wisata.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-travel-800 dark:text-travel-100 mb-8 flex items-center justify-center">
                <Award className="mr-3 text-travel-600 dark:text-travel-400" />
                Nilai-Nilai Kami
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-travel-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-travel-100 dark:bg-slate-700 flex items-center justify-center mb-4 shadow-inner">
                      <MapPin className="w-8 h-8 text-travel-600 dark:text-travel-400" />
                    </div>
                    <h3 className="text-xl font-bold text-travel-800 dark:text-travel-100 mb-2">Akurasi</h3>
                    <p className="text-travel-600 dark:text-travel-400">
                      Kami berkomitmen menyediakan informasi yang akurat tentang lokasi, biaya, dan 
                      detail destinasi wisata.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-travel-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-travel-100 dark:bg-slate-700 flex items-center justify-center mb-4 shadow-inner">
                      <Calendar className="w-8 h-8 text-travel-600 dark:text-travel-400" />
                    </div>
                    <h3 className="text-xl font-bold text-travel-800 dark:text-travel-100 mb-2">Kemudahan</h3>
                    <p className="text-travel-600 dark:text-travel-400">
                      Platform kami dirancang untuk memudahkan pengguna dalam merencanakan 
                      perjalanan tanpa kerumitan.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-travel-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-travel-100 dark:bg-slate-700 flex items-center justify-center mb-4 shadow-inner">
                      <Heart className="w-8 h-8 text-travel-600 dark:text-travel-400" />
                    </div>
                    <h3 className="text-xl font-bold text-travel-800 dark:text-travel-100 mb-2">Keberlanjutan</h3>
                    <p className="text-travel-600 dark:text-travel-400">
                      Kami mendukung pariwisata berkelanjutan yang menghormati budaya lokal dan 
                      lingkungan alam Yogyakarta.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Team */}
        <section className="py-16 bg-travel-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-travel-800 dark:text-travel-100 mb-8 flex items-center justify-center">
                <Users className="mr-3 text-travel-600 dark:text-travel-400" />
                Tim Kami
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { name: "Rizki Ananda", role: "ML + FE + BE", img: "/additional/2-1.jpg" },
                  { name: "Muhammad Rizki", role: "ML", img: "/additional/2-2.jpg" },
                  { name: "Najwa Shihab", role: "FE BE", img: "/additional/1-1.jpg" },
                ].map((member, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={member.img} 
                        alt={member.name} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-bold text-travel-800 dark:text-travel-100">{member.name}</h3>
                      <p className="text-sm text-travel-600 dark:text-travel-400">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-travel-800 dark:bg-slate-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-6"
              >
                Siap Menjelajahi Yogyakarta?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg mb-8 text-gray-300"
              >
                Bergabunglah dengan ribuan wisatawan yang telah menemukan pengalaman 
                terbaik di Yogyakarta bersama TravelMate
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link to="/destinasi">
                  <Button size="lg" className="bg-yogya-500 hover:bg-yogya-600 text-white font-medium">
                    Jelajahi Destinasi
                  </Button>
                </Link>
                
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Hubungi Kami
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default About;
