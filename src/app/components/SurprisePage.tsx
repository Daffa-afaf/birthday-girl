import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function SurprisePage() {
  const [showMessage, setShowMessage] = useState(false);

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

  useEffect(() => {
    const duration = 5000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 7, angle: 60,  spread: 55, origin: { x: 0 }, colors: ['#FF1461', '#FF69B4', '#FFB6C1', '#FFC0CB'] });
      confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#FF1461', '#FF69B4', '#FFB6C1', '#FFC0CB'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    setTimeout(() => setShowMessage(true), 500);
  }, []);

  const letters = "HAPPY BIRTHDAY".split("");

  // URL bunga yang sama dengan PhotoAlbumPage
  const flowerImgs = [
    "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=300",
    "https://images.unsplash.com/photo-1589458456444-f7158a7e8a4f?w=300",
    "https://images.unsplash.com/photo-1587421976536-c2de1cac8bb3?w=300",
    "https://images.unsplash.com/photo-1596313922575-ec573dfef885?w=300",
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-pink-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">

      {/* ── Floral background — sama persis gaya PhotoAlbumPage ── */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">

        {/* 4 bunga sudut — bentuk seperti PhotoAlbumPage */}
        <motion.div className="absolute top-0 left-0 w-28 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72"
          animate={{ rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity }}>
          <img src={flowerImgs[0]} alt="" className="w-full h-full object-cover rounded-br-full" />
        </motion.div>

        <motion.div className="absolute top-0 right-0 w-28 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72"
          animate={{ rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity }}>
          <img src={flowerImgs[1]} alt="" className="w-full h-full object-cover rounded-bl-full" />
        </motion.div>

        <motion.div className="absolute bottom-0 left-0 w-28 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72"
          animate={{ rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity }}>
          <img src={flowerImgs[2]} alt="" className="w-full h-full object-cover rounded-tr-full" />
        </motion.div>

        <motion.div className="absolute bottom-0 right-0 w-28 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72"
          animate={{ rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity }}>
          <img src={flowerImgs[3]} alt="" className="w-full h-full object-cover rounded-tl-full" />
        </motion.div>

        {/* Bunga sisi kiri — bulat, hanya muncul md ke atas */}
        <div className="absolute left-0 top-[20%] bottom-[20%] hidden md:flex flex-col justify-between w-32">
          {[0, 1, 2].map((i) => (
            <motion.div key={`left-${i}`} className="w-24 h-24 lg:w-32 lg:h-32"
              animate={{ x: [-10, 10, -10] }} transition={{ duration: 4 + i, repeat: Infinity }}>
              <img src={flowerImgs[i % 4]} alt="" className="w-full h-full object-cover opacity-70 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Bunga sisi kanan — bulat, hanya muncul md ke atas */}
        <div className="absolute right-0 top-[20%] bottom-[20%] hidden md:flex flex-col justify-between w-32">
          {[0, 1, 2].map((i) => (
            <motion.div key={`right-${i}`} className="w-24 h-24 lg:w-32 lg:h-32"
              animate={{ x: [10, -10, 10] }} transition={{ duration: 4 + i, repeat: Infinity }}>
              <img src={flowerImgs[(i + 1) % 4]} alt="" className="w-full h-full object-cover opacity-70 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Bunga bulat melayang tersebar — posisi tetap seperti PhotoAlbumPage */}
        {[
          { top: "25%", left: "8%",   size: "w-14 h-14 md:w-24 md:h-24", img: 0 },
          { top: "75%", left: "12%",  size: "w-14 h-14 md:w-24 md:h-24", img: 1 },
          { top: "18%", right: "10%", size: "w-12 h-12 md:w-20 md:h-20", img: 2 },
          { top: "65%", right: "8%",  size: "w-14 h-14 md:w-24 md:h-24", img: 3 },
          { top: "45%", left: "5%",   size: "hidden lg:block w-20 h-20",  img: 0 },
          { top: "40%", right: "5%",  size: "hidden lg:block w-20 h-20",  img: 1 },
        ].map((f, i) => (
          <motion.div
            key={`scatter-${i}`}
            className={`absolute ${f.size}`}
            style={{ top: f.top, left: f.left, right: f.right }}
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
          >
            <img
              src={flowerImgs[f.img]}
              alt=""
              className="w-full h-full object-cover opacity-50 rounded-full"
            />
          </motion.div>
        ))}

      </div>

      {/* ── Floating hearts ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {heartParticles.map((h) => (
          <motion.div
            key={h.id}
            className="absolute text-2xl md:text-4xl"
            initial={{ x: h.x, y: '110vh', scale: h.scale, opacity: 0.5 }}
            animate={{ y: '-10vh', rotate: [0, 360], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: h.duration, repeat: Infinity, delay: h.delay, ease: "linear" }}
          >
            {h.emoji}
          </motion.div>
        ))}
      </div>

      {/* ── Main card ── */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1, bounce: 0.5 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-5 sm:p-8 md:p-14 border-4 md:border-8 border-pink-300">

          {/* Animated title letters */}
          <div className="flex flex-wrap justify-center gap-1 md:gap-3 mb-10">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.08, type: "spring", stiffness: 200, damping: 14 }}
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
                className="text-center space-y-5"
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

                <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                  Semoga tahun ini membawa lebih banyak kebahagiaan dan selalu dimudahkan segala urusanmu.
                </p>

                <motion.div
                  className="flex justify-center gap-4 text-4xl md:text-6xl mt-6"
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
                  className="mt-10 p-5 md:p-6 bg-pink-50 rounded-2xl border-2 border-pink-200"
                >
                  <p className="text-base md:text-xl text-pink-600 font-semibold italic">
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