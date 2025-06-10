
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { destinasiWisata } from '@/data/destinations';
import { formatRupiah } from '@/utils/calculations';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, Calendar, User, CreditCard, ShoppingCart, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from '@/hooks/use-location';
import { useCart } from '@/context/CartContext';

const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const [destinasi, setDestinasi] = useState(destinasiWisata.find(d => d.id.toString() === id));
  const [jumlahTiket, setJumlahTiket] = useState(1);
  const [tanggalKunjungan, setTanggalKunjungan] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [loading, setLoading] = useState(false);
  const [pesanSuccess, setPesanSuccess] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const lokasi = useLocation();
  const { addBooking } = useCart();
  
  useEffect(() => {
    if (id) {
      const foundDestinasi = destinasiWisata.find(d => d.id.toString() === id);
      if (foundDestinasi) {
        setDestinasi(foundDestinasi);
      } else {
        // Redirect if destination not found
        navigate('/');
        toast({
          title: "Destinasi tidak ditemukan",
          description: "Maaf, destinasi yang Anda cari tidak tersedia.",
          variant: "destructive",
        });
      }
    }
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    setTanggalKunjungan(formattedDate);
  }, [id, navigate, toast]);
  
  const handleJumlahTiketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setJumlahTiket(value);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tanggalKunjungan) {
      toast({
        title: "Tanggal Kunjungan Diperlukan",
        description: "Silakan pilih tanggal kunjungan Anda.",
        variant: "destructive",
      });
      return;
    }
    
    if (!nama || !email || !nomorTelepon) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Silakan lengkapi semua data yang diperlukan.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (destinasi) {
        addBooking({
          destinasi,
          jumlahTiket,
          tanggalKunjungan
        });
        
        setLoading(false);
        setPesanSuccess(true);
        
        toast({
          title: "Pemesanan Berhasil",
          description: "Tiket berhasil ditambahkan ke keranjang Anda.",
          variant: "default",
        });
      }
    }, 1500);
  };
  
  if (!destinasi) {
    return (
      <div className="min-h-screen flex flex-col bg-travel-50 dark:bg-slate-900">
        <NavBar userLocation={lokasi} />
        <main className="flex-grow flex items-center justify-center">
          <p>Memuat informasi destinasi...</p>
        </main>
      </div>
    );
  }
  
  const totalHarga = jumlahTiket * destinasi.biaya.masuk;
  
  if (pesanSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-travel-50 dark:bg-slate-900">
        <NavBar userLocation={lokasi} />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto mt-8">
            <Card className="border-travel-200 dark:border-slate-700">
              <CardHeader className="flex items-center justify-center bg-travel-50 dark:bg-slate-800 pb-6 pt-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-travel-800 dark:text-travel-100 text-center">
                  Tiket Berhasil Ditambahkan
                </h2>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                <p className="text-center text-travel-600 dark:text-travel-400">
                  Tiket untuk {destinasi.nama} telah berhasil ditambahkan ke keranjang Anda.
                </p>
                
                <div className="bg-travel-50 dark:bg-slate-800 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-travel-700 dark:text-travel-300">Jumlah Tiket:</span>
                    <span className="font-medium text-travel-800 dark:text-travel-100">{jumlahTiket} tiket</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-travel-700 dark:text-travel-300">Tanggal Kunjungan:</span>
                    <span className="font-medium text-travel-800 dark:text-travel-100">
                      {new Date(tanggalKunjungan).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-travel-200 dark:border-slate-700">
                    <span className="font-medium text-travel-700 dark:text-travel-300">Total Harga:</span>
                    <span className="font-bold text-travel-800 dark:text-travel-100">{formatRupiah(totalHarga)}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0 flex flex-col space-y-3">
                <Button 
                  className="w-full bg-yogya-500 hover:bg-yogya-600 text-white"
                  onClick={() => navigate('/checkout')}
                >
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  Lanjutkan ke Pembayaran
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-travel-200 dark:border-slate-700 text-travel-700 dark:text-travel-300"
                  onClick={() => navigate('/')}
                >
                  Kembali ke Beranda
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-travel-50 dark:bg-slate-900">
      <NavBar userLocation={lokasi} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-travel-700 dark:text-travel-300"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={16} className="mr-1" />
            Kembali
          </Button>
          
          <h1 className="text-2xl md:text-3xl font-bold mt-2 text-travel-800 dark:text-travel-100">
            Pesan Tiket
          </h1>
          <p className="text-travel-600 dark:text-travel-400 mt-1">
            {destinasi.nama}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="border-travel-200 dark:border-slate-700">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-travel-800 dark:text-travel-100 flex items-center">
                        <Calendar className="mr-2 w-5 h-5 text-travel-600 dark:text-travel-400" />
                        Informasi Kunjungan
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tanggalKunjungan">Tanggal Kunjungan</Label>
                          <Input
                            id="tanggalKunjungan"
                            type="date"
                            value={tanggalKunjungan}
                            onChange={(e) => setTanggalKunjungan(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="border-travel-200 dark:border-slate-700"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="jumlahTiket">Jumlah Tiket</Label>
                          <Input
                            id="jumlahTiket"
                            type="number"
                            value={jumlahTiket}
                            onChange={handleJumlahTiketChange}
                            min="1"
                            className="border-travel-200 dark:border-slate-700"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-travel-800 dark:text-travel-100 flex items-center">
                        <User className="mr-2 w-5 h-5 text-travel-600 dark:text-travel-400" />
                        Informasi Pemesan
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="nama">Nama Lengkap</Label>
                          <Input
                            id="nama"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className="border-travel-200 dark:border-slate-700"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="border-travel-200 dark:border-slate-700"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="nomorTelepon">Nomor Telepon</Label>
                            <Input
                              id="nomorTelepon"
                              value={nomorTelepon}
                              onChange={(e) => setNomorTelepon(e.target.value)}
                              className="border-travel-200 dark:border-slate-700"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-travel-800 dark:text-travel-100 flex items-center">
                        <CreditCard className="mr-2 w-5 h-5 text-travel-600 dark:text-travel-400" />
                        Informasi Harga
                      </h3>
                      
                      <div className="bg-travel-50 dark:bg-slate-800 p-4 rounded-md space-y-2">
                        <div className="flex justify-between">
                          <span className="text-travel-700 dark:text-travel-300">Harga Tiket</span>
                          <span className="text-travel-800 dark:text-travel-100">{formatRupiah(destinasi.biaya.masuk)} x {jumlahTiket}</span>
                        </div>
                        
                        <Separator className="my-2" />
                        
                        <div className="flex justify-between font-bold">
                          <span className="text-travel-800 dark:text-travel-100">Total</span>
                          <span className="text-travel-600 dark:text-travel-300">{formatRupiah(totalHarga)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-yogya-500 hover:bg-yogya-600 text-white"
                        disabled={loading}
                      >
                        {loading ? "Memproses..." : "Tambahkan ke Keranjang"}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="border-travel-200 dark:border-slate-700">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={destinasi.gambar}
                  alt={destinasi.nama}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-travel-800 dark:text-travel-100">
                  {destinasi.nama}
                </h3>
                
                <p className="text-travel-600 dark:text-travel-400 text-sm mt-2">
                  {destinasi.lokasi.alamat}
                </p>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center border-b pb-2 border-travel-100 dark:border-slate-700">
                    <span className="text-travel-700 dark:text-travel-300">Tiket Masuk</span>
                    <span className="font-medium text-travel-800 dark:text-travel-100">{formatRupiah(destinasi.biaya.masuk)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default Booking;
