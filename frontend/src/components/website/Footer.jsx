import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import SchoolLogo from '@/components/website/SchoolLogo';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#FF4D4D] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <SchoolLogo className="h-14 w-14 sm:h-16 sm:w-16 object-contain shrink-0 rounded-full" />
              <div>
                <span className="text-lg font-semibold leading-tight">Navjyoti Kids Villa School</span>
                <p className="text-[10px] text-white/70 -mt-0.5 tracking-widest">a Mother&apos;s Lap</p>
              </div>
            </div>
            <p className="text-white/85 text-sm leading-relaxed mb-6 max-w-xs">
              Nurturing young minds in a safe, loving environment where every child's potential is celebrated and every day is a new adventure.
            </p>
            <div className="flex gap-3 mb-8">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center hover:bg-white/25 hover:scale-105 transition-all duration-200 group">
                  <Icon className="w-4 h-4 text-white/90 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
            {/* Newsletter */}
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-3">Subscribe to Updates</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/15 border border-white/30 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white"
              />
              <button type="submit" className="px-4 py-2.5 bg-[#4A90E2] rounded-xl hover:bg-[#3d7fcf] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-5">Quick Links</h3>
            <div className="space-y-3">
              {[['Home', '/Home'], ['About Us', '/About'], ['Facilities', '/Facilities'], ['Gallery', '/Gallery'], ['Contact', '/Contact']].map(([label, path]) => (
                <Link key={path} to={path} className="block text-sm text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-150">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-5">Programs</h3>
            <div className="space-y-3">
              {[['Playgroup', 'Ages 1.5–2.5'], ['Nursery', 'Ages 2.5–3.5'], ['Lower KG', 'Ages 3.5–4.5'], ['Upper KG', 'Ages 4.5–5.5']].map(([name, age]) => (
                <Link key={name} to="/Programs" className="block group">
                  <p className="text-sm text-white/80 group-hover:text-white transition-colors">{name}</p>
                  <p className="text-xs text-white/60">{age}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-5">Contact</h3>
            <div className="space-y-4">
              {[
                { Icon: Phone, text: '9953240430, 9718977004' },
                { Icon: Mail, text: 'hello@navjyotikidsvilla.edu' },
                {
                  Icon: MapPin,
                  text: 'House No 315, Block A, Gali no 6, Chhatarpur Enclave Phase 1, South Delhi, Delhi-110074',
                },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 mt-0.5 text-[#FFD93D] flex-shrink-0" />
                  <span className="text-sm text-white/85">{text}</span>
                </div>
              ))}
              <div className="pt-2">
                <p className="text-xs text-white/70 mb-1">School Hours</p>
                <p className="text-sm text-white/90">8:30 AM – 1:30 PM</p>
                <p className="text-xs text-white/70">Mon – Saturday</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/90">© 2026 Navjyoti Kids Villa School. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-white/80">
            <a href="https://vercomsolutions.in" target="_blank" className="hover:text-white transition-colors">Designed By : - Vercom Solutions Pvt. Ltd.</a>
          </div>
        </div>
      </div>
    </footer>
  );
}