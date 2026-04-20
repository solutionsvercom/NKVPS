import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#FF8A5B] via-[#FF6F61] to-[#C79BFF] p-10 md:p-16 text-center"
        >
          <div className="absolute top-6 left-10 w-20 h-20 rounded-full bg-white/10 animate-float" />
          <div className="absolute bottom-6 right-10 w-16 h-16 rounded-full bg-white/10 animate-float" style={{ animationDelay: '1.5s' }} />

          <Sparkles className="w-10 h-10 text-[#FFD84D] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Child's Journey?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Admissions are now open! Give your child the best start with our AI-powered, play-based learning approach.
          </p>
          <Link to="/Admissions">
            <Button className="bg-white text-[#FF6F61] rounded-full px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
              Apply Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}