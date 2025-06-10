
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ShoppingCart, Trash, CreditCard, Calendar, Check, Plus, Minus, Receipt, Ticket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from '@/hooks/use-location';
import { useCart } from '@/context/CartContext';
import { formatRupiah } from '@/utils/calculations';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { EmptyState } from '@/components/EmptyState';

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [pesanSuccess, setPesanSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [transactionId, setTransactionId] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const lokasi = useLocation();
  const { bookings, removeBooking, updateBookingQuantity, clearCart, getTotalPrice } = useCart();
  
  const handleRemoveItem = (id: string | number) => {
    removeBooking(id);
    toast({
      title: "Item dihapus",
      description: "Item berhasil dihapus dari keranjang.",
      variant: "default",
    });
  };
  
  const handleUpdateQuantity = (id: string | number, current: number, change: number) => {
    const newQuantity = current + change;
    if (newQuantity > 0) {
      updateBookingQuantity(id, newQuantity);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (bookings.length === 0) {
      toast({
        title: "Keranjang Kosong",
        description: "Silakan tambahkan tiket ke keranjang terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }
    
    // Process payment
    setLoading(true);
    
    // Generate transaction ID
    const generatedId = `TRX-${Math.floor(Math.random() * 1000000)}`;
    setTransactionId(generatedId);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setPesanSuccess(true);
      
      // Clear cart after successful payment
      clearCart();
      
      toast({
        title: "Pembayaran Berhasil",
        description: "Tiket Anda telah berhasil dibeli.",
        variant: "default",
      });
    }, 2000);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (pesanSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-travel-50 dark:bg-slate-900">
        <NavBar userLocation={lokasi} />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto mt-8">
            <Card className="border-travel-200 dark:border-slate-700">
              <CardHeader className="flex items-center justify-center bg-travel-50 dark:bg-slate-800 pb-6 pt-8 border-b border-travel-100 dark:border-slate-700">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-travel-800 dark:text-travel-100 text-center mb-2">
                  Transaksi Berhasil
                </h2>
                <p className="text-travel-600 dark:text-travel-400 max-w-md text-center">
                  Terima kasih telah melakukan pemesanan. Tiket elektronik akan dikirimkan ke email Anda.
                </p>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6">
                {/* Struk/Receipt Section */}
                <div className="border border-dashed border-travel-300 dark:border-slate-600 rounded-lg p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-travel-200 dark:border-slate-700 pb-4">
                    <div className="flex items-center gap-3">
                      <Receipt className="h-6 w-6 text-travel-600 dark:text-travel-400" />
                      <h3 className="font-medium text-travel-800 dark:text-travel-100 text-lg">
                        E-Ticket / Detail Pesanan
                      </h3>
                    </div>
                    <div className="bg-travel-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-travel-800 dark:text-travel-100">
                        LUNAS
                      </span>
                    </div>
                  </div>
                  
                  {/* Transaction Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-travel-600 dark:text-travel-400">Nomor Transaksi:</div>
                      <div className="font-medium text-travel-800 dark:text-travel-100">{transactionId}</div>
                    </div>
                    <div>
                      <div className="text-travel-600 dark:text-travel-400">Tanggal Pembelian:</div>
                      <div className="font-medium text-travel-800 dark:text-travel-100">
                        {new Date().toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Customer Info */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-travel-700 dark:text-travel-300">Detail Pemesan:</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-travel-600 dark:text-travel-400">Lokasi Anda:</div>
                        <div className="font-medium text-travel-800 dark:text-travel-100">
                          {lokasi?.alamat || "Lokasi tidak tersedia"}
                        </div>
                      </div>
                      <div>
                        <div className="text-travel-600 dark:text-travel-400">Metode Pembayaran:</div>
                        <div className="font-medium text-travel-800 dark:text-travel-100 capitalize">
                          {paymentMethod === 'transfer' ? 'Transfer Bank' : 
                           paymentMethod === 'ewallet' ? 'E-Wallet' : 'Bayar di Tempat'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Ticket Details */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-travel-700 dark:text-travel-300">Detail Tiket:</h4>
                    
                    {bookings.map((booking, index) => (
                      <div key={booking.destinasi.id} className="bg-travel-50 dark:bg-slate-800 rounded-md p-4 space-y-3">
                        <div className="flex justify-between">
                          <h5 className="font-medium text-travel-800 dark:text-travel-100">
                            {booking.destinasi.nama}
                          </h5>
                          <div className="flex items-center gap-1">
                            <Ticket className="h-4 w-4 text-travel-600 dark:text-travel-400" />
                            <span className="text-sm text-travel-600 dark:text-travel-400">
                              x{booking.jumlahTiket}
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-travel-600 dark:text-travel-400">Lokasi:</span>
                            <span className="text-travel-800 dark:text-travel-100">
                              {booking.destinasi.lokasi.alamat}
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-travel-600 dark:text-travel-400">Tanggal Kunjungan:</span>
                            <span className="text-travel-800 dark:text-travel-100">
                              {formatDate(booking.tanggalKunjungan)}
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-travel-600 dark:text-travel-400">Harga per Tiket:</span>
                            <span className="text-travel-800 dark:text-travel-100">
                              {formatRupiah(booking.destinasi.biaya.masuk)}
                            </span>
                          </div>
                          
                          {booking.destinasi.jarak && (
                            <div className="flex justify-between">
                              <span className="text-travel-600 dark:text-travel-400">Jarak dari Anda:</span>
                              <span className="text-travel-800 dark:text-travel-100">
                                {booking.destinasi.jarak.toFixed(1)} km
                              </span>
                            </div>
                          )}
                          
                          <div className="flex justify-between font-medium border-t border-travel-200 dark:border-slate-700 pt-2 mt-2">
                            <span className="text-travel-700 dark:text-travel-300">Total:</span>
                            <span className="text-travel-800 dark:text-travel-100">
                              {formatRupiah(booking.destinasi.biaya.masuk * booking.jumlahTiket)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Grand Total */}
                  <div className="bg-travel-100 dark:bg-slate-800 rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-travel-600 dark:text-travel-400 text-sm">Subtotal</div>
                        <div className="text-travel-800 dark:text-travel-100 font-bold text-lg">
                          {formatRupiah(getTotalPrice())}
                        </div>
                      </div>
                      <div>
                        <div className="text-travel-600 dark:text-travel-400 text-sm">Biaya Layanan</div>
                        <div className="text-travel-800 dark:text-travel-100 font-bold">
                          {formatRupiah(5000)}
                        </div>
                      </div>
                      <div>
                        <div className="text-travel-600 dark:text-travel-400 text-sm">Total Pembayaran</div>
                        <div className="text-yogya-600 dark:text-yogya-400 font-bold text-xl">
                          {formatRupiah(getTotalPrice() + 5000)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-travel-600 dark:text-travel-400 pt-2">
                    Silakan tunjukkan e-ticket ini saat berkunjung ke destinasi wisata
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0 flex flex-col space-y-3">
                <Button 
                  className="w-full bg-yogya-500 hover:bg-yogya-600 text-white"
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
          
          <h1 className="text-2xl md:text-3xl font-bold mt-2 text-travel-800 dark:text-travel-100 flex items-center">
            <ShoppingCart className="mr-3 w-6 h-6 text-travel-600 dark:text-travel-400" />
            Checkout
          </h1>
          <p className="text-travel-600 dark:text-travel-400 mt-1">
            Selesaikan pembelian tiket Anda
          </p>
        </div>
        
        {bookings.length === 0 ? (
          <EmptyState 
            icon={ShoppingCart}
            title="Keranjang Anda Kosong"
            description="Jelajahi destinasi wisata dan pesan tiket untuk mulai menambahkan ke keranjang."
            action={
              <Button 
                onClick={() => navigate('/')}
                className="bg-travel-600 hover:bg-travel-700 text-white"
              >
                Jelajahi Destinasi
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="border-travel-200 dark:border-slate-700 mb-6">
                <CardHeader className="pb-2">
                  <h3 className="font-bold text-lg text-travel-800 dark:text-travel-100">
                    Keranjang Anda
                  </h3>
                  <p className="text-travel-600 dark:text-travel-400 text-sm">
                    {bookings.length} item dalam keranjang
                  </p>
                </CardHeader>
                
                <CardContent className="p-4">
                  {bookings.map((item) => (
                    <div key={item.destinasi.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b border-travel-100 dark:border-slate-700 last:border-b-0">
                      <div className="w-full sm:w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.destinasi.gambar}
                          alt={item.destinasi.nama}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h4 className="font-medium text-travel-800 dark:text-travel-100">
                          {item.destinasi.nama}
                        </h4>
                        
                        <div className="flex items-center text-xs text-travel-600 dark:text-travel-400 mt-1">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          {new Date(item.tanggalKunjungan).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      
                      <div className="flex items-center w-full sm:w-auto mt-2 sm:mt-0">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-md border-travel-200 dark:border-slate-700"
                          onClick={() => handleUpdateQuantity(item.destinasi.id, item.jumlahTiket, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="mx-2 text-travel-800 dark:text-travel-100 w-8 text-center">
                          {item.jumlahTiket}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-md border-travel-200 dark:border-slate-700"
                          onClick={() => handleUpdateQuantity(item.destinasi.id, item.jumlahTiket, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right w-full sm:w-auto mt-2 sm:mt-0 flex flex-col items-end">
                        <div className="font-medium text-travel-800 dark:text-travel-100">
                          {formatRupiah(item.destinasi.biaya.masuk * item.jumlahTiket)}
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemoveItem(item.destinasi.id)}
                        >
                          <Trash className="h-3.5 w-3.5 mr-1" /> Hapus
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card className="border-travel-200 dark:border-slate-700">
                <CardHeader className="pb-2">
                  <h3 className="font-bold text-lg text-travel-800 dark:text-travel-100 flex items-center">
                    <CreditCard className="mr-2 w-5 h-5 text-travel-600 dark:text-travel-400" />
                    Metode Pembayaran
                  </h3>
                </CardHeader>
                
                <CardContent className="p-4">
                  <form onSubmit={handleSubmit}>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-3 border-travel-200 dark:border-slate-700">
                        <RadioGroupItem value="transfer" id="transfer" />
                        <Label htmlFor="transfer" className="flex-grow">Transfer Bank</Label>
                        <div className="flex gap-1">
                          <div className="w-8 h-5 rounded bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs text-blue-800 dark:text-blue-200 font-medium">BRI</div>
                          <div className="w-8 h-5 rounded bg-red-100 dark:bg-red-900 flex items-center justify-center text-xs text-red-800 dark:text-red-200 font-medium">BNI</div>
                          <div className="w-10 h-5 rounded bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center text-xs text-yellow-800 dark:text-yellow-200 font-medium">BCA</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3 border-travel-200 dark:border-slate-700">
                        <RadioGroupItem value="ewallet" id="ewallet" />
                        <Label htmlFor="ewallet" className="flex-grow">E-Wallet</Label>
                        <div className="flex gap-1">
                          <div className="w-12 h-5 rounded bg-green-100 dark:bg-green-900 flex items-center justify-center text-xs text-green-800 dark:text-green-200 font-medium">GOPAY</div>
                          <div className="w-12 h-5 rounded bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-xs text-purple-800 dark:text-purple-200 font-medium">OVO</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3 border-travel-200 dark:border-slate-700">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash">Bayar di Tempat (Cash)</Label>
                      </div>
                    </RadioGroup>
                    
                    <Button
                      type="submit"
                      className="w-full mt-6 bg-yogya-500 hover:bg-yogya-600 text-white"
                      disabled={loading || bookings.length === 0}
                    >
                      {loading ? "Memproses..." : "Bayar Sekarang"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="border-travel-200 dark:border-slate-700 sticky top-20">
                <CardHeader className="pb-2">
                  <h3 className="font-bold text-lg text-travel-800 dark:text-travel-100">
                    Ringkasan Pesanan
                  </h3>
                </CardHeader>
                
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    {bookings.map((item) => (
                      <div key={item.destinasi.id} className="flex justify-between text-sm">
                        <span className="text-travel-700 dark:text-travel-300">
                          {item.destinasi.nama} ({item.jumlahTiket}x)
                        </span>
                        <span className="text-travel-800 dark:text-travel-100">
                          {formatRupiah(item.destinasi.biaya.masuk * item.jumlahTiket)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-travel-700 dark:text-travel-300">Subtotal</span>
                      <span className="text-travel-800 dark:text-travel-100">{formatRupiah(getTotalPrice())}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-travel-700 dark:text-travel-300">Biaya layanan</span>
                      <span className="text-travel-800 dark:text-travel-100">{formatRupiah(5000)}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <span className="text-travel-800 dark:text-travel-100">Total</span>
                    <span className="text-travel-600 dark:text-travel-300">{formatRupiah(getTotalPrice() + 5000)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      
    </div>
  );
};

export default Checkout;
