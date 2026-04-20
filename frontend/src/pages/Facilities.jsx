import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Trees, Palette, Music, Utensils, Shield } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { y: 28 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay },
});

const facilities = [
  {
    icon: Monitor, name: 'Smart Classrooms',
    desc: 'Interactive whiteboards, age-appropriate furniture, natural lighting and well-ventilated spaces designed for focused learning.',
    img: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674562/IMG_20260417_094427_wa8rkb.jpg',
  },
  {
    icon: Trees, name: 'Outdoor Play Areas',
    desc: 'Safe, well-maintained play structures, sand pits, gardens and open spaces that encourage physical activity and exploration.',
    img: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674566/IMG_20260417_094830_bhdgix.jpg',
  },
  {
    icon: Palette, name: 'Art & Craft Studio',
    desc: 'A dedicated creative space stocked with quality art materials where children can freely express themselves through various mediums.',
    img: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776680284/ChatGPT_Image_Apr_20_2026_03_38_06_PM_h8sf0r.png',
  },
  {
    icon: Music, name: 'Music & Dance Room',
    desc: 'Acoustically designed space with instruments and open floor area for musical exploration and movement-based learning.',
    img: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776681504/ChatGPT_Image_Apr_20_2026_03_57_32_PM_twe0ih.png',
  },
  {
    icon: Utensils, name: 'Nutrition Kitchen',
    desc: 'Freshly prepared, nutritionist-approved meals and snacks served daily. Allergy-sensitive menus available on request.',
    img: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674560/IMG_20260417_094338_b20yrx.jpg',
  },
  {
    icon: Shield, name: 'Safety & Security',
    desc: '24/7 CCTV surveillance, biometric access, trained security personnel and a dedicated child protection policy.',
    img: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776685705/ChatGPT_Image_Apr_20_2026_05_15_43_PM_mmpx5g.png',
  },
];

export default function Facilities() {
  return (
    <div>
      {/* Header */}
      <section className="py-20 section-pink">
        <div className="max-w-3xl mx-auto text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-medium text-[#4A90E2] uppercase tracking-wider mb-3">Our Facilities</p>
            <h1 className="text-5xl font-light text-[#333333] mb-5">
              Spaces Designed for<br /><span className="font-semibold">Inspired Learning</span>
            </h1>
            <p className="text-gray-500 leading-relaxed">
              Every corner of Navjyoti Kids Villa School is thoughtfully designed to stimulate curiosity, ensure safety and inspire a love of learning in every child.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Banner */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img src="https://res.cloudinary.com/dmuoamdsu/image/upload/v1776680284/ChatGPT_Image_Apr_20_2026_03_29_03_PM_ycmpwa.png" alt="School" className="relative z-0 w-full h-full object-cover" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 z-[1] bg-[#FF4D4D]/30" />
      </div>

      {/* Facilities Grid */}
      <section className="py-24 section-green">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((f, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="group">
                <div className="rounded-2xl overflow-hidden mb-5 shadow-md bg-gray-100">
                  <img src={`${f.img}${f.img.includes('?') ? '&' : '?'}auto=format&q=80`} alt={f.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <f.icon className="w-5 h-5 text-[#4A90E2]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#333333]">{f.name}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Highlight */}
      <section className="py-20 dark-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp()}>
            <p className="text-sm font-medium text-[#FFD93D] uppercase tracking-wider mb-3">Your Child's Safety</p>
            <h2 className="text-4xl font-light text-white mb-6">
              A Campus Where<br /><span className="font-semibold text-[#FFD93D]">Safety Comes First</span>
            </h2>
            <p className="text-white/90 leading-relaxed mb-6">
              We have invested in state-of-the-art security infrastructure to ensure every parent has complete peace of mind when their child is in our care.
            </p>
            <ul className="space-y-3 text-sm text-white/90">
              {['24/7 HD CCTV with real-time monitoring', 'Biometric entry for all staff and parents', 'Emergency medical kit & trained first-aider on site', 'GPS-tracked school transport', 'Fire safety compliant building'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD93D] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeUp(0.2)} className="rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
            <img src="https://res.cloudinary.com/dmuoamdsu/image/upload/v1776687226/ChatGPT_Image_Apr_20_2026_05_41_49_PM_jjrtdb.png" alt="Safe school" className="w-full h-[400px] object-cover" loading="lazy" decoding="async" />
          </motion.div>
        </div>
      </section>

      <section className="py-16 section-blue">
        <div className="max-w-3xl mx-auto text-center px-6">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl font-light text-[#333333] mb-4">Experience it in <span className="font-semibold">Person</span></h2>
            <p className="text-gray-600 mb-7">Book a campus tour and see our facilities for yourself.</p>
            <Link to="/Contact" className="inline-flex items-center gap-2 bg-[#4A90E2] text-white px-7 py-3.5 rounded-xl font-medium hover:bg-[#3d7fcf] transition-colors shadow-md">
              Schedule a Tour <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}