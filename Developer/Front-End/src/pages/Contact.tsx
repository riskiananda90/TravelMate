
import { useState } from 'react';
import { useLocation } from '@/hooks/use-location';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Contact as ContactIcon, Mail, MapPin, Phone } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-travel-50 dark:bg-slate-900">
      <NavBar userLocation={lokasi} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-travel-800 dark:text-travel-100 mb-3 flex items-center justify-center">
              <ContactIcon className="mr-3 text-travel-600 dark:text-travel-400" />
              Hubungi Kami
            </h1>
            <p className="text-travel-600 dark:text-travel-400 max-w-2xl mx-auto">
              Punya pertanyaan atau masukan? Kami siap membantu Anda merencanakan perjalanan terbaik di Yogyakarta
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="border-travel-200 dark:border-slate-700">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-travel-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-travel-600 dark:text-travel-400" />
                </div>
                <h3 className="font-bold text-travel-800 dark:text-travel-100 mb-2">Email</h3>
                <a href="mailto:info@travelmate.id" className="text-yogya-600 dark:text-yogya-400 hover:underline">
                  info@travelmate.id
                </a>
                <p className="text-travel-600 dark:text-travel-400 text-sm mt-2">
                  Kami akan membalas dalam 24 jam
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-travel-200 dark:border-slate-700">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-travel-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-travel-600 dark:text-travel-400" />
                </div>
                <h3 className="font-bold text-travel-800 dark:text-travel-100 mb-2">Telepon</h3>
                <a href="tel:+62274123456" className="text-yogya-600 dark:text-yogya-400 hover:underline">
                  +62 274 123456
                </a>
                <p className="text-travel-600 dark:text-travel-400 text-sm mt-2">
                  Senin-Jumat: 09.00 - 17.00 WIB
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-travel-200 dark:border-slate-700">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-travel-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-travel-600 dark:text-travel-400" />
                </div>
                <h3 className="font-bold text-travel-800 dark:text-travel-100 mb-2">Lokasi</h3>
                <p className="text-travel-600 dark:text-travel-400">
                  Jl. Malioboro No. 123<br />
                  Yogyakarta, Indonesia
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-travel-800 dark:text-travel-100 mb-6">
                Kirim Pesan
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="border-travel-200 dark:border-slate-700"
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
                    className="border-travel-200 dark:border-slate-700"
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
                    className="border-travel-200 dark:border-slate-700"
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
                    className="border-travel-200 dark:border-slate-700 resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-yogya-500 hover:bg-yogya-600 text-white w-full"
                  disabled={loading}
                >
                  {loading ? "Mengirim..." : "Kirim Pesan"}
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-travel-800 dark:text-travel-100 mb-6">
                Lokasi Kami
              </h2>
              
              <div className="h-[400px] rounded-lg overflow-hidden border border-travel-200 dark:border-slate-700">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.836775792328!2d110.36337407486374!3d-7.792915677376538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5803e5d2c339%3A0xd90cbb83f251ec17!2sMalioboro%20Street!5e0!3m2!1sen!2sid!4v1680757291201!5m2!1sen!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TravelMate Office Location"
                ></iframe>
              </div>
              
              <div className="mt-4 text-travel-600 dark:text-travel-400 text-sm">
                <p>
                  Kami berada di jantung kota Yogyakarta, di jalan Malioboro yang ikonik.
                  Silakan kunjungi kantor kami untuk informasi langsung mengenai destinasi wisata di Yogyakarta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
