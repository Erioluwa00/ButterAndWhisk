import React from 'react';

export const DrippingIcing = ({ color = 'var(--bg-secondary)', position = 'bottom', className = '' }) => {
  const isTop = position === 'top';
  
  const dripPath = "M0,0 L0,30 Q30,65 60,30 Q90,10 120,40 Q150,70 180,35 Q210,15 240,45 Q270,75 300,40 Q330,20 360,50 Q390,80 420,42 Q450,15 480,48 Q510,78 540,40 Q570,20 600,55 Q630,85 660,45 Q690,15 720,50 Q750,80 780,42 Q810,15 840,48 Q870,78 900,40 Q930,15 960,55 Q990,85 1020,45 Q1050,10 1080,40 Q1110,70 1140,35 Q1170,15 1200,45 L1200,0 Z";

  const style = {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '45px',
    fill: color,
    zIndex: 5,
    pointerEvents: 'none',
    transform: isTop ? 'rotate(180deg) translateY(-1px)' : 'translateY(0)',
    [isTop ? 'top' : 'bottom']: 0
  };

  return (
    <svg 
      viewBox="0 0 1200 80" 
      preserveAspectRatio="none" 
      style={style}
      className={`dripping-icing ${className}`}
    >
      <path d={dripPath} />
    </svg>
  );
};
