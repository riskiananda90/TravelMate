
import { useState } from 'react';
import { useLocation } from '@/hooks/use-location';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Mail, MapPin, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const lokasi = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Pesan Terkirim",
        description: "Terima kasih telah menghubungi kami. Kami akan segera membalas pesan Anda.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-white dark:from-slate-900 dark:to-slate-800">
      <NavBar userLocation={lokasi} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative py-20 bg-gradient-to-r from-travel-800 to-slate-800 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('/additional/mountains.png')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center"
              >
                <MessageSquare className="mr-3 text-yogya-400" />
                <span>Hubungi Kami</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-300"
              >
                Punya pertanyaan atau masukan? Kami siap membantu Anda merencanakan perjalanan terbaik di Yogyakarta
              </motion.p>
            </div>
          </div>
        </motion.section>
        
        {/* Contact Cards */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-travel-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-travel-100 dark:bg-slate-800 flex items-center justify-center mb-4 shadow-inner">
                    <Mail className="w-7 h-7 text-travel-600 dark:text-travel-400" />
                  </div>
                  <h3 className="text-lg font-bold text-travel-800 dark:text-travel-100 mb-2">Email</h3>
                  <a href="mailto:info@travelmate.id" className="text-yogya-600 dark:text-yogya-400 hover:underline hover:text-yogya-700 transition-colors">
                    info@travelmate.id
                  </a>
                  <p className="text-travel-600 dark:text-travel-400 text-sm mt-2">
                    Kami akan membalas dalam 24 jam
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-travel-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-travel-100 dark:bg-slate-800 flex items-center justify-center mb-4 shadow-inner">
                    <Phone className="w-7 h-7 text-travel-600 dark:text-travel-400" />
                  </div>
                  <h3 className="text-lg font-bold text-travel-800 dark:text-travel-100 mb-2">Telepon</h3>
                  <a href="tel:+62274123456" className="text-yogya-600 dark:text-yogya-400 hover:underline hover:text-yogya-700 transition-colors">
                    +62 274 123456
                  </a>
                  <p className="text-travel-600 dark:text-travel-400 text-sm mt-2">
                    Senin-Jumat: 09.00 - 17.00 WIB
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-travel-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-travel-100 dark:bg-slate-800 flex items-center justify-center mb-4 shadow-inner">
                    <MapPin className="w-7 h-7 text-travel-600 dark:text-travel-400" />
                  </div>
                  <h3 className="text-lg font-bold text-travel-800 dark:text-travel-100 mb-2">Lokasi</h3>
                  <p className="text-travel-600 dark:text-travel-400">
                    Jl. Malioboro No. 123<br />
                    Yogyakarta, Indonesia
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
          
        {/* Contact Form and Map */}
        <section className="py-8 md:py-12 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-travel-200 dark:border-slate-700 shadow-lg overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-travel-800 dark:text-travel-100 mb-6 flex items-center">
                    <Send className="w-6 h-6 mr-3 text-travel-500 dark:text-travel-400" />
                    Kirim Pesan
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-travel-700 dark:text-travel-300 mb-1">
                        Nama Lengkap
                      </label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        placeholder="Masukkan nama lengkap Anda"
                        className="border-travel-200 dark:border-slate-700 focus:border-travel-500 focus:ring-travel-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-travel-700 dark:text-travel-300 mb-1">
                        Email
                      </label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        placeholder="email@example.com"
                        className="border-travel-200 dark:border-slate-700 focus:border-travel-500 focus:ring-travel-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-travel-700 dark:text-travel-300 mb-1">
                        Subjek
                      </label>
                      <Input 
                        id="subject" 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleChange} 
                        required 
                        placeholder="Subjek pesan Anda"
                        className="border-travel-200 dark:border-slate-700 focus:border-travel-500 focus:ring-travel-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-travel-700 dark:text-travel-300 mb-1">
                        Pesan
                      </label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        rows={5} 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                        placeholder="Tulis pesan Anda di sini..."
                        className="border-travel-200 dark:border-slate-700 focus:border-travel-500 focus:ring-travel-500 resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-yogya-500 hover:bg-yogya-600 text-white w-full py-2 text-base font-medium"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="mr-2 animate-spin">⏳</span>
                          Mengirim...
                        </>
                      ) : (
                        <>Kirim Pesan</>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="border-travel-200 dark:border-slate-700 shadow-lg overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-travel-800 dark:text-travel-100 mb-6 flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-travel-500 dark:text-travel-400" />
                    Lokasi Kami
                  </h2>
                  
                  <div className="h-[350px] md:h-[400px] rounded-lg overflow-hidden border border-travel-200 dark:border-slate-700 shadow-md">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.836775792328!2d110.36337407486374!3d-7.792915677376538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5803e5d2c339%3A0xd90cbb83f251ec17!2sMalioboro%20Street!5e0!3m2!1sen!2sid!4v1680757291201!5m2!1sen!2sid" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="TravelMate Office Location"
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  
                  <div className="mt-4 text-travel-600 dark:text-travel-400 text-sm p-4 bg-travel-50 dark:bg-slate-800 rounded-md">
                    <div className="flex items-start">
                      <MapPin className="mr-2 mt-0.5" size={16} />
                      <div>
                        <p className="font-medium">Kantor TravelMate</p>
                        <p>Jl. Malioboro No. 123, Yogyakarta, Indonesia</p>
                      </div>
                    </div>
                    <div className="flex items-start mt-2">
                      <Clock className="mr-2 mt-0.5" size={16} />
                      <div>
                        <p className="font-medium">Jam Operasional:</p>
                        <p>09.00 - 17.00 WIB (Senin - Jumat)</p>
                        <p>10.00 - 14.00 WIB (Sabtu)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-travel-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-center text-travel-800 dark:text-travel-100 mb-8">
                Pertanyaan Umum
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    q: "Apakah TravelMate menyediakan jasa pemandu wisata?",
                    a: "Saat ini TravelMate fokus menyediakan informasi wisata dan pemesanan tiket. Kami memiliki mitra pemandu wisata yang dapat dihubungi melalui aplikasi kami."
                  },
                  {
                    q: "Bagaimana cara memesan tiket wisata melalui TravelMate?",
                    a: "Anda dapat mencari destinasi wisata yang diinginkan, memilih tanggal kunjungan, dan melakukan pembayaran secara online melalui aplikasi kami."
                  },
                  {
                    q: "Apakah pembayaran di TravelMate aman?",
                    a: "Ya, TravelMate menggunakan sistem pembayaran yang aman dan terenkripsi. Kami bekerja sama dengan penyedia jasa pembayaran terpercaya."
                  },
                  {
                    q: "Bagaimana cara membatalkan pesanan?",
                    a: "Pembatalan dapat dilakukan melalui halaman 'Pesanan Saya' di akun Anda. Syarat dan ketentuan pembatalan berbeda untuk setiap destinasi wisata."
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow border border-travel-200 dark:border-slate-700"
                  >
                    <h3 className="font-medium text-travel-800 dark:text-travel-100 mb-2">{item.q}</h3>
                    <p className="text-travel-600 dark:text-travel-400 text-sm">{item.a}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
    </div>
  );
};

const Clock = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={2} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx={12} cy={12} r={10} />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default Contact;
