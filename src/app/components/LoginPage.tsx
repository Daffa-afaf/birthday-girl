import { useState } from 'react';
import { motion } from 'motion/react';
import { Delete } from 'lucide-react';

interface LoginPageProps {
  onSuccess: () => void;
}

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const [password, setPassword] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  
  // 📝 1. State teks interaktif menggunakan teks awal bawaan Anda
  const [errorMessage, setErrorMessage] = useState('masukin password dlu ya ayy...');

  const correctPassword = '300122';
  const maxLength = 6;

  // 📝 2. Daftar 5 kalimat pesan lucu yang berbeda saat salah password
  const funnyMessages = [
    "hihh passwordnya salah 😒",
    "masih salah, coba diingat lagi! 🤔",
    "salah lagi? yaampun parah bgt 🤦‍♀️",
    "bukan ituu, masa lupa sih ayy? 😭",
    "sekali lagi salah, parah bng sih! 😤"
  ];

  const handleNumberClick = (num: string) => {
    if (password.length < maxLength) {
      const newPassword = password + num;
      setPassword(newPassword);

      if (newPassword.length === maxLength) {
        if (newPassword === correctPassword) {
          setIsUnlocking(true);
          setErrorMessage("Yeyy bener! Membuka... ✨");

          // ======= 🎵 AWAL KODE MUSIK VIA INTERAKSI USER =======
          try {
            // Menyimpan objek musik ke variabel global 'window' agar tetap hidup saat ganti halaman
            (window as any).bgMusic = new Audio('/song/song.mp3');
            (window as any).bgMusic.loop = true;
            (window as any).bgMusic.play().catch((err: any) => {
              console.error("Browser memblokir musik otomatis:", err);
            });
          } catch (error) {
            console.error("Gagal memuat file musik:", error);
          }
          // ======= 🎵 AKHIR KODE MUSIK =======

          setTimeout(() => {
            onSuccess();
          }, 1500);
        } else {
          setIsShaking(true);
          
          // 3. Mengambil pesan lucu secara acak dari daftar
          const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
          setErrorMessage(randomMessage);

          setTimeout(() => {
            setPassword('');
            setIsShaking(false);
          }, 500);
        }
      }
    }
  };

  const handleDelete = () => {
    setPassword(password.slice(0, -1));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative flowers - corners */}
      <div className="absolute top-0 left-0 w-48 h-48 opacity-80">
        <img
          src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=400"
          alt=""
          className="w-full h-full object-cover rounded-br-full"
        />
      </div>
      <div className="absolute top-0 right-0 w-48 h-48 opacity-80">
        <img
          src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=400"
          alt=""
          className="w-full h-full object-cover rounded-bl-full"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-80">
        <img
          src="https://images.unsplash.com/photo-1589458456444-f7158a7e8a4f?w=400"
          alt=""
          className="w-full h-full object-cover rounded-tr-full"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-80">
        <img
          src="https://images.unsplash.com/photo-1589458456444-f7158a7e8a4f?w=400"
          alt=""
          className="w-full h-full object-cover rounded-tl-full"
        />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-6xl opacity-30"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🌙
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-1/4 text-5xl opacity-40"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        ☁️
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-1/3 text-5xl opacity-40"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        🤍
      </motion.div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        {/* Heart Lock */}
        <motion.div
          className="mb-6"
          animate={isUnlocking ? { scale: [1, 1.3, 0], rotate: [0, 0, 360] } : isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: isUnlocking ? 1.5 : 0.5 }}
        >
          <div className="relative">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <path
                d="M60 100 C 60 100, 20 70, 20 45 C 20 25, 35 20, 45 25 C 50 27, 55 32, 60 40 C 65 32, 70 27, 75 25 C 85 20, 100 25, 100 45 C 100 70, 60 100, 60 100 Z"
                fill="white"
                stroke="#d1d5db"
                strokeWidth="3"
                opacity="0.9"
              />
              <circle cx="60" cy="50" r="8" fill="#6b7280" />
              <rect x="56" y="50" width="8" height="20" rx="2" fill="#6b7280" />
            </svg>
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="12" cy="12" r="8" stroke="#9ca3af" strokeWidth="2" fill="white" />
                <line x1="18" y1="12" x2="35" y2="12" stroke="#9ca3af" strokeWidth="2" />
                <line x1="28" y1="8" x2="28" y2="12" stroke="#9ca3af" strokeWidth="2" />
                <line x1="32" y1="8" x2="32" y2="12" stroke="#9ca3af" strokeWidth="2" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* 📝 4. Bagian teks interaktif dengan identitas Daffa & Helga */}
        <div className="text-center mb-6 h-16 flex flex-col justify-center">
          <p className="text-xl font-serif text-gray-700 italic">From: Daffa</p>
          <p className="text-xl font-serif text-gray-700 italic">For: Helga</p>
          <motion.p 
            key={errorMessage} // Menghidupkan animasi teks setiap kali kata berubah
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-sm mt-2 italic font-medium transition-colors duration-300 ${isShaking ? 'text-red-500 font-semibold' : 'text-gray-500'}`}
          >
            {errorMessage}
          </motion.p>
        </div>

        {/* Password dots */}
        <div className="flex gap-3 mb-8">
          {[...Array(maxLength)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full ${i < password.length ? 'bg-gray-700' : 'bg-gray-300'}`}
              animate={isShaking && i < password.length ? { x: [-3, 3, -3, 3, 0] } : {}}
            />
          ))}
        </div>

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <motion.button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="w-20 h-16 bg-gradient-to-br from-[#f5f5dc]/80 to-[#fffef0]/80 backdrop-blur-sm rounded-2xl text-2xl font-medium text-gray-700 border border-gray-300/50 shadow-md"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              {num}
            </motion.button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 w-full max-w-[264px]">
          <motion.button
            onClick={() => handleNumberClick('0')}
            className="w-full h-16 bg-gradient-to-br from-[#f5f5dc]/80 to-[#fffef0]/80 backdrop-blur-sm rounded-2xl text-2xl font-medium text-gray-700 border border-gray-300/50 shadow-md"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            0
          </motion.button>
          <motion.button
            onClick={handleDelete}
            className="w-full h-16 bg-gradient-to-br from-[#f5f5dc]/80 to-[#fffef0]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-gray-300/50 shadow-md"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <Delete className="w-6 h-6 text-gray-700" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
