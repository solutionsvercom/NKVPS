import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, CheckCircle } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { y: 28 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay },
});

const programs = [
  {
    name: 'Playgroup', age: '1.5 – 2.5 Years', timing: '9:00 AM – 12:00 PM', ratio: '1 : 6',
    color: 'section-yellow', accent: '#F2A65A',
    desc: 'A gentle, nurturing introduction to the world of learning. Sensory play, music and movement form the core of this foundational program.',
    highlights: ['Sensory & tactile exploration', 'Motor skill development', 'Parent-child bonding activities', 'Music, rhymes & movement', 'Free creative play'],
    img: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674595/IMG_20260417_104249_yfmlj2.jpg',
  },
  {
    name: 'Nursery', age: '2.5 – 3.5 Years', timing: '9:00 AM – 1:00 PM', ratio: '1 : 8',
    color: 'section-green', accent: '#6BCB77',
    desc: 'Children build confidence, language and social skills through storytelling, art, and structured group activities in a warm setting.',
    highlights: ['Early literacy foundations', 'Creative arts & crafts', 'Social skills & sharing', 'Nature & science play', 'Numeracy awareness'],
    img: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674544/IMG_20260417_093302_zjawmy.jpg',
  },
  {
    name: 'Lower KG', age: '3.5 – 4.5 Years', timing: '8:30 AM – 1:30 PM', ratio: '1 : 10',
    color: 'section-blue', accent: '#4A90E2',
    desc: 'A structured, play-based curriculum introducing phonics, numbers, environmental science and early critical thinking.',
    highlights: ['Phonics & pre-reading', 'Writing preparation', 'Basic mathematics', 'Computer introduction', 'Project-based learning'],
    img: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674583/IMG_20260417_101554_w5p2d9.jpg',
  },
  {
    name: 'Upper KG', age: '4.5 – 5.5 Years', timing: '8:30 AM – 2:00 PM', ratio: '1 : 12',
    color: 'section-pink', accent: '#FF6B6B',
    desc: 'Comprehensive school-readiness program developing advanced literacy, numeracy, critical thinking and leadership confidence.',
    highlights: ['Advanced phonics & reading', 'Mathematical concepts', 'Public speaking skills', 'STEM introduction', 'School transition support'],
    img: 'https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674528/IMG_20260417_092924_fiqf2x.jpg',
  },
];

export default function Programs() {
  return (
    <div>
      {/* Header */}
      <section className="py-20 section-yellow">
        <div className="max-w-3xl mx-auto text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-medium text-[#4A90E2] uppercase tracking-wider mb-3">Programs</p>
            <h1 className="text-5xl font-light text-[#333333] mb-5">
              The Right Program for<br /><span className="font-semibold">Every Stage</span>
            </h1>
            <p className="text-gray-500 leading-relaxed">
              Each of our programs is meticulously designed to match the developmental needs of children at each age — ensuring the right balance of challenge, exploration and joy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      {programs.map((p, i) => (
        <section key={i} className={`py-20 ${p.color}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? '' : ''}`}>
              <motion.div {...fadeUp()} className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <p className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: p.accent }}>{p.age}</p>
                <h2 className="text-4xl font-light text-[#333333] mb-4">{p.name}</h2>
                <p className="text-gray-500 leading-relaxed mb-8">{p.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                  {p.highlights.map((h, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: p.accent }} />
                      {h}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-400 mb-8">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {p.timing}</span>
                  <span className="flex items-center gap-2"><Users className="w-4 h-4" /> {p.ratio} ratio</span>
                </div>
                <Link to="/Admissions" className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-medium transition-opacity hover:opacity-90" style={{ backgroundColor: p.accent }}>
                  Apply for {p.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div {...fadeUp(0.2)} className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                  <img
                    src={`${p.img}${p.img.includes('?') ? '&' : '?'}auto=format&q=80`}
                    alt={p.name}
                    className="w-full h-[420px] object-cover"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 dark-section">
        <div className="max-w-3xl mx-auto text-center px-6">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl font-light text-white mb-4">Not sure which program is right?</h2>
            <p className="text-white/90 mb-8">Our school counsellor is happy to guide you. Schedule a free consultation today.</p>
            <Link to="/Contact" className="inline-flex items-center gap-2 bg-[#4A90E2] text-white px-7 py-3.5 rounded-xl font-medium hover:bg-[#3d7fcf] transition-colors shadow-md">
              Book a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}