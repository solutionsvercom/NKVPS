import React from 'react';
import { motion } from 'framer-motion';

// ── Individual SVG decoratives ──────────────────────────────

const Crayon = ({ color = '#F2A65A' }) => (
  <svg viewBox="0 0 24 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="6" y="8" width="12" height="38" rx="3" fill={color}/>
    <rect x="6" y="8" width="12" height="10" rx="3" fill="white" opacity="0.3"/>
    <polygon points="6,46 12,58 18,46" fill={color} opacity="0.85"/>
    <rect x="6" y="6" width="12" height="6" rx="2" fill="#888" opacity="0.6"/>
    <rect x="7" y="18" width="3" height="20" rx="1.5" fill="white" opacity="0.25"/>
  </svg>
);

const Pencil = ({ color = '#FFD166' }) => (
  <svg viewBox="0 0 20 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="6" width="12" height="44" rx="2" fill={color}/>
    <rect x="4" y="6" width="12" height="8" rx="2" fill="#ccc"/>
    <rect x="4" y="14" width="12" height="4" fill="#f4a261" opacity="0.6"/>
    <polygon points="4,50 10,62 16,50" fill="#F5CBA7"/>
    <polygon points="7,50 10,58 13,50" fill="#3D2B1F"/>
    <rect x="5" y="10" width="3" height="30" rx="1.5" fill="white" opacity="0.2"/>
  </svg>
);

const OpenBook = () => (
  <svg viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M30 8 Q20 6 6 10 L6 38 Q18 34 30 36 Z" fill="#7BB3E8"/>
    <path d="M30 8 Q40 6 54 10 L54 38 Q42 34 30 36 Z" fill="#F48FB1"/>
    <path d="M30 8 L30 36" stroke="#555" strokeWidth="1.5"/>
    {/* Lines on pages */}
    <line x1="10" y1="16" x2="26" y2="14.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    <line x1="10" y1="21" x2="26" y2="19.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    <line x1="10" y1="26" x2="26" y2="24.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    <line x1="34" y1="14.5" x2="50" y2="16" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    <line x1="34" y1="19.5" x2="50" y2="21" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    <line x1="34" y1="24.5" x2="50" y2="26" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    {/* Shadow */}
    <ellipse cx="30" cy="40" rx="20" ry="3" fill="#00000015"/>
  </svg>
);

const Star3D = ({ color = '#FCD34D' }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="20,3 24.5,14.5 37,14.5 27,22 30.5,34 20,27 9.5,34 13,22 3,14.5 15.5,14.5" fill={color}/>
    <polygon points="20,3 24.5,14.5 37,14.5 27,22 30.5,34 20,27 9.5,34 13,22 3,14.5 15.5,14.5" fill="white" opacity="0.2" clipPath="url(#starHalf)"/>
    <defs>
      <clipPath id="starHalf"><rect x="0" y="0" width="20" height="40"/></clipPath>
    </defs>
    <polygon points="20,6 24,16 35,16 26.5,22.5 29.5,33 20,27" fill="white" opacity="0.15"/>
  </svg>
);

const Letter = ({ char, color }) => (
  <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="2" y="2" width="36" height="36" rx="8" fill={color}/>
    <rect x="2" y="2" width="36" height="14" rx="8" fill="white" opacity="0.2"/>
    <text x="20" y="26" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">{char}</text>
    <rect x="2" y="38" width="36" height="4" rx="4" fill={color} opacity="0.5"/>
  </svg>
);

const PaintBrush = () => (
  <svg viewBox="0 0 18 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="5" y="4" width="8" height="40" rx="4" fill="#D4956A"/>
    <rect x="6" y="4" width="3" height="30" rx="1.5" fill="white" opacity="0.2"/>
    <rect x="4" y="42" width="10" height="6" rx="1" fill="#888"/>
    <ellipse cx="9" cy="54" rx="5" ry="8" fill="#7BAE7F"/>
    <ellipse cx="9" cy="50" rx="4" ry="4" fill="#89D998" opacity="0.6"/>
  </svg>
);

// ── Decoration config ──────────────────────────────────────

const floatAnim = (duration = 3, y = 10) => ({
  animate: { y: [0, -y, 0] },
  transition: { duration, repeat: Infinity, ease: 'easeInOut' },
});

const rotateAnim = (duration = 6, deg = 15) => ({
  animate: { rotate: [-deg, deg, -deg] },
  transition: { duration, repeat: Infinity, ease: 'easeInOut' },
});

const bounceAnim = (duration = 2) => ({
  animate: { y: [0, -8, 0] },
  transition: { duration, repeat: Infinity, ease: 'easeInOut' },
});

// ── Preset decoration sets per "zone" ──────────────────────

const DECORATIONS = {
  hero: [
    { el: <Crayon color="#F2A65A" />, style: { top: '12%', left: '3%' }, size: 'w-6 h-14', anim: rotateAnim(4, 12) },
    { el: <Star3D color="#FCD34D" />, style: { top: '18%', right: '5%' }, size: 'w-8 h-8', anim: floatAnim(2.5, 8) },
    { el: <Letter char="A" color="#7BAE7F" />, style: { bottom: '18%', right: '6%' }, size: 'w-9 h-10', anim: bounceAnim(2.8) },
    { el: <Star3D color="#F48FB1" />, style: { bottom: '25%', left: '2%' }, size: 'w-6 h-6', anim: floatAnim(3.5, 6) },
  ],
  programs: [
    { el: <Pencil color="#FFD166" />, style: { top: '8%', right: '2%' }, size: 'w-5 h-14', anim: rotateAnim(5, 10) },
    { el: <Star3D color="#FCD34D" />, style: { top: '6%', left: '1%' }, size: 'w-7 h-7', anim: floatAnim(3, 8) },
    { el: <Letter char="B" color="#A78BFA" />, style: { bottom: '10%', left: '1.5%' }, size: 'w-8 h-9', anim: bounceAnim(3.2) },
    { el: <OpenBook />, style: { bottom: '8%', right: '2%' }, size: 'w-12 h-9', anim: floatAnim(4, 7) },
  ],
  welcome: [
    { el: <PaintBrush />, style: { top: '10%', left: '1%' }, size: 'w-5 h-14', anim: rotateAnim(6, 8) },
    { el: <Star3D color="#6EE7B7" />, style: { bottom: '12%', right: '1.5%' }, size: 'w-7 h-7', anim: floatAnim(2.8, 9) },
    { el: <Letter char="C" color="#F2A65A" />, style: { top: '15%', right: '2%' }, size: 'w-8 h-9', anim: bounceAnim(3.5) },
  ],
  cta: [
    { el: <Star3D color="#FCD34D" />, style: { top: '20%', left: '4%' }, size: 'w-8 h-8', anim: floatAnim(3, 8) },
    { el: <Star3D color="#F48FB1" />, style: { top: '15%', right: '5%' }, size: 'w-6 h-6', anim: floatAnim(2.5, 6) },
    { el: <Letter char="★" color="#7BAE7F" />, style: { bottom: '15%', left: '3%' }, size: 'w-8 h-9', anim: bounceAnim(2.8) },
    { el: <Crayon color="#818CF8" />, style: { bottom: '20%', right: '3%' }, size: 'w-5 h-12', anim: rotateAnim(5, 10) },
  ],
};

export default function FloatingDecorations({ zone = 'hero', opacity = 0.55 }) {
  const items = DECORATIONS[zone] || [];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity }}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.size} drop-shadow-md`}
          style={item.style}
          {...item.anim}
        >
          {item.el}
        </motion.div>
      ))}
    </div>
  );
}