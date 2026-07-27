import React from 'react';

export const Logo = ({ size = 32, color = 'var(--color-terracotta)' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
      className="navbar-brand-logo"
    >
      {/* Outer elegant ring */}
      <circle cx="50" cy="50" r="46" stroke="var(--text-primary)" strokeWidth="1.5" opacity="0.3" />
      
      {/* Inner solid badge with light opacity */}
      <circle cx="50" cy="50" r="40" fill={color} opacity="0.1" />
      <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="2.5" />
      
      {/* Stylized Whisk and Wheat stem */}
      {/* Whisk handle */}
      <path d="M50 70 V52" stroke="var(--text-primary)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="74" r="3.5" fill="var(--text-primary)" />
      
      {/* Whisk cage loops */}
      <path d="M50 52 C35 52 35 24 50 24 C65 24 65 52 50 52 Z" stroke="var(--text-primary)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M50 52 C41 52 41 24 50 24 C59 24 59 52 50 52 Z" stroke="var(--text-primary)" strokeWidth="2.0" strokeLinejoin="round" />
      <path d="M50 52 V24" stroke="var(--text-primary)" strokeWidth="1.5" />

      {/* Decorative stars for premium touch */}
      <path d="M28 42 L30 45 L33 42 L30 39 Z" fill="var(--color-butter)" />
      <path d="M72 42 L74 45 L77 42 L74 39 Z" fill="var(--color-butter)" />
    </svg>
  );
};
