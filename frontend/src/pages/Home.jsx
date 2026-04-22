import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, BookOpen, Shield, Play } from 'lucide-react';
import TestimonialSlider from '@/components/website/TestimonialSlider';
import ProgramCard from '@/components/website/ProgramCard';
import FloatingDecorations from '@/components/website/FloatingDecorations';

/** Slide-in only (no opacity hide) so images inside are never stuck invisible */
const fadeUp = (delay = 0) => ({
  initial: { y: 28 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay },
});

const programs = [
  { name: 'Play Group', age: '2yrs - 3yrs', desc: 'The early years comes only once for a child and are critical for long term development, so good care and overall development is a must which can be achieved through good curriculum.', emoji: '🌱' },
  { name: 'Nursery', age: '3yrs - 4yrs', desc: 'The curriculum of our school aims at helping the child to unfold his/her talents, to facilitate and guide the child to sharpen his mental and physical abilities.', emoji: '🎨' },
  { name: 'K-1', age: '4yrs - 5yrs', desc: 'It helps to enhance the learning, speaking, writing and listening skills of the child. The programme is based on a child-centred approach where through play-way method the basic concepts are taught.', emoji: '🔬' },
  { name: 'K-2', age: '5yrs - 6yrs', desc: 'A safe, caring stimulating environment is provided where the child can develop at his own pace.', emoji: '🚀' },
];

const stats = [
  { value: '250+', label: 'Happy Students' },
  { value: '25+', label: 'Dedicated Educators' },
  { value: '18+', label: 'Years of Excellence' },
  { value: '98%', label: 'Parent Satisfaction' },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden hero-gradient"
      >
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: 'easeOut' }}
            className="absolute inset-0 min-h-full w-full opacity-50"
            style={{ y: imgY }}
          >
            <img
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1800&h=1100&fit=crop&auto=format&q=85"
              alt=""
              className="h-full min-h-[100vh] w-full object-cover object-center"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>
        </div>

        <FloatingDecorations zone="hero" opacity={0.22} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 min-h-screen flex items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-pink-100 rounded-full px-4 py-2 mb-8 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF4D4D] animate-pulse" />
              <span className="text-sm text-[#333333] font-medium tracking-wide">Open Admission for 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.08] mb-6"
            >
              <span className="text-[#333333]">Open Admission for</span><br />
              <span className="font-semibold text-[#FF4D4D]">2026</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-600 leading-relaxed mb-10 max-w-lg"
            >
              Seats Limited!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/Programs"
                className="inline-flex items-center gap-2 bg-[#4A90E2] text-white px-8 py-4 rounded-2xl font-medium hover:bg-[#3d7fcf] transition-all hover:-translate-y-1 hover:scale-[1.02] shadow-lg shadow-[#4A90E2]/25 active:scale-95"
              >
                <Play className="w-4 h-4" /> Explore Programs
              </Link>
              <Link
                to="/Admissions"
                className="inline-flex items-center gap-2 bg-white border-2 border-[#FF4D4D]/30 text-[#333333] px-8 py-4 rounded-2xl font-medium hover:bg-[#FFF5CC]/80 transition-all hover:-translate-y-1 active:scale-95 shadow-md"
              >
                Apply for Admission <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 mt-12"
            >
              {['Engage', 'Learn', 'Grow'].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl px-5 py-3 text-center shadow-md border border-pink-100/50">
                  <p className="text-xl font-bold text-[#333333]">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border-2 border-gray-300 flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      <section className="section-blue py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-x divide-[#333333]/10">
          {stats.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)} className="text-center px-4">
              <p className="text-3xl font-bold text-[#333333]">{s.value}</p>
              <p className="text-gray-600 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 section-yellow relative overflow-x-hidden pb-8">
        <FloatingDecorations zone="welcome" opacity={0.4} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center relative">
          <motion.div {...fadeUp()}>
            <div className="relative pb-6">
              <div className="grid grid-cols-2 gap-3">
                <img src="https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674592/IMG_20260417_103140_xk9mkh.jpg" alt="Arts" className="rounded-2xl h-52 w-full object-cover shadow-md bg-gray-100" loading="lazy" decoding="async" />
                <img src="https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674592/IMG_20260417_104241_m5ijov.jpg" alt="Play" className="rounded-2xl h-52 w-full object-cover shadow-md mt-8 bg-gray-100" loading="lazy" decoding="async" />
                <img src="https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674528/IMG_20260417_093045_yj3dar.jpg" alt="Music" className="rounded-2xl h-52 w-full object-cover shadow-md -mt-4 bg-gray-100" loading="lazy" decoding="async" />
                <img src="https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674527/IMG_20260417_092136_hwycy3.jpg" alt="Learning" className="rounded-2xl h-52 w-full object-cover shadow-md mt-4 bg-gray-100" loading="lazy" decoding="async" />
              </div>
              <div className="absolute -bottom-4 left-4 right-4 bg-[#4A90E2] rounded-2xl px-5 py-3 flex items-center gap-3 shadow-xl">
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                <p className="text-white text-sm font-medium">Registered School · Certified Excellence in Early Education</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.2)}>
            <p className="text-sm font-medium text-[#4A90E2] uppercase tracking-wider mb-3">About Us</p>
            <h2 className="text-4xl font-light text-[#333333] leading-snug mb-6">
              About Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              With a unique, one of its kind concept, Navjyoti Kids Villa School is a place where children grow and develop while reading, listening and playing. Here they move from dependence to independence, from shaky coordination to refined skills, from body language to verbal communication, from self absorption to growing social awareness.
            </p>
            <div className="space-y-3 mb-8">
              {['Play Group - 2yrs - 3yrs', 'Nursery - 3yrs - 4yrs', 'K-1 - 4yrs - 5yrs', 'K-2 - 5yrs - 6yrs'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-[#6BCB77]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-[#6BCB77]" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
            <Link to="/About" className="inline-flex items-center gap-2 text-[#4A90E2] font-medium hover:gap-3 transition-all group">
              Programme Age
              <span className="w-7 h-7 rounded-full bg-[#4A90E2]/10 flex items-center justify-center group-hover:bg-[#4A90E2] transition-colors">
                <ArrowRight className="w-3.5 h-3.5 text-[#4A90E2] group-hover:text-white transition-colors" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 section-green relative overflow-hidden">
        <FloatingDecorations zone="programs" opacity={0.45} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="text-sm font-medium text-[#4A90E2] uppercase tracking-wider mb-3">Programme Age</p>
            <h2 className="text-4xl font-light text-[#333333]">Programme <span className="font-semibold">Age</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((p, i) => (
              <ProgramCard key={i} program={p} index={i} />
            ))}
          </div>
          <motion.div {...fadeUp(0.3)} className="text-center mt-10">
            <Link to="/Programs" className="inline-flex items-center gap-2 border-2 border-[#4A90E2] text-[#4A90E2] px-6 py-3 rounded-2xl font-medium hover:bg-[#4A90E2] hover:text-white transition-all hover:scale-[1.02] bg-white shadow-sm">
              View All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 section-pink">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp(0.1)}>
            <p className="text-sm font-medium text-[#4A90E2] uppercase tracking-wider mb-3">Teachers</p>
            <h2 className="text-4xl font-light text-[#333333] mb-8">
              Teachers
            </h2>
            <div className="space-y-6">
              {[
                { icon: Users, title: 'Teachers', desc: 'Our teachers are well trained, dedicated and encouraging staff who are passionate about learning and supporting our young learners.', color: 'bg-blue-50 text-blue-500' },
                { icon: Shield, title: 'Teachers', desc: 'Our teachers employ diverse pedagogies to spark interest in a child’s initial learning stages and foster their holistic development.', color: 'bg-green-50 text-green-500' },
                { icon: BookOpen, title: 'Teachers', desc: 'It sets a strong foundation for life long learning.', color: 'bg-orange-50 text-orange-400' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-2xl bg-white/80 hover:bg-white transition-all hover:scale-[1.01] shadow-sm"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#333333] mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUp()} className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
              <img src="https://res.cloudinary.com/dmuoamdsu/image/upload/v1776674588/IMG_20260417_103149_cmivtm.jpg" alt="Facilities" className="w-full h-[500px] object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-5 shadow-xl border border-gray-100">
              <p className="text-2xl font-bold text-[#333333]">4.8 / 5</p>
              <p className="text-xs text-gray-500 mt-0.5">Average parent rating</p>
            </div>
          </motion.div>
        </div>
      </section>

      <TestimonialSlider />

      <section className="dark-section py-24 relative overflow-hidden">
        <FloatingDecorations zone="cta" opacity={0.2} />
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFD93D] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp()}>
            <p className="text-sm font-medium text-white uppercase tracking-wider mb-4">Begin the Journey</p>
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
              Give Your Child the<br /><span className="font-semibold text-[#FFD93D]">Best Start in Life</span>
            </h2>
            <p className="text-white/90 mb-10 max-w-xl mx-auto">Open Admission for 2026 at Navjyoti Kids Villa School.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/Admissions" className="bg-[#4A90E2] text-white px-8 py-4 rounded-2xl font-medium hover:bg-[#3d7fcf] transition-all hover:-translate-y-0.5 hover:scale-[1.02] shadow-lg inline-flex items-center gap-2">
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/Contact" className="border-2 border-white/80 text-white px-8 py-4 rounded-2xl font-medium hover:bg-white/10 hover:-translate-y-0.5 transition-all">
                Schedule a Visit
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
