import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { y: 28 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay },
});

const teachers = [
  { name: 'Ms. Jyoti Gupta', role: 'Director', qual: 'Bachelor of Arts', img: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776680285/ChatGPT_Image_Apr_20_2026_03_20_26_PM_sfxkfk.png' },
  { name: 'Mr. Sanjay Gupta', role: 'Director', qual: 'Bachelor of Commerce (Pharmacist)', img: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776680284/ChatGPT_Image_Apr_20_2026_03_22_03_PM_zwgmr6.png' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 section-pink overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ x: -24 }} animate={{ x: 0 }} transition={{ duration: 0.65 }}>
            <p className="text-sm font-medium text-[#4A90E2] uppercase tracking-wider mb-4">About Navjyoti Kids Villa School</p>
            <h1 className="text-5xl font-light text-[#333333] leading-tight mb-6">
              Educating Hearts<br />
              <span className="font-semibold">Since 2008</span>
            </h1>
            <p className="text-gray-500 leading-relaxed mb-6">
              Founded with the belief that every child deserves the best possible start, Navjyoti Kids Villa School has grown into one of the region&apos;s most trusted early childhood education centres — nurturing over 500 young learners each year.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Our team of passionate educators, our thoughtfully designed spaces, and our warm community create an environment where children don't just learn — they thrive.
            </p>
          </motion.div>
          <motion.div initial={{ x: 24 }} animate={{ x: 0 }} transition={{ duration: 0.65, delay: 0.15 }}>
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
              <img src="https://res.cloudinary.com/dmuoamdsu/image/upload/v1776678295/ChatGPT_Image_Apr_20_2026_03_12_53_PM_uad2r9.png" alt="About" className="w-full h-[420px] object-cover" loading="lazy" decoding="async" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Mission */}
      <section className="py-24 section-blue">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <motion.div {...fadeUp()} className="bg-white rounded-3xl p-10 shadow-sm border border-[#EAF4FF]">
            <div className="w-10 h-10 bg-[#4A90E2] rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-lg">🎯</span>
            </div>
            <h3 className="text-2xl font-semibold text-[#333333] mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide a nurturing, inclusive and inspiring early learning environment that empowers every child to develop a love of learning, strong values, and the confidence to reach their full potential.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="dark-section rounded-3xl p-10">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-lg">👁</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Our Vision</h3>
            <p className="text-white/90 leading-relaxed">
              To be the leading early childhood education institution that sets a global standard for child-centred, innovative learning — raising compassionate, curious and capable global citizens.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 section-yellow">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp()}>
            <div className="rounded-3xl overflow-hidden shadow-xl bg-gray-100">
              <img src="https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674600/IMG_20260417_104517_s3zjlq.jpg" alt="Learning" className="w-full h-[420px] object-cover" loading="lazy" decoding="async" />
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.2)}>
            <p className="text-sm font-medium text-[#4A90E2] uppercase tracking-wider mb-3">Our Approach</p>
            <h2 className="text-4xl font-light text-[#333333] mb-6">
              Learning Through<br /><span className="font-semibold">Play and Discovery</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              We follow a play-based, inquiry-driven approach rooted in evidence and inspired by internationally recognised frameworks. Children learn best when they feel safe, curious and joyful.
            </p>
            <div className="space-y-3">
              {['Child-led exploration and discovery', 'Integrated arts and movement', 'Social-emotional learning focus', 'Regular parent-teacher collaboration', 'AI-powered progress tracking'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-[#6BCB77] flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Teachers */}
      <section className="py-24 section-green">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="text-sm font-medium text-[#4A90E2] uppercase tracking-wider mb-3">Our Educators</p>
            <h2 className="text-4xl font-light text-[#333333]">Meet Our <span className="font-semibold">Dedicated Team</span></h2>
          </motion.div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {teachers.slice(0, 2).map((t, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="group text-center">
                <div className="rounded-2xl overflow-hidden mb-4 shadow-md">
                  <img src={t.img} alt={t.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 bg-gray-100" loading="lazy" decoding="async" />
                </div>
                <h4 className="font-semibold text-[#333333]">{t.name}</h4>
                <p className="text-sm text-[#4A90E2] font-medium">{t.role}</p>
                <p className="text-xs text-gray-400 mt-1">{t.qual}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 dark-section">
        <div className="max-w-3xl mx-auto text-center px-6">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl font-light text-white mb-4">Ready to Join Our <span className="font-semibold">Family?</span></h2>
            <p className="text-white/90 mb-8">Schedule a visit to experience Navjyoti Kids Villa School firsthand.</p>
            <Link to="/Admissions" className="inline-flex items-center gap-2 bg-white text-[#FF4D4D] px-7 py-3.5 rounded-xl font-medium hover:bg-[#FFF5CC] transition-colors">
              Start Your Application <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}