import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Parent of Aarav, Nursery',
    text: "Navjyoti Kids Villa School has been a blessing for our family. Aarav loves going to school every day and the AI progress reports are amazing!",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    name: 'Rahul Patel',
    role: 'Parent of Anaya, LKG',
    text: 'The teachers are incredibly caring. The app keeps us updated on everything. Best preschool decision we made.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    name: 'Meera Gupta',
    role: 'Parent of Kabir, UKG',
    text: 'From homework to activities, everything is so well organized. Kabir has grown so much in confidence and creativity.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#FFF6E9] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#C79BFF] uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F35] mt-2">
            What Parents <span className="text-[#FF6F61]">Love</span> About Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#FFD84D]/20"
            >
              <Quote className="w-8 h-8 text-[#FFD84D] mb-4" />
              <p className="text-[#4A3F35]/70 leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-2 mb-3">
                {Array(5).fill(0).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-[#FFD84D] fill-[#FFD84D]" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <img src={`${t.avatar}${t.avatar.includes('?') ? '&' : '?'}auto=format&q=80`} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#FF8A5B] bg-gray-100" loading="lazy" decoding="async" />
                <div>
                  <p className="font-semibold text-[#4A3F35]">{t.name}</p>
                  <p className="text-xs text-[#4A3F35]/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}