import React from 'react';

/** Official school logo — single asset served from `/logo.png` (see `frontend/public`). */
export default function SchoolLogo({ className = 'h-12 w-auto object-contain', ...props }) {
  return (
    <img
      src="/logo.png"
      alt="Navjyoti Kids Villa Gurukul Educational Foundation"
      className={className}
      {...props}
    />
  );
}
