import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Star, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF6E9] to-white py-16 md:py-24">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-[#FFD84D]/30 animate-float" />
      <div className="absolute top-40 right-16 w-12 h-12 rounded-full bg-[#C79BFF]/30 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/4 w-10 h-10 rounded-full bg-[#6ED3A3]/30 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-32 right-1/3 w-8 h-8 rounded-full bg-[#FF8A5B]/20 animate-bounce-soft" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -28 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#FFD84D]/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#FF8A5B]" />
              <span className="text-sm font-medium text-[#4A3F35]">AI-Powered Learning</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A3F35] leading-tight">
              <span className="relative inline-block">
                <span className="text-[#FF8A5B]">Navjyoti Kids Villa School</span>
                <Star className="absolute -top-3 -right-4 w-6 h-6 text-[#FFD84D] fill-[#FFD84D] animate-wiggle" />
              </span>
              <br />
              <span className="text-[#4A3F35]">Where young minds begin to</span>
              <span className="text-[#FF6F61]"> Shine</span>
              <Heart className="inline-block w-8 h-8 text-[#FF6F61] fill-[#FF6F61] ml-2 animate-bounce-soft" />
            </h1>

            <p className="mt-6 text-lg text-[#4A3F35]/70 leading-relaxed max-w-lg">
              A modern play school where creativity meets technology. We nurture every child with love, play-based learning, and AI-powered insights for their brightest future.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/Admissions">
                <Button className="bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white rounded-full px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                  Enroll Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/Programs">
                <Button variant="outline" className="rounded-full px-8 py-6 text-lg border-2 border-[#FF8A5B] text-[#FF8A5B] hover:bg-[#FF8A5B]/10">
                  Explore Programs
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-10">
              {[
                { num: '500+', label: 'Happy Students' },
                { num: '50+', label: 'Expert Teachers' },
                { num: '15+', label: 'Years of Trust' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold text-[#FF8A5B]">{stat.num}</p>
                  <p className="text-xs text-[#4A3F35]/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 28 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-[#FFD84D]/30 via-[#FF8A5B]/20 to-[#C79BFF]/30 rotate-6" />
              <div className="absolute inset-4 rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1564429238156-42c490abf24e?w=600&h=600&fit=crop&auto=format&q=80"
                  alt="Happy children learning"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl animate-bounce-soft">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#6ED3A3] flex items-center justify-center">
                    <span className="text-white text-lg">🎨</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4A3F35]">Creative Arts</p>
                    <p className="text-xs text-[#4A3F35]/60">Daily sessions</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#C79BFF] flex items-center justify-center">
                    <span className="text-white text-lg">🤖</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4A3F35]">AI Learning</p>
                    <p className="text-xs text-[#4A3F35]/60">Smart progress</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}