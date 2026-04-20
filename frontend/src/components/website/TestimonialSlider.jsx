import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Parent of Aarav, Nursery',
    text: "Navjyoti Kids Villa School gave our son the most nurturing start. The teachers are exceptional and the environment feels like a second home. Aarav comes home every day with a smile and something new to share.",
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    name: 'Rahul Patel',
    role: 'Parent of Anaya, LKG',
    text: "The curriculum is so thoughtfully designed. Anaya was reading simple words by the end of her first term. The teachers genuinely care about each child's individual progress.",
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    name: 'Meera Gupta',
    role: 'Parent of Kabir, UKG',
    text: 'The holistic approach to learning here is remarkable. Kabir has grown tremendously in confidence, creativity and communication skills. We couldn\'t have chosen a better school.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
  {
    name: 'Arjun Mehta',
    role: 'Parent of Sia, Playgroup',
    text: 'As first-time parents, we were nervous about sending our daughter to school so young. The warmth and professionalism of every staff member immediately put us at ease. Absolutely wonderful.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (dir) => {
    setDirection(dir);
    setCurrent(prev => (prev + dir + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (d) => ({ x: d > 0 ? 36 : -36, opacity: 1 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -28 : 28, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <section className="py-24 section-blue overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium text-[#4A90E2] uppercase tracking-wider mb-3">Parent Voices</p>
          <h2 className="text-4xl font-light text-[#333333]">Trusted by <span className="font-semibold">Hundreds of Families</span></h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="bg-white rounded-3xl p-10 shadow-sm"
            >
              <Quote className="w-10 h-10 text-[#4A90E2]/20 mb-6" />
              <p className="text-lg text-gray-600 leading-relaxed mb-8 italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={`${t.img}${t.img.includes('?') ? '&' : '?'}auto=format&q=80`}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#EAF4FF] bg-gray-100"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <p className="font-semibold text-[#333333]">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array(5).fill(0).map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#F2A65A] fill-[#F2A65A]" />)}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button onClick={() => go(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-[#4A90E2] transition-colors hidden lg:flex">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => go(1)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-[#4A90E2] transition-colors hidden lg:flex">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-[#4A90E2]' : 'w-2 h-2 bg-gray-300 hover:bg-[#4A90E2]/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}