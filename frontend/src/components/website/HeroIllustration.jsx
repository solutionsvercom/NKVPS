import React from 'react';
import { motion } from 'framer-motion';

export default function HeroIllustration() {
  return (
    <div className="relative w-full h-full select-none" style={{ minHeight: 420 }}>
      <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Sky gradient */}
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4eaf7" />
            <stop offset="100%" stopColor="#f0f9e8" />
          </linearGradient>
          <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE066" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#FFD84D" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFD84D" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a8d5a2" />
            <stop offset="100%" stopColor="#7BAE7F" />
          </linearGradient>
          <linearGradient id="path" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8dcc8" />
            <stop offset="100%" stopColor="#d4c4a8" />
          </linearGradient>
          <linearGradient id="building" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0f0f0" />
          </linearGradient>
          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#00000015" />
          </filter>
        </defs>

        {/* Sky */}
        <rect width="800" height="480" fill="url(#sky)" />

        {/* Sun glow */}
        <circle cx="680" cy="80" r="70" fill="url(#sun-glow)" />
        {/* Sun core */}
        <circle cx="680" cy="80" r="36" fill="#FFE066" />
        <circle cx="680" cy="80" r="28" fill="#FFD84D" />

        {/* Sun rays */}
        {[0,45,90,135,180,225,270,315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 680 + Math.cos(rad) * 42;
          const y1 = 80 + Math.sin(rad) * 42;
          const x2 = 680 + Math.cos(rad) * 58;
          const y2 = 80 + Math.sin(rad) * 58;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFD84D" strokeWidth="3" strokeLinecap="round" />;
        })}

        {/* Ground / Grass */}
        <ellipse cx="400" cy="490" rx="460" ry="90" fill="url(#grass)" />
        <rect x="0" y="400" width="800" height="100" fill="#7BAE7F" />

        {/* Path / sidewalk */}
        <path d="M 200 480 Q 350 420 500 400 Q 620 390 700 400 L 720 480 Z" fill="url(#path)" opacity="0.7" />

        {/* ── School Building ── */}
        {/* Main body */}
        <rect x="430" y="200" width="260" height="200" rx="8" fill="url(#building)" filter="url(#soft-shadow)" />
        {/* Accent stripe */}
        <rect x="430" y="200" width="260" height="12" rx="4" fill="#7BAE7F" />
        {/* Roof */}
        <polygon points="420,200 560,130 700,200" fill="#F2A65A" />
        <polygon points="430,200 560,138 690,200" fill="#F2A65A" />
        {/* Roof trim */}
        <line x1="420" y1="200" x2="700" y2="200" stroke="#e08a40" strokeWidth="3" />

        {/* Sign */}
        <rect x="455" y="142" width="210" height="50" rx="8" fill="#7BAE7F" />
        <text x="560" y="162" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="10" fill="white">
          <tspan x="560" dy="0">Navjyoti (Kids</tspan>
          <tspan x="560" dy="14">Villa) School</tspan>
        </text>

        {/* Windows */}
        <rect x="450" y="225" width="50" height="45" rx="5" fill="#d4eaf7" stroke="#c0d8ee" strokeWidth="2" />
        <line x1="475" y1="225" x2="475" y2="270" stroke="#c0d8ee" strokeWidth="1.5" />
        <line x1="450" y1="247" x2="500" y2="247" stroke="#c0d8ee" strokeWidth="1.5" />

        <rect x="520" y="225" width="50" height="45" rx="5" fill="#d4eaf7" stroke="#c0d8ee" strokeWidth="2" />
        <line x1="545" y1="225" x2="545" y2="270" stroke="#c0d8ee" strokeWidth="1.5" />
        <line x1="520" y1="247" x2="570" y2="247" stroke="#c0d8ee" strokeWidth="1.5" />

        <rect x="600" y="225" width="50" height="45" rx="5" fill="#d4eaf7" stroke="#c0d8ee" strokeWidth="2" />
        <line x1="625" y1="225" x2="625" y2="270" stroke="#c0d8ee" strokeWidth="1.5" />
        <line x1="600" y1="247" x2="650" y2="247" stroke="#c0d8ee" strokeWidth="1.5" />

        {/* Door */}
        <rect x="532" y="320" width="56" height="80" rx="28" fill="#F2A65A" />
        <rect x="538" y="326" width="44" height="68" rx="22" fill="#f5b978" />
        <circle cx="572" cy="362" r="4" fill="#e08a40" />

        {/* Steps */}
        <rect x="522" y="395" width="76" height="8" rx="3" fill="#e8dcc8" />
        <rect x="518" y="400" width="84" height="8" rx="3" fill="#d4c4a8" />

        {/* Flag */}
        <line x1="560" y1="95" x2="560" y2="138" stroke="#888" strokeWidth="2.5" />
        <polygon points="560,100 590,110 560,120" fill="#F2A65A" />

        {/* ── Trees ── */}
        {/* Tree 1 left */}
        <rect x="155" y="330" width="14" height="70" rx="4" fill="#8B5E3C" />
        <circle cx="162" cy="295" r="48" fill="#5a9a5e" />
        <circle cx="145" cy="310" r="32" fill="#6daa71" />
        <circle cx="180" cy="308" r="30" fill="#7BAE7F" />
        <circle cx="162" cy="285" r="28" fill="#7BAE7F" />

        {/* Tree 2 right */}
        <rect x="393" y="340" width="12" height="60" rx="3" fill="#8B5E3C" />
        <circle cx="399" cy="305" r="40" fill="#5a9a5e" />
        <circle cx="383" cy="318" r="26" fill="#6daa71" />
        <circle cx="415" cy="315" r="25" fill="#7BAE7F" />
        <circle cx="399" cy="295" r="24" fill="#7BAE7F" />

        {/* Tree 3 far right */}
        <rect x="710" y="330" width="14" height="70" rx="4" fill="#8B5E3C" />
        <circle cx="717" cy="295" r="42" fill="#5a9a5e" />
        <circle cx="700" cy="310" r="28" fill="#6daa71" />
        <circle cx="734" cy="308" r="26" fill="#7BAE7F" />
        <circle cx="717" cy="288" r="24" fill="#7BAE7F" />

        {/* Flowers on ground */}
        {[[200,415,'#FF8FAB'],[220,420,'#FFD84D'],[240,418,'#F2A65A'],[360,408,'#FF8FAB'],[375,412,'#FFD84D']].map(([x,y,c],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill={c} />
            <circle cx={x-5} cy={y-2} r="3" fill={c} />
            <circle cx={x+5} cy={y-2} r="3" fill={c} />
            <circle cx={x} cy={y-7} r="3" fill={c} />
            <circle cx={x} cy={y} r="3" fill="#fff8e1" />
          </g>
        ))}
      </svg>

      {/* ── Animated Clouds ── */}
      <motion.div
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[6%] left-[5%]"
      >
        <svg width="120" height="50" viewBox="0 0 120 50">
          <ellipse cx="60" cy="35" rx="55" ry="20" fill="white" opacity="0.9" />
          <ellipse cx="45" cy="28" rx="30" ry="20" fill="white" opacity="0.9" />
          <ellipse cx="75" cy="24" rx="28" ry="18" fill="white" opacity="0.9" />
        </svg>
      </motion.div>
      <motion.div
        animate={{ x: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-[4%] left-[30%]"
      >
        <svg width="90" height="40" viewBox="0 0 90 40">
          <ellipse cx="45" cy="28" rx="40" ry="14" fill="white" opacity="0.85" />
          <ellipse cx="32" cy="22" rx="22" ry="15" fill="white" opacity="0.85" />
          <ellipse cx="58" cy="19" rx="20" ry="14" fill="white" opacity="0.85" />
        </svg>
      </motion.div>
      <motion.div
        animate={{ x: [0, 25, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="absolute top-[9%] right-[18%]"
      >
        <svg width="80" height="36" viewBox="0 0 80 36">
          <ellipse cx="40" cy="26" rx="36" ry="12" fill="white" opacity="0.8" />
          <ellipse cx="28" cy="20" rx="20" ry="14" fill="white" opacity="0.8" />
          <ellipse cx="54" cy="17" rx="18" ry="13" fill="white" opacity="0.8" />
        </svg>
      </motion.div>

      {/* ── Birds ── */}
      <motion.div
        animate={{ x: [0, 120], y: [0, -15, 5, -10, 0], opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2, repeatDelay: 4 }}
        className="absolute top-[12%] left-[10%]"
      >
        <svg width="50" height="20" viewBox="0 0 50 20">
          <path d="M5 10 Q10 3 15 10" stroke="#555" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <path d="M20 8 Q26 1 32 8" stroke="#555" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <path d="M37 10 Q41 5 45 10" stroke="#555" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        </svg>
      </motion.div>
      <motion.div
        animate={{ x: [0, 90], y: [0, -10, 4, -8, 0], opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 7, repeatDelay: 6 }}
        className="absolute top-[18%] left-[20%]"
      >
        <svg width="36" height="16" viewBox="0 0 36 16">
          <path d="M3 8 Q8 2 13 8" stroke="#777" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M18 6 Q23 1 28 6" stroke="#777" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </motion.div>

      {/* ── Children ── */}
      {/* Child 1 — red dress */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
        className="absolute"
        style={{ bottom: '17%', left: '18%' }}
      >
        <svg width="52" height="100" viewBox="0 0 52 100">
          {/* Head */}
          <circle cx="26" cy="18" r="14" fill="#FDDBB4" />
          {/* Hair */}
          <ellipse cx="26" cy="8" rx="14" ry="8" fill="#5C3317" />
          <circle cx="12" cy="14" r="6" fill="#5C3317" />
          <circle cx="40" cy="14" r="6" fill="#5C3317" />
          {/* Eyes */}
          <circle cx="21" cy="17" r="2.5" fill="#333" />
          <circle cx="31" cy="17" r="2.5" fill="#333" />
          <circle cx="22" cy="16" r="1" fill="white" />
          <circle cx="32" cy="16" r="1" fill="white" />
          {/* Smile */}
          <path d="M 21 22 Q 26 27 31 22" stroke="#c0775a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Body - red dress */}
          <rect x="14" y="32" width="24" height="32" rx="6" fill="#E84A5F" />
          {/* Collar */}
          <path d="M 20 32 Q 26 38 32 32" stroke="#c43450" strokeWidth="1.5" fill="none"/>
          {/* Arms */}
          <rect x="2" y="33" width="12" height="8" rx="4" fill="#FDDBB4" transform="rotate(20,14,37)" />
          <rect x="38" y="33" width="12" height="8" rx="4" fill="#FDDBB4" transform="rotate(-20,38,37)" />
          {/* Skirt */}
          <path d="M 13 62 Q 10 78 8 88 L 20 88 L 26 72 L 32 88 L 44 88 Q 42 78 39 62 Z" fill="#E84A5F" />
          {/* Legs */}
          <rect x="14" y="85" width="10" height="14" rx="4" fill="#FDDBB4" />
          <rect x="28" y="85" width="10" height="14" rx="4" fill="#FDDBB4" />
          {/* Shoes */}
          <ellipse cx="19" cy="99" rx="8" ry="4" fill="#5C3317" />
          <ellipse cx="33" cy="99" rx="8" ry="4" fill="#5C3317" />
          {/* Backpack */}
          <rect x="33" y="34" width="13" height="18" rx="4" fill="#7BAE7F" />
          <rect x="35" y="38" width="9" height="10" rx="2" fill="#5a8a5e" />
        </svg>
      </motion.div>

      {/* Child 2 — blue shirt */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.75, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
        className="absolute"
        style={{ bottom: '17%', left: '27%' }}
      >
        <svg width="52" height="105" viewBox="0 0 52 105">
          <circle cx="26" cy="18" r="14" fill="#FDDBB4" />
          <ellipse cx="26" cy="7" rx="15" ry="9" fill="#3D2B1F" />
          <circle cx="13" cy="15" r="5" fill="#3D2B1F" />
          <circle cx="39" cy="15" r="5" fill="#3D2B1F" />
          <circle cx="21" cy="17" r="2.5" fill="#333" />
          <circle cx="31" cy="17" r="2.5" fill="#333" />
          <circle cx="22" cy="16" r="1" fill="white" />
          <circle cx="32" cy="16" r="1" fill="white" />
          <path d="M 20 22 Q 26 28 32 22" stroke="#c0775a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Blue shirt */}
          <rect x="13" y="32" width="26" height="30" rx="6" fill="#4A90D9" />
          <line x1="26" y1="32" x2="26" y2="62" stroke="#3a7fc9" strokeWidth="1.5" />
          <rect x="1" y="33" width="13" height="8" rx="4" fill="#FDDBB4" transform="rotate(15,12,37)" />
          <rect x="38" y="33" width="13" height="8" rx="4" fill="#FDDBB4" transform="rotate(-15,40,37)" />
          {/* Shorts */}
          <rect x="13" y="60" width="26" height="20" rx="4" fill="#2c5f8a" />
          <line x1="26" y1="60" x2="26" y2="80" stroke="#255077" strokeWidth="1.5" />
          <rect x="14" y="79" width="10" height="16" rx="4" fill="#FDDBB4" />
          <rect x="28" y="79" width="10" height="16" rx="4" fill="#FDDBB4" />
          <ellipse cx="19" cy="95" rx="8" ry="4" fill="#3D2B1F" />
          <ellipse cx="33" cy="95" rx="8" ry="4" fill="#3D2B1F" />
          {/* Backpack */}
          <rect x="33" y="33" width="13" height="18" rx="4" fill="#F2A65A" />
          <rect x="35" y="37" width="9" height="10" rx="2" fill="#e08a40" />
        </svg>
      </motion.div>

      {/* Child 3 — yellow dress */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        className="absolute"
        style={{ bottom: '17%', left: '36%' }}
      >
        <svg width="52" height="100" viewBox="0 0 52 100">
          <circle cx="26" cy="18" r="14" fill="#FDDBB4" />
          {/* Pigtails */}
          <ellipse cx="26" cy="7" rx="14" ry="8" fill="#C87941" />
          <ellipse cx="10" cy="16" rx="6" ry="10" fill="#C87941" />
          <ellipse cx="42" cy="16" rx="6" ry="10" fill="#C87941" />
          <circle cx="10" cy="10" r="5" fill="#F2A65A" />
          <circle cx="42" cy="10" r="5" fill="#F2A65A" />
          <circle cx="21" cy="17" r="2.5" fill="#333" />
          <circle cx="31" cy="17" r="2.5" fill="#333" />
          <circle cx="22" cy="16" r="1" fill="white" />
          <circle cx="32" cy="16" r="1" fill="white" />
          <path d="M 21 23 Q 26 28 31 23" stroke="#c0775a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Yellow dress */}
          <rect x="14" y="32" width="24" height="30" rx="6" fill="#FFD84D" />
          <rect x="2" y="33" width="12" height="8" rx="4" fill="#FDDBB4" transform="rotate(18,14,37)" />
          <rect x="38" y="33" width="12" height="8" rx="4" fill="#FDDBB4" transform="rotate(-18,38,37)" />
          <path d="M 12 60 Q 9 76 7 88 L 19 88 L 26 72 L 33 88 L 45 88 Q 43 76 40 60 Z" fill="#FFD84D" />
          <rect x="14" y="84" width="10" height="14" rx="4" fill="#FDDBB4" />
          <rect x="28" y="84" width="10" height="14" rx="4" fill="#FDDBB4" />
          <ellipse cx="19" cy="99" rx="8" ry="4" fill="#5C3317" />
          <ellipse cx="33" cy="99" rx="8" ry="4" fill="#5C3317" />
          <rect x="33" y="34" width="13" height="18" rx="4" fill="#E84A5F" />
          <rect x="35" y="38" width="9" height="10" rx="2" fill="#c43450" />
        </svg>
      </motion.div>

      {/* Child 4 — green shirt */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.72, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
        className="absolute"
        style={{ bottom: '17%', left: '45%' }}
      >
        <svg width="52" height="105" viewBox="0 0 52 105">
          <circle cx="26" cy="18" r="14" fill="#F9CBA0" />
          <ellipse cx="26" cy="8" rx="14" ry="9" fill="#4A2E1A" />
          <circle cx="14" cy="16" r="5" fill="#4A2E1A" />
          <circle cx="38" cy="16" r="5" fill="#4A2E1A" />
          <circle cx="21" cy="17" r="2.5" fill="#333" />
          <circle cx="31" cy="17" r="2.5" fill="#333" />
          <circle cx="22" cy="16" r="1" fill="white" />
          <circle cx="32" cy="16" r="1" fill="white" />
          <path d="M 20 23 Q 26 28 32 23" stroke="#b06040" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Green shirt */}
          <rect x="13" y="32" width="26" height="30" rx="6" fill="#7BAE7F" />
          <rect x="1" y="33" width="13" height="8" rx="4" fill="#F9CBA0" transform="rotate(15,12,37)" />
          <rect x="38" y="33" width="13" height="8" rx="4" fill="#F9CBA0" transform="rotate(-15,40,37)" />
          {/* Shorts */}
          <rect x="13" y="60" width="26" height="20" rx="4" fill="#5a7a5c" />
          <line x1="26" y1="60" x2="26" y2="80" stroke="#4a6a4c" strokeWidth="1.5" />
          <rect x="14" y="79" width="10" height="16" rx="4" fill="#F9CBA0" />
          <rect x="28" y="79" width="10" height="16" rx="4" fill="#F9CBA0" />
          <ellipse cx="19" cy="95" rx="8" ry="4" fill="#4A2E1A" />
          <ellipse cx="33" cy="95" rx="8" ry="4" fill="#4A2E1A" />
          <rect x="33" y="33" width="13" height="18" rx="4" fill="#4A90D9" />
          <rect x="35" y="37" width="9" height="10" rx="2" fill="#3a7fc9" />
        </svg>
      </motion.div>

      {/* ── Holding hands ── drawn as arcs between children */}
      <svg className="absolute" style={{ bottom: '22%', left: '16%', width: '36%', height: '50px', overflow: 'visible' }} viewBox="0 0 300 30">
        <path d="M 30 20 Q 50 5 70 20" stroke="#FDDBB4" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 110 20 Q 130 5 150 20" stroke="#FDDBB4" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 190 20 Q 210 5 230 20" stroke="#FDDBB4" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>

      {/* ── Sunlight glow overlay ── */}
      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,224,102,0.35) 0%, transparent 70%)', top: '-20px', right: '15%' }}
      />

      {/* ── Butterflies ── */}
      <motion.div
        animate={{ x: [0, 20, -10, 0], y: [0, -15, 5, 0], rotate: [0, 10, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute"
        style={{ bottom: '38%', left: '22%' }}
      >
        <svg width="20" height="16" viewBox="0 0 20 16">
          <path d="M10 8 Q2 0 0 6 Q2 12 10 8" fill="#F2A65A" opacity="0.8" />
          <path d="M10 8 Q18 0 20 6 Q18 12 10 8" fill="#F2A65A" opacity="0.8" />
          <line x1="10" y1="4" x2="10" y2="12" stroke="#555" strokeWidth="1" />
        </svg>
      </motion.div>
      <motion.div
        animate={{ x: [0, -15, 10, 0], y: [0, -12, 8, 0], rotate: [0, -8, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        className="absolute"
        style={{ bottom: '42%', left: '40%' }}
      >
        <svg width="16" height="14" viewBox="0 0 16 14">
          <path d="M8 7 Q1 0 0 5 Q1 10 8 7" fill="#E84A5F" opacity="0.7" />
          <path d="M8 7 Q15 0 16 5 Q15 10 8 7" fill="#E84A5F" opacity="0.7" />
          <line x1="8" y1="3" x2="8" y2="11" stroke="#555" strokeWidth="1" />
        </svg>
      </motion.div>
    </div>
  );
}