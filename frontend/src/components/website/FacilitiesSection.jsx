import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Music, TreePine, BookOpen, Utensils, Shield } from 'lucide-react';

const facilities = [
  { icon: Palette, title: 'Art Studio', desc: 'Creative expression through colors and crafts', color: '#FF8A5B' },
  { icon: Music, title: 'Music Room', desc: 'Rhythm, melody, and joyful exploration', color: '#C79BFF' },
  { icon: TreePine, title: 'Play Garden', desc: 'Outdoor adventures in nature', color: '#6ED3A3' },
  { icon: BookOpen, title: 'Smart Library', desc: 'AI-curated stories and learning resources', color: '#FF6F61' },
  { icon: Utensils, title: 'Nutrition Kitchen', desc: 'Healthy meals prepared with love', color: '#FFD84D' },
  { icon: Shield, title: 'Safe Campus', desc: 'CCTV monitored and child-safe environment', color: '#FF8A5B' },
];

export default function FacilitiesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#FF8A5B] uppercase tracking-wider">Our Facilities</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F35] mt-2">
            Everything for Your Child's <span className="text-[#FF6F61]">Growth</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-[#FFF6E9] rounded-3xl p-7 border border-transparent hover:border-[#FFD84D]/50 hover:shadow-xl transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${f.color}20` }}
              >
                <f.icon className="w-7 h-7" style={{ color: f.color }} />
              </div>
              <h3 className="text-lg font-bold text-[#4A3F35] mb-2">{f.title}</h3>
              <p className="text-sm text-[#4A3F35]/60">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}