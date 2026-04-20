import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { galleryApi } from '@/services/api';
import { X } from 'lucide-react';

const defaultImages = [
  { title: 'Creative Arts Session', image_url: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776680284/ChatGPT_Image_Apr_20_2026_03_38_06_PM_h8sf0r.png', category: 'art' },
  { title: 'Sports Day 2026', image_url: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674600/IMG_20260417_104517_s3zjlq.jpg', category: 'sports' },
  { title: 'Outdoor Discovery', image_url: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674594/IMG_20260417_104245_eazssg.jpg', category: 'outdoor' },
  { title: 'Learning Together', image_url: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674562/IMG_20260417_094427_wa8rkb.jpg', category: 'classroom' },
  { title: 'Annual Day', image_url: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674521/IMG_20260417_092125_joy842.jpg', category: 'events' },
  { title: 'Music Class', image_url: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674544/IMG_20260417_093302_zjawmy.jpg', category: 'events' },
  { title: 'Science Exploration', image_url: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674583/IMG_20260417_101554_w5p2d9.jpg', category: 'classroom' },
  { title: 'Garden Activities', image_url: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674566/IMG_20260417_094830_bhdgix.jpg', category: 'outdoor' },
  { title: 'Celebration Day', image_url: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674533/IMG_20260417_093114_lzfnhy.jpg', category: 'events' },
];

const categories = ['all', 'classroom', 'art', 'sports', 'events', 'outdoor'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const { data: galleryItems = [] } = useQuery({
    queryKey: ['galleryItems'],
    queryFn: () => galleryApi.list(),
  });

  const allImages = galleryItems.length > 0 ? galleryItems : defaultImages;
  const filtered = activeCategory === 'all' ? allImages : allImages.filter((img) => img.category === activeCategory);

  return (
    <div>
      <section className="py-20 section-yellow">
        <div className="max-w-3xl mx-auto text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-medium text-[#4A90E2] uppercase tracking-wider mb-3">Gallery</p>
            <h1 className="text-5xl font-light text-[#333333] mb-5">
              Life at <span className="font-semibold">Navjyoti Kids Villa School</span>
            </h1>
            <p className="text-gray-500">A glimpse into the joyful, inspiring world of our young learners.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 section-blue">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                  activeCategory === cat ? 'bg-[#4A90E2] text-white' : 'bg-white text-gray-600 hover:bg-[#FFEAF4] shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((img, i) => (
              <motion.div
                key={i}
                initial={{ y: 16 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setLightbox(img)}
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100 shadow-sm">
                  <img
                    src={
                      img.image_url
                        ? `${img.image_url}${img.image_url.includes('?') ? '&' : '?'}auto=format&q=80`
                        : ''
                    }
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white font-medium text-sm">{img.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button type="button" className="absolute top-6 right-6 text-white p-2" onClick={() => setLightbox(null)}>
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={
                lightbox.image_url
                  ? `${lightbox.image_url}${lightbox.image_url.includes('?') ? '&' : '?'}auto=format&q=85`
                  : ''
              }
              alt={lightbox.title}
              className="max-w-full max-h-[85vh] rounded-lg object-contain bg-black/20"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
