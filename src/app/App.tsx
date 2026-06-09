import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginPage from './components/LoginPage';
import LetterPage from './components/LetterPage';
import PhotoAlbumPage from './components/PhotoAlbumPage';
import SurprisePage from './components/SurprisePage';

type Page = 'login' | 'letter' | 'album' | 'surprise';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');

  return (
    <div className="size-full">
      <AnimatePresence mode="wait">
        {currentPage === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }} // Mengecil dan sedikit blur saat keluar
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <LoginPage onSuccess={() => setCurrentPage('letter')} />
          </motion.div>
        )}

        {currentPage === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 40 }} // Transisi masuk surat dari bawah
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, rotateY: -90, transformOrigin: "left" }} // Efek mulai melipat halaman buku ke kiri saat ditutup
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <LetterPage onComplete={() => setCurrentPage('album')} />
          </motion.div>
        )}

        {currentPage === 'album' && (
          <motion.div
            key="album"
            initial={{ opacity: 0, rotateY: 90, transformOrigin: "left" }} // Kelanjutan efek lembaran buku baru dibuka dari kanan ke tengah
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }} // Menghilang memudar melebar dengan estetik
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }} // Sangat smooth ala membalik buku fisik
          >
            <PhotoAlbumPage onComplete={() => setCurrentPage('surprise')} />
          </motion.div>
        )}

        {currentPage === 'surprise' && (
          <motion.div
            key="surprise"
            initial={{ opacity: 0, scale: 0.9, y: 20 }} // Standar UI UX Modern: Muncul perlahan dari background dengan soft zoom-in
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.9, 
              ease: [0.16, 1, 0.3, 1] // Kurva easeOutExpro: Animasi super halus yang lambat di akhir (sinematik)
            }}
          >
            <SurprisePage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
