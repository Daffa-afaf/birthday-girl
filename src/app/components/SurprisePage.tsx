import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function SurprisePage() {
  const [showMessage, setShowMessage] = useState(false);

  // ✅ FIX: Hitung semua nilai random SEKALI SAJA saat komponen mount
  // Tanpa ini, setiap re-render menghasilkan posisi baru → animasi patah-patah
  const heartParticles = useMemo(() =>
    [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 5 + 8,
      delay: Math.random() * 3,
      emoji: ['❤️', '💕', '💖', '💗', '💝', '💘'][Math.floor(Math.random() * 6)],
    })), []
  );

  const scatterFlowers = useMemo(() =>
    [...Array(20)].map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 10 + i * 2,
    })), []
  );

  useEffect(() => {
    const duration = 5000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF1461', '#FF69B4', '#FFB6C1', '#FFC0CB']
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF1461', '#FF69B4', '#FFB6C1', '#FFC0CB']
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    setTimeout(() => setShowMessage(true), 500);
  }, []);

  const letters = "HAPPY BIRTHDAY".split("");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-pink-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Floral background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {/* Corner flowers */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`corner-${i}`}
            className={`absolute w-72 h-72 ${
              i === 0 ? 'top-0 left-0' :
              i === 1 ? 'top-0 right-0' :
              i === 2 ? 'bottom-0 left-0' :
              'bottom-0 right-0'
            }`}
            animate={{ rotate: i % 2 === 0 ? [0, 5, 0] : [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <img
              src={`https://images.unsplash.com/photo-${['1582794543139-8ac9cb0f7b11', '1589458456444-f7158a7e8a4f', '1587421976536-c2de1cac8bb3', '1596313922575-ec573dfef885'][i]}?w=300`}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

        {/* ✅ Scattered flowers — pakai nilai dari useMemo, bukan Math.random() langsung */}
        {scatterFlowers.map((f) => (
          <motion.div
            key={`scatter-${f.id}`}
            className="absolute w-32 h-32"
            style={{ top: `${f.top}%`, left: `${f.left}%` }}
            animate={{ rotate: 360, scale: [1, 1.3, 1] }}
            transition={{ duration: f.duration, repeat: Infinity, ease: "linear" }}
          >
            <img
              src={`https://images.unsplash.com/photo-${['1582794543139-8ac9cb0f7b11', '1589458456444-f7158a7e8a4f', '1587421976536-c2de1cac8bb3'][f.id % 3]}?w=150`}
              alt=""
              className="w-full h-full object-cover opacity-60 rounded-full"
            />
          </motion.div>
        ))}
      </div>

      {/* ✅ Floating hearts — pakai nilai dari useMemo, bukan Math.random() langsung */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {heartParticles.map((h) => (
          <motion.div
            key={h.id}
            className="absolute text-3xl md:text-5xl"
            initial={{ x: h.x, y: '110vh', scale: h.scale, opacity: 0.5 }}
            animate={{ y: '-10vh', rotate: [0, 360], opacity: [0.5, 0.8, 0.5] }}
            transition={{
              duration: h.duration,
              repeat: Infinity,
              delay: h.delay,
              ease: "linear",
            }}
          >
            {h.emoji}
          </motion.div>
        ))}
      </div>

      {/* Main card */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1, bounce: 0.5 }}
        className="relative z-10"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-16 max-w-4xl border-8 border-pink-300">

          {/* Animated title letters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                }}
                className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>

          {/* Animated message */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="text-center space-y-6"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl md:text-9xl mb-4"
                >
                  🎂
                </motion.div>

                <p className="text-2xl md:text-4xl font-bold text-pink-600">
                  Sayangku! 💖
                </p>

                <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                  Semoga tahun ini membawa lebih banyak kebahagiaan dan selalu dimudahkan segala urusanmu.  
                </p>

                <motion.div
                  className="flex justify-center gap-4 text-5xl md:text-6xl mt-8"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span>🎉</span>
                  <span>💝</span>
                  <span>🎉</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                  className="mt-12 p-6 bg-pink-50 rounded-2xl border-2 border-pink-200"
                >
                  <p className="text-lg md:text-xl text-pink-600 font-semibold italic">
                    "Terimakasih sudah selalu berusaha menjadi lebih baik dari hari ke hari"
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}