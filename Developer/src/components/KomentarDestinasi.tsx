import { useState } from 'react';
import { Komentar } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  MessageSquare, 
  Send, 
  Star, 
  ThumbsUp, 
  Calendar, 
  User 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

interface KomentarDestinasiProps {
  komentar: Komentar[];
  destinasiId: string | number;
}

export const KomentarDestinasi = ({ komentar, destinasiId }: KomentarDestinasiProps) => {
  const [komentarBaru, setKomentarBaru] = useState('');
  const [ratingBaru, setRatingBaru] = useState(5);
  const [expandedKomentar, setExpandedKomentar] = useState<number | null>(null);
  const [komentarBalasan, setKomentarBalasan] = useState<string>('');
  const [tampilkanFormKomentar, setTampilkanFormKomentar] = useState(false);

  const handleKirimKomentar = () => {
    if (komentarBaru.trim() === '') {
      toast({
        title: "Komentar tidak boleh kosong",
        description: "Silakan tulis komentar Anda sebelum mengirim",
        variant: "destructive"
      });
      return;
    }

    // Simulasi pengiriman komentar
    toast({
      title: "Komentar berhasil dikirim!",
      description: "Terima kasih atas ulasan Anda",
    });
    
    setKomentarBaru('');
    setRatingBaru(5);
    setTampilkanFormKomentar(false);
  };

  const handleToggleBalasan = (id: number) => {
    if (expandedKomentar === id) {
      setExpandedKomentar(null);
    } else {
      setExpandedKomentar(id);
    }
    setKomentarBalasan('');
  };

  const handleKirimBalasan = (komentarId: number) => {
    if (komentarBalasan.trim() === '') {
      toast({
        title: "Balasan tidak boleh kosong",
        description: "Silakan tulis balasan Anda sebelum mengirim",
        variant: "destructive"
      });
      return;
    }

    // Simulasi pengiriman balasan
    toast({
      title: "Balasan berhasil dikirim!",
      description: "Terima kasih atas partisipasi Anda",
    });
    
    setKomentarBalasan('');
    setExpandedKomentar(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 invisible h-0">
          <MessageSquare className="w-5 h-5 text-travel-600" />
          <h3 className="text-xl font-semibold text-travel-800">Ulasan Pengunjung</h3>
        </div>
        <Button 
          onClick={() => setTampilkanFormKomentar(!tampilkanFormKomentar)}
          className="bg-yogya-500 hover:bg-yogya-600 text-white ml-auto"
        >
          {tampilkanFormKomentar ? 'Tutup Form' : 'Tulis Ulasan'}
        </Button>
      </div>

      {tampilkanFormKomentar && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 border border-travel-100 dark:border-slate-700"
        >
          <h4 className="text-lg font-medium mb-3 text-travel-800 dark:text-travel-100">Tulis Ulasan Anda</h4>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-travel-700 dark:text-travel-200">Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRatingBaru(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= ratingBaru 
                        ? 'text-yellow-500 fill-yellow-500' 
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-travel-600 dark:text-travel-300">
                {ratingBaru}/5
              </span>
            </div>
          </div>
          
          <Textarea
            placeholder="Bagikan pengalaman Anda tentang destinasi ini..."
            value={komentarBaru}
            onChange={(e) => setKomentarBaru(e.target.value)}
            className="mb-3 min-h-[100px]"
          />
          
          <div className="flex justify-end">
            <Button 
              onClick={handleKirimKomentar}
              className="bg-yogya-500 hover:bg-yogya-600 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Kirim Ulasan
            </Button>
          </div>
        </motion.div>
      )}

      {komentar && komentar.length > 0 ? (
        <div className="space-y-4">
          {komentar.map((item) => (
            <Card key={item.id} className="bg-white dark:bg-slate-800 border border-travel-100 dark:border-slate-700">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={item.fotoPengguna} alt={item.namaPengguna} />
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-travel-800 dark:text-travel-100">{item.namaPengguna}</p>
                      <div className="flex items-center text-sm text-travel-500 dark:text-travel-400">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        <span>{item.tanggal}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-travel-50 dark:bg-slate-700 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-travel-700 dark:text-travel-200">{item.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-gray-700 dark:text-gray-300">{item.pesan}</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <Button variant="ghost" size="sm" className="text-travel-600 hover:text-travel-800 dark:text-travel-400 dark:hover:text-travel-200">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Bantu
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-travel-600 hover:text-travel-800 dark:text-travel-400 dark:hover:text-travel-200"
                  onClick={() => handleToggleBalasan(item.id)}
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Balas
                </Button>
              </CardFooter>
              
              {/* Balasan */}
              {expandedKomentar === item.id && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-4 pt-0"
                >
                  <div className="border-t border-travel-100 dark:border-slate-700 pt-3 mt-1">
                    <Textarea
                      placeholder="Tulis balasan Anda..."
                      value={komentarBalasan}
                      onChange={(e) => setKomentarBalasan(e.target.value)}
                      className="mb-3"
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => handleKirimBalasan(item.id)}
                        size="sm"
                        className="bg-travel-500 hover:bg-travel-600 text-white"
                      >
                        Kirim Balasan
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Balasan yang sudah ada */}
              {item.balasan && item.balasan.length > 0 && (
                <div className="px-4 pb-3">
                  <div className="border-t border-travel-100 dark:border-slate-700 pt-3 mt-1">
                    {item.balasan.map((balasan, idx) => (
                      <div key={idx} className="pl-4 border-l-2 border-travel-200 dark:border-slate-700 mb-3 last:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={balasan.fotoPengguna} alt={balasan.namaPengguna} />
                            <AvatarFallback className="text-[10px]">
                              <User className="w-3 h-3" />
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-travel-700 dark:text-travel-300">{balasan.namaPengguna}</span>
                          <span className="text-xs text-travel-500 dark:text-travel-400">{balasan.tanggal}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{balasan.pesan}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-travel-50 dark:bg-slate-800 text-center py-8 rounded-lg border border-travel-100 dark:border-slate-700">
          <MessageSquare className="w-12 h-12 text-travel-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-travel-600 dark:text-travel-300 mb-2">Belum ada ulasan untuk destinasi ini</p>
          <p className="text-travel-500 dark:text-travel-400 text-sm mb-4">Jadilah yang pertama memberikan ulasan!</p>
          <Button 
            onClick={() => setTampilkanFormKomentar(true)}
            className="bg-yogya-500 hover:bg-yogya-600 text-white"
          >
            Tulis Ulasan
          </Button>
        </div>
      )}
    </div>
  );
};

export default KomentarDestinasi;
