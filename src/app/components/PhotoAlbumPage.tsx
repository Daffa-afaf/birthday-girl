import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PhotoAlbumPageProps {
  onComplete: () => void;
}

export default function PhotoAlbumPage({ onComplete }: PhotoAlbumPageProps) {
  // Di mobile: index per FOTO (0..9), di desktop: index per SPREAD/lembar (0..4)
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopPage, setDesktopPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const photos = [
    { src: "photo/helga1.jpeg",  caption: "Wanita yang selalu membuatku tersenyum",  date: "Bunga aja masih kalah cantik" },
    { src: "photo/helga8.jpeg",  caption: "Foto pertama kita",                       date: "Kenangan Indah" },
    { src: "photo/helga11.jpeg", caption: "Petualangan yang tak terlupakan",         date: "Perjalanan Bersama" },
    { src: "photo/helga6.jpeg",  caption: "Momen spesial kita",                      date: "Hari Yang Berkesan" },
    { src: "photo/helga7.jpeg",  caption: "Cinta yang tumbuh setiap hari",           date: "Selalu Bersamamu" },
    { src: "photo/helga4.jpeg",  caption: "Miror selfie yang lucu",                  date: "Kebahagiaanmu Kebahagiaanku" },
    { src: "photo/helga13.jpeg", caption: "Saat kita tertawa bersama",               date: "Lebarnya mulutmu selebar sabarmu hehe" },
    { src: "photo/helga16.jpeg", caption: "Mengkreak Bersama",                       date: "Jalan gatau arah penting pulang bawa martabak" },
    { src: "photo/helga15.jpeg", caption: "Cisss",                                   date: "Miror selfie kesekian kali" },
  ];

  const totalDesktopPages = Math.ceil(photos.length / 2); // 5 lembar
  const totalMobilePhotos = photos.length;                 // 10 foto

  // ── Handler MOBILE ──
  const handleMobileTap = () => {
    if (isFlipping) return;
    if (mobileIndex < totalMobilePhotos - 1) {
      setIsFlipping(true);
      setTimeout(() => { setMobileIndex(i => i + 1); setIsFlipping(false); }, 400);
    } else {
      setIsClosing(true);
      setTimeout(() => onComplete(), 800);
    }
  };

  // ── Handler DESKTOP ──
  const handleDesktopTap = () => {
    if (isFlipping) return;
    if (desktopPage < totalDesktopPages - 1) {
      setIsFlipping(true);
      setTimeout(() => { setDesktopPage(p => p + 1); setIsFlipping(false); }, 600);
    } else {
      setIsClosing(true);
      setTimeout(() => onComplete(), 1000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-pink-50 to-blue-50 flex items-center justify-center p-2 relative overflow-hidden">

      {/* Floral background */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">

        {/* 4 bunga sudut */}
        <motion.div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64" animate={{ rotate: [0,5,0] }} transition={{ duration:5, repeat:Infinity }}>
          <img src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=300" alt="" className="w-full h-full object-cover rounded-br-full" />
        </motion.div>
        <motion.div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64" animate={{ rotate: [0,-5,0] }} transition={{ duration:5, repeat:Infinity }}>
          <img src="https://images.unsplash.com/photo-1589458456444-f7158a7e8a4f?w=300" alt="" className="w-full h-full object-cover rounded-bl-full" />
        </motion.div>
        <motion.div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64" animate={{ rotate: [0,-5,0] }} transition={{ duration:5, repeat:Infinity }}>
          <img src="https://images.unsplash.com/photo-1587421976536-c2de1cac8bb3?w=300" alt="" className="w-full h-full object-cover rounded-tr-full" />
        </motion.div>
        <motion.div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64" animate={{ rotate: [0,5,0] }} transition={{ duration:5, repeat:Infinity }}>
          <img src="https://images.unsplash.com/photo-1596313922575-ec573dfef885?w=300" alt="" className="w-full h-full object-cover rounded-tl-full" />
        </motion.div>

        {/* Bunga sisi kiri — hanya muncul md ke atas */}
        <div className="absolute left-0 top-[20%] bottom-[20%] hidden md:flex flex-col justify-between w-32">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`left-${i}`}
              className="w-24 h-24 lg:w-32 lg:h-32"
              animate={{ x: [-10, 10, -10] }}
              transition={{ duration: 4 + i, repeat: Infinity }}
            >
              <img src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=150" alt="" className="w-full h-full object-cover opacity-70 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Bunga sisi kanan — hanya muncul md ke atas */}
        <div className="absolute right-0 top-[20%] bottom-[20%] hidden md:flex flex-col justify-between w-32">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`right-${i}`}
              className="w-24 h-24 lg:w-32 lg:h-32"
              animate={{ x: [10, -10, 10] }}
              transition={{ duration: 4 + i, repeat: Infinity }}
            >
              <img src="https://images.unsplash.com/photo-1589458456444-f7158a7e8a4f?w=150" alt="" className="w-full h-full object-cover opacity-70 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Bunga bulat melayang tersebar */}
        {[
          { top: "25%", left: "8%",  size: "w-14 h-14 md:w-24 md:h-24", img: "1582794543139-8ac9cb0f7b11" },
          { top: "75%", left: "12%", size: "w-14 h-14 md:w-24 md:h-24", img: "1589458456444-f7158a7e8a4f" },
          { top: "18%", right: "10%",size: "w-12 h-12 md:w-20 md:h-20", img: "1587421976536-c2de1cac8bb3" },
          { top: "65%", right: "8%", size: "w-14 h-14 md:w-24 md:h-24", img: "1596313922575-ec573dfef885" },
          { top: "45%", left: "5%",  size: "hidden lg:block w-20 h-20",  img: "1582794543139-8ac9cb0f7b11" },
          { top: "40%", right: "5%", size: "hidden lg:block w-20 h-20",  img: "1589458456444-f7158a7e8a4f" },
        ].map((flower, i) => (
          <motion.div
            key={`scatter-${i}`}
            className={`absolute ${flower.size}`}
            style={{ top: flower.top, left: flower.left, right: flower.right }}
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
          >
            <img
              src={`https://images.unsplash.com/photo-${flower.img}?w=150`}
              alt=""
              className="w-full h-full object-cover opacity-40 md:opacity-50 rounded-full"
            />
          </motion.div>
        ))}

      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: isClosing ? 0 : 1, opacity: isClosing ? 0 : 1, rotateY: isClosing ? -90 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="relative z-10 w-full flex items-center justify-center"
        style={{ perspective: "2000px" }}
      >
        <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-6">

          {/* ══════════════════════════════════════════
              MOBILE VIEW (< lg) — 1 foto per tap, semua 10 foto tampil
              ══════════════════════════════════════════ */}
          <div className="block lg:hidden">
            <div
              className="relative bg-[#fcfaf2] rounded-2xl shadow-2xl border border-amber-100/40 overflow-hidden cursor-pointer select-none"
              onClick={handleMobileTap}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileIndex}
                  initial={{ rotateY: -30, opacity: 0 }}
                  animate={{ rotateY: 0,   opacity: 1 }}
                  exit={{   rotateY:  30,  opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="p-6 sm:p-8 bg-[#fdfcf7] min-h-[480px] flex flex-col items-center justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Nomor foto */}
                  <div className="absolute top-4 right-5 text-xs font-serif text-amber-800/40 tracking-widest">
                    {mobileIndex + 1} / {totalMobilePhotos}
                  </div>

                  {/* Foto */}
                  <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-xl overflow-hidden shadow-lg border-[6px] border-white">
                    <ImageWithFallback
                      src={photos[mobileIndex].src}
                      alt={photos[mobileIndex].caption}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Caption */}
                  <div className="mt-6 text-center max-w-xs px-2">
                    <p className="font-serif text-[#4a3b32] font-medium text-base leading-relaxed">
                      {photos[mobileIndex].caption}
                    </p>
                    <p className="text-xs text-amber-800/50 mt-1 font-serif tracking-wider uppercase">
                      {photos[mobileIndex].date}
                    </p>
                  </div>

                  {/* Hint navigasi */}
                  <div className="mt-8">
                    {mobileIndex < totalMobilePhotos - 1 ? (
                      <motion.p
                        className="text-xs text-gray-400 font-serif italic"
                        animate={{ opacity: [0.4, 0.9, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Tap untuk foto berikutnya →
                      </motion.p>
                    ) : (
                      <p className="text-xs text-[#c94a73] font-serif font-semibold tracking-wider uppercase animate-pulse">
                        ✨ Tap untuk melanjutkan ✨
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress dots mobile */}
            <div className="mt-4 flex justify-center gap-1.5">
              {photos.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i === mobileIndex
                      ? "w-4 h-2 bg-pink-400"
                      : "w-2 h-2 bg-amber-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════
              DESKTOP VIEW (≥ lg) — 2 halaman buku, layout asli
              ══════════════════════════════════════════ */}
          <div className="hidden lg:block">
            <div
              className="relative bg-[#fcfaf2] rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-amber-100/40 overflow-hidden cursor-pointer select-none"
              onClick={handleDesktopTap}
            >
              {/* Spine buku */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-200/60 to-transparent z-30" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[30px] -translate-x-1/2 bg-gradient-to-r from-black/[0.04] via-transparent to-black/[0.04] z-30 pointer-events-none" />

              <div className="grid grid-cols-2 relative">

                {/* Halaman KIRI */}
                <div className="relative p-8 xl:p-12 border-r border-amber-100 bg-[#fdfcf7] min-h-[550px] xl:min-h-[620px] flex flex-col justify-between">
                  <div className="absolute bottom-6 left-8 text-xs font-serif text-amber-800/40 tracking-widest">
                    PAGE {(desktopPage * 2) + 1}
                  </div>

                  {desktopPage === 0 ? (
                    // Cover halaman kiri
                    <div className="flex flex-col items-center justify-center h-full space-y-6 my-auto">
                      <span className="text-4xl text-amber-700/30">✦ ✦ ✦</span>
                      <h1 className="text-4xl xl:text-5xl font-serif text-[#c94a73] font-semibold text-center tracking-wide leading-tight">
                        Our Memory<br/>Album
                      </h1>
                      <p className="text-center text-gray-500 font-serif italic text-base">
                        Untuk kamu yang selalu menghidupkan duniaku
                      </p>
                      <div className="text-6xl pt-4 animate-bounce duration-1000">📖</div>
                    </div>
                  ) : (
                    // Foto kiri
                    <div className="flex flex-col items-center justify-center h-full my-auto">
                      <div className="w-64 h-64 xl:w-80 xl:h-80 rounded-xl overflow-hidden shadow-lg border-[6px] border-white hover:scale-[1.02] transition-transform duration-300">
                        <ImageWithFallback
                          src={photos[(desktopPage * 2) - 1]?.src}
                          alt={photos[(desktopPage * 2) - 1]?.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-6 text-center max-w-sm">
                        <p className="font-serif text-[#4a3b32] font-medium text-lg leading-relaxed">
                          {photos[(desktopPage * 2) - 1]?.caption}
                        </p>
                        <p className="text-xs text-amber-800/50 mt-1 font-serif tracking-wider uppercase">
                          {photos[(desktopPage * 2) - 1]?.date}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Halaman KANAN dengan efek flip */}
                <div className="relative bg-[#fdfcf7] min-h-[550px] xl:min-h-[620px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={desktopPage}
                      initial={{ rotateY: -45, opacity: 0, transformOrigin: "left center" }}
                      animate={{ rotateY: 0,   opacity: 1 }}
                      exit={{   rotateY:  45,  opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                      className="absolute inset-0 p-8 xl:p-12 bg-[#fdfcf7] flex flex-col justify-between h-full"
                      style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                    >
                      <div className="absolute bottom-6 right-8 text-xs font-serif text-amber-800/40 tracking-widest">
                        PAGE {(desktopPage * 2) + 2}
                      </div>

                      <div className="flex flex-col items-center justify-center h-full my-auto">
                        <div className="w-64 h-64 xl:w-80 xl:h-80 rounded-xl overflow-hidden shadow-lg border-[6px] border-white hover:scale-[1.02] transition-transform duration-300">
                          <ImageWithFallback
                            src={photos[desktopPage * 2]?.src}
                            alt={photos[desktopPage * 2]?.caption}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-6 text-center max-w-sm">
                          <p className="font-serif text-[#4a3b32] font-medium text-lg leading-relaxed px-2">
                            {photos[desktopPage * 2]?.caption}
                          </p>
                          <p className="text-xs text-amber-800/50 mt-1 font-serif tracking-wider uppercase">
                            {photos[desktopPage * 2]?.date}
                          </p>
                        </div>
                      </div>

                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center w-full px-4">
                        {desktopPage < totalDesktopPages - 1 ? (
                          <motion.p
                            className="text-xs text-gray-400 font-serif italic tracking-wide"
                            animate={{ opacity: [0.4, 0.9, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Tap halaman untuk membuka lembar berikutnya →
                          </motion.p>
                        ) : (
                          <p className="text-xs text-[#c94a73] font-serif font-semibold tracking-wider uppercase animate-pulse">
                            ✨ Tap sekali lagi untuk menutup buku ✨
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-black/[0.03] to-transparent pointer-events-none rounded-tl-2xl" />
                </div>

              </div>
            </div>

            {/* Indikator halaman desktop */}
            <div className="mt-4 text-center text-xs font-serif tracking-widest text-amber-900/40 uppercase">
              Halaman {desktopPage + 1} dari {totalDesktopPages}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}