import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LetterPageProps {
  onComplete: () => void;
}

export default function LetterPage({ onComplete }: LetterPageProps) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isEnvelopeOpen) {
      setIsEnvelopeOpen(true);
      setTimeout(() => setShowLetter(true), 700);
    }
  };

  const handleCloseLetter = () => {
    setShowLetter(false);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-pink-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Dense floral background decoration - Responsive Full Optimized */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        
        {/* Bunga Bagian Atas — Di HP otomatis dikurangi menjadi 4 bunga agar tidak menumpuk */}
        <div className="absolute top-0 left-0 right-0 flex justify-between md:grid md:grid-cols-8">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`top-${i}`}
              className={`w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 flex-shrink-0 ${i >= 4 ? 'hidden md:block' : ''}`}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3 + i, repeat: Infinity }}
            >
              <img src="https://images.unsplash.com/photo-1596313922575-ec573dfef885?w=200" alt="" className="w-full h-full object-cover opacity-60 rounded-b-full" />
            </motion.div>
          ))}
        </div>

        {/* Bunga Bagian Bawah — Di HP otomatis dikurangi menjadi 4 bunga */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between md:grid md:grid-cols-8">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`bottom-${i}`}
              className={`w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 flex-shrink-0 ${i >= 4 ? 'hidden md:block' : ''}`}
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity }}
            >
              <img src="https://images.unsplash.com/photo-1587421976536-c2de1cac8bb3?w=200" alt="" className="w-full h-full object-cover opacity-60 rounded-t-full" />
            </motion.div>
          ))}
        </div>

        {/* ================= Bunga Melayang di Tengah (Floating Bulat) ================= */}
        
        {/* Top Left Floating — Mengecil di HP (w-14) dan menjauh ke sudut agar teks aman */}
        <motion.div 
          className="absolute top-[15%] left-[5%] md:top-1/4 md:left-1/4 w-14 h-14 md:w-24 md:h-24" 
          animate={{ rotate: 360 }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <img src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=100" alt="" className="w-full h-full object-cover opacity-40 md:opacity-50 rounded-full" />
        </motion.div>

        {/* Bottom Right Floating */}
        <motion.div 
          className="absolute bottom-[15%] right-[5%] md:top-2/3 md:right-1/4 w-14 h-14 md:w-24 md:h-24" 
          animate={{ rotate: -360 }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <img src="https://images.unsplash.com/photo-1589458456444-f7158a7e8a4f?w=100" alt="" className="w-full h-full object-cover opacity-40 md:opacity-50 rounded-full" />
        </motion.div>

        {/* Middle Left Floating */}
        <motion.div 
          className="absolute top-1/2 left-[2%] md:left-1/6 w-12 h-12 md:w-20 md:h-20" 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ duration: 3, repeat: Infinity }}
        >
          <img src="https://images.unsplash.com/photo-1587421976536-c2de1cac8bb3?w=100" alt="" className="w-full h-full object-cover opacity-40 md:opacity-50 rounded-full" />
        </motion.div>

        {/* Middle Right Floating */}
        <motion.div 
          className="absolute top-1/3 right-[2%] md:right-1/6 w-12 h-12 md:w-20 md:h-20" 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ duration: 4, repeat: Infinity }}
        >
          <img src="https://images.unsplash.com/photo-1596313922575-ec573dfef885?w=100" alt="" className="w-full h-full object-cover opacity-40 md:opacity-50 rounded-full" />
        </motion.div>

      </div>

      {/* ── ENVELOPE ── */}
      {/* Wrapper dengan perspective agar rotateX bekerja dengan benar */}
      <div style={{ perspective: "1000px" }} className="relative z-10 w-full flex justify-center">
        <AnimatePresence mode="wait">
          {!showLetter ? (
            // ── STATE 1: Amplop ditampilkan ──
            <motion.div
              key="envelope"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{
                // Amplop "mengempis" ke bawah sebelum kertas muncul
                scale: 0.5,
                opacity: 0,
                y: 80,
                rotateX: -60,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              style={{ transformOrigin: "bottom center" }}
              className="cursor-pointer flex flex-col items-center"
              onClick={handleEnvelopeClick}
            >
              <motion.p
                className="text-sm text-gray-400 uppercase tracking-widest mb-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Ketuk suratnya sayang
              </motion.p>

              <p className="text-lg font-serif text-gray-600 mb-6">
                <span className="text-gray-400 uppercase text-xs tracking-wider">From</span>{' '}
                <span className="italic">Daffa</span>
              </p>

              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                // Saat diklik: amplop "terlipat" ke atas sebelum hilang
                animate={
                  isEnvelopeOpen
                    ? { rotateX: 70, scaleY: 0.4, opacity: 0 }
                    : { rotateX: 0, scaleY: 1, opacity: 1 }
                }
                transition={{ duration: 0.45, ease: [0.4, 0, 1, 1] }}
                style={{ transformOrigin: "bottom center" }}
                className="relative"
              >
                <svg width="280" height="200" viewBox="0 0 280 200" fill="none" className="drop-shadow-2xl">
                  <rect x="20" y="40" width="240" height="140" rx="4" fill="url(#blueGradient)" stroke="#b8d4e8" strokeWidth="2"/>
                  <path d="M20 40 L140 120 L260 40" fill="url(#blueGradientLight)" stroke="#b8d4e8" strokeWidth="2"/>
                  <path d="M20 40 L140 120 L260 40" fill="none" stroke="#b8d4e8" strokeWidth="2"/>
                  <g transform="translate(110, 75)">
                    <circle cx="15" cy="15" r="3" fill="#e8b4d4"/>
                    <circle cx="10" cy="18" r="3" fill="#d4a5c4"/>
                    <circle cx="20" cy="18" r="3" fill="#d4a5c4"/>
                    <circle cx="12" cy="23" r="3" fill="#c495b4"/>
                    <circle cx="18" cy="23" r="3" fill="#c495b4"/>
                    <path d="M15 25 Q15 35, 15 40" stroke="#8a9a8a" strokeWidth="1.5" fill="none"/>
                    <path d="M15 30 L10 28" stroke="#8a9a8a" strokeWidth="1" fill="none"/>
                    <path d="M15 30 L20 28" stroke="#8a9a8a" strokeWidth="1" fill="none"/>
                    <circle cx="35" cy="20" r="2.5" fill="#e8b4d4"/>
                    <circle cx="30" cy="22" r="2.5" fill="#d4a5c4"/>
                    <circle cx="40" cy="22" r="2.5" fill="#d4a5c4"/>
                    <path d="M35 24 Q35 32, 35 36" stroke="#8a9a8a" strokeWidth="1.5" fill="none"/>
                  </g>
                  <g transform="translate(125, 95)">
                    <path d="M15 8 C15 8, 8 3, 4 6 C2 8, 2 10, 4 12 L15 22 L26 12 C28 10, 28 8, 26 6 C22 3, 15 8, 15 8 Z"
                          fill="white" stroke="#d4a5c4" strokeWidth="1.5" opacity="0.9"/>
                    <circle cx="15" cy="14" r="2" fill="#8a8a8a"/>
                    <rect x="14" y="14" width="2" height="4" rx="0.5" fill="#8a8a8a"/>
                  </g>
                  <defs>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d4e8f5"/>
                      <stop offset="100%" stopColor="#b8d4e8"/>
                    </linearGradient>
                    <linearGradient id="blueGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e8f4fa"/>
                      <stop offset="100%" stopColor="#d4e8f5"/>
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              <p className="text-lg font-serif text-gray-600 mt-6">
                <span className="text-gray-400 uppercase text-xs tracking-wider">For</span>{' '}
                <span className="italic">helga</span>
              </p>
            </motion.div>

          ) : (
            // ── STATE 2: Kertas muncul pop-out dari amplop ──
            <motion.div
              key="letter"
              initial={{
                scale: 0.15,      // mulai sangat kecil — masih "di dalam" amplop
                opacity: 0,
                y: 120,           // posisi awal di titik amplop (bawah)
                rotateX: 45,      // miring ke belakang, efek 3D terlipat
              }}
              animate={{
                scale: 1,         // tumbuh penuh
                opacity: 1,
                y: 0,             // naik ke tengah layar
                rotateX: 0,       // tegak sempurna
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
                y: 40,
                rotateX: 15,
              }}
              transition={{
                type: "spring",
                stiffness: 170,
                damping: 18,
                mass: 0.8,
              }}
              style={{ transformOrigin: "bottom center" }}
              className="relative max-w-2xl w-full"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border-4 border-pink-200 relative">
                <button
                  onClick={handleCloseLetter}
                  className="absolute top-4 right-4 p-2 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors"
                >
                  <X className="w-6 h-6 text-pink-600" />
                </button>

                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-8">
                    Hai, sayangkuuu...
                  </h2>

                  <div className="font-lato text-justify text-gray-700 text-[16px] leading-relaxed space-y-6">
                    <p className="">
                      Sayang, hari ini adalah hari spesialmu, jujur aku gabisa dan gasuka kata kata
                      formal untuk hal seperti ini, tapi kali ini izinn ya buat sedikit formal hehe.
                    </p>
                    <p className="">
                      Setiap momen yang kita lalui bersama selalu menjadi kenangan dan pelajaran perjalanan
                      di hubungan ini. Tawa, air mata, dan semua emosi yang kita bagi telah memperkuat ikatan kita.
                    </p>
                    <p className="">
                      Memang ngga selalu mudah, tapi aku percaya setiap tantangan yang kita hadapi justru membuat kita
                      lebih kuat dan lebih dekat satu sama lain. Terimakasih sudah selalu sabar, pengertian dan penuh kasih sayang.
                    </p>
                    <p className="">
                      Semoga tahun ini membawa semua doa dan harapan baikmu terkabul, dan semoga kamu selalu dikelilingi orang orang baik
                      serta menjadi pribadi yang lebih baik lagi. Aku selalu mendoakan yang terbaik untukmu, karena kamu pantas mendapatkannya.
                    </p>
                    <p className="">
                      Terimakasih sudah menjadi bagian terbesar dalam hidupku selama 4 tahun terakhir dan semoga selamanya sampai maut memisahkan kita. ❤️
                    </p>
                    <p className="text-right text-pink-500 mt-8 italic">
                      Daffa Afaf Firmansyah
                    </p>
                  </div>

                  <p className="text-center text-sm text-gray-500 mt-6">
                    Klik tombol ✕ untuk menutup surat...
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}