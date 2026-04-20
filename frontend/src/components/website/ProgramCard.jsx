import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// ── 3D SVG Icons ──────────────────────────────────────────────

const TeddyBearIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Ears */}
    <circle cx="22" cy="22" r="10" fill="#D4956A"/>
    <circle cx="22" cy="22" r="6" fill="#F2C49B"/>
    <circle cx="58" cy="22" r="10" fill="#D4956A"/>
    <circle cx="58" cy="22" r="6" fill="#F2C49B"/>
    {/* Head shadow */}
    <ellipse cx="40" cy="43" rx="22" ry="4" fill="#00000015"/>
    {/* Head */}
    <circle cx="40" cy="34" r="22" fill="#E8A87C"/>
    {/* Face highlight */}
    <ellipse cx="34" cy="27" rx="6" ry="4" fill="#F5C9A0" opacity="0.6"/>
    {/* Eyes */}
    <circle cx="32" cy="30" r="4" fill="#3D2B1F"/>
    <circle cx="48" cy="30" r="4" fill="#3D2B1F"/>
    <circle cx="33.5" cy="28.5" r="1.5" fill="white"/>
    <circle cx="49.5" cy="28.5" r="1.5" fill="white"/>
    {/* Snout */}
    <ellipse cx="40" cy="39" rx="8" ry="6" fill="#F2C49B"/>
    {/* Nose */}
    <ellipse cx="40" cy="36.5" rx="3" ry="2" fill="#3D2B1F"/>
    {/* Mouth */}
    <path d="M36 40.5 Q40 44 44 40.5" stroke="#3D2B1F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Cheeks */}
    <circle cx="26" cy="37" r="4" fill="#F2845A" opacity="0.4"/>
    <circle cx="54" cy="37" r="4" fill="#F2845A" opacity="0.4"/>
    {/* Body */}
    <ellipse cx="40" cy="62" rx="16" ry="13" fill="#D4956A"/>
    <ellipse cx="40" cy="60" rx="10" ry="8" fill="#F2C49B"/>
    {/* Arms */}
    <ellipse cx="20" cy="60" rx="7" ry="10" fill="#D4956A" transform="rotate(-15 20 60)"/>
    <ellipse cx="60" cy="60" rx="7" ry="10" fill="#D4956A" transform="rotate(15 60 60)"/>
    {/* Paws */}
    <ellipse cx="14" cy="67" rx="6" ry="4" fill="#E8A87C"/>
    <ellipse cx="66" cy="67" rx="6" ry="4" fill="#E8A87C"/>
  </svg>
);

const AlphabetBlocksIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Back block - blue */}
    <rect x="30" y="8" width="36" height="36" rx="5" fill="#5B9BD5"/>
    <rect x="30" y="8" width="36" height="10" rx="5" fill="#7BB3E8"/>
    <rect x="30" y="8" width="10" height="36" rx="5" fill="#4A85BB"/>
    <text x="43" y="33" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial">B</text>
    {/* Shadow */}
    <ellipse cx="36" cy="72" rx="18" ry="4" fill="#00000015"/>
    {/* Front block - yellow */}
    <rect x="8" y="32" width="36" height="36" rx="5" fill="#F2C94C"/>
    <rect x="8" y="32" width="36" height="10" rx="5" fill="#F7DC7A"/>
    <rect x="8" y="32" width="10" height="36" rx="5" fill="#D4A835"/>
    <text x="20" y="58" fontSize="14" fontWeight="bold" fill="#7A5A00" fontFamily="Arial">A</text>
    {/* Top block - green */}
    <rect x="20" y="18" width="28" height="28" rx="4" fill="#6BBF7A"/>
    <rect x="20" y="18" width="28" height="8" rx="4" fill="#89D998"/>
    <rect x="20" y="18" width="8" height="28" rx="4" fill="#56A564"/>
    <text x="29" y="38" fontSize="11" fontWeight="bold" fill="white" fontFamily="Arial">C</text>
  </svg>
);

const PuzzlePiecesIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Shadow */}
    <ellipse cx="40" cy="74" rx="22" ry="4" fill="#00000015"/>
    {/* Top-left piece - pink */}
    <path d="M10 10 L34 10 L34 20 Q38 20 38 24 Q38 28 34 28 L34 34 L24 34 Q24 30 20 30 Q16 30 16 34 L10 34 Z" fill="#FF8FAB"/>
    <path d="M10 10 L34 10 L34 16 Q38 16 38 20 Q38 24 34 24 L34 28" stroke="#E07090" strokeWidth="1" fill="none"/>
    {/* Top-right piece - purple */}
    <path d="M70 10 L46 10 L46 20 Q42 20 42 24 Q42 28 46 28 L46 34 L56 34 Q56 30 60 30 Q64 30 64 34 L70 34 Z" fill="#A78BFA"/>
    <path d="M70 10 L46 10 L46 16 Q42 16 42 20 Q42 24 46 24 L46 28" stroke="#8B6EE8" strokeWidth="1" fill="none"/>
    {/* Bottom-left piece - orange */}
    <path d="M10 70 L34 70 L34 60 Q38 60 38 56 Q38 52 34 52 L34 46 L24 46 Q24 50 20 50 Q16 50 16 46 L10 46 Z" fill="#FB923C"/>
    <path d="M10 70 L34 70 L34 64 Q38 64 38 60 Q38 56 34 56 L34 52" stroke="#DC6820" strokeWidth="1" fill="none"/>
    {/* Bottom-right piece - teal */}
    <path d="M70 70 L46 70 L46 60 Q42 60 42 56 Q42 52 46 52 L46 46 L56 46 Q56 50 60 50 Q64 50 64 46 L70 46 Z" fill="#34D399"/>
    <path d="M70 70 L46 70 L46 64 Q42 64 42 60 Q42 56 46 56 L46 52" stroke="#20B880" strokeWidth="1" fill="none"/>
    {/* Stars on pieces */}
    <text x="16" y="26" fontSize="10" fill="white" opacity="0.8">★</text>
    <text x="52" y="26" fontSize="10" fill="white" opacity="0.8">★</text>
    <text x="16" y="62" fontSize="10" fill="white" opacity="0.8">★</text>
    <text x="52" y="62" fontSize="10" fill="white" opacity="0.8">★</text>
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Rocket body */}
    <path d="M40 6 C40 6 55 20 55 42 L25 42 C25 20 40 6 40 6Z" fill="#6366F1"/>
    <path d="M40 6 C40 6 47 20 47 42 L40 42 L40 6Z" fill="#818CF8"/>
    {/* Window */}
    <circle cx="40" cy="28" r="7" fill="#BAE6FD"/>
    <circle cx="40" cy="28" r="5" fill="#7DD3FC"/>
    <circle cx="38" cy="26" r="1.5" fill="white" opacity="0.8"/>
    {/* Body bottom */}
    <rect x="25" y="40" width="30" height="10" rx="3" fill="#4F46E5"/>
    {/* Side fins */}
    <path d="M25 42 L12 55 L25 50 Z" fill="#EC4899"/>
    <path d="M55 42 L68 55 L55 50 Z" fill="#EC4899"/>
    {/* Side fin highlight */}
    <path d="M25 42 L17 50 L25 48 Z" fill="#F9A8D4" opacity="0.7"/>
    <path d="M55 42 L63 50 L55 48 Z" fill="#F9A8D4" opacity="0.7"/>
    {/* Exhaust */}
    <path d="M32 50 Q34 58 30 65 Q36 60 40 65 Q44 60 50 65 Q46 58 48 50 Z" fill="#F97316" opacity="0.9"/>
    <path d="M35 50 Q37 56 34 62 Q40 58 40 63 Q40 58 46 62 Q43 56 45 50 Z" fill="#FBBF24"/>
    <path d="M37 50 Q39 54 38 58 Q40 55 42 58 Q41 54 43 50 Z" fill="#FEF3C7"/>
    {/* Stars */}
    <circle cx="15" cy="18" r="2" fill="#FCD34D"/>
    <circle cx="65" cy="12" r="1.5" fill="#FCD34D"/>
    <circle cx="70" cy="30" r="1" fill="#FCD34D"/>
    <circle cx="10" cy="35" r="1.5" fill="#FCD34D"/>
  </svg>
);

const icons = [TeddyBearIcon, AlphabetBlocksIcon, PuzzlePiecesIcon, RocketIcon];

const glowColors = [
  'rgba(242,166,90,0.35)',   // warm orange for Playgroup
  'rgba(91,155,213,0.35)',   // blue for Nursery
  'rgba(168,139,250,0.35)',  // purple for LKG
  'rgba(99,102,241,0.35)',   // indigo for UKG
];

const bgColors = [
  'from-amber-50 to-orange-50',
  'from-blue-50 to-sky-50',
  'from-purple-50 to-violet-50',
  'from-indigo-50 to-blue-50',
];

const accentColors = [
  '#F2A65A',
  '#5B9BD5',
  '#A78BFA',
  '#6366F1',
];

export default function ProgramCard({ program, index }) {
  const Icon3D = icons[index];
  const glow = glowColors[index];
  const bg = bgColors[index];
  const accent = accentColors[index];

  return (
    <motion.div
      initial={{ y: 24 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className={`bg-gradient-to-b ${bg} rounded-3xl p-7 cursor-pointer border border-white shadow-md hover:shadow-2xl transition-shadow duration-300 group flex flex-col`}
    >
      {/* Icon wrapper */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
          style={{ background: glow, width: 80, height: 80, margin: 'auto' }}
        />
        {/* Soft bg circle */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm relative z-10 bg-white"
          style={{ boxShadow: `0 4px 20px ${glow}` }}
        >
          <motion.div
            className="w-14 h-14"
            whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon3D />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-[#333333] mb-1">{program.name}</h3>
      <p className="text-sm font-semibold mb-3" style={{ color: accent }}>{program.age}</p>
      <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-6">{program.desc}</p>

      <Link
        to="/Programs"
        className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all duration-200"
        style={{ color: accent }}
      >
        Learn more <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </motion.div>
  );
}