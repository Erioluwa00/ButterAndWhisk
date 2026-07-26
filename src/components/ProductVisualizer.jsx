import React from 'react';

export const ProductVisualizer = ({ type, size = '100%', isStoryRoom = false }) => {
  const getImageUrl = () => {
    switch (type) {
      case 'layered-cake':
        return '/chocolate_cake.png';
      case 'wedding-cake':
        return '/wedding_cake.png';
      case 'cupcake':
        return '/blush_cupcake.png';
      case 'donut':
        return '/pistachio_donut.png';
      case 'cookie':
        return '/sea_salt_cookie.png';
      case 'croissant':
        return '/golden_croissant.png';
      case 'bread':
        return '/sourdough_bread.png';
      case 'pastry':
        return '/cardamom_knot.png';
      case 'pie':
        return '/apple_pie.png';
      case 'tart':
        return '/lemon_tart.png';
      case 'macarons':
        return '/macaron_box.png';
      case 'cheesecake':
        return '/basque_cheesecake.png';
      default:
        return '/chocolate_cake.png';
    }
  };

  const imgStyle = isStoryRoom ? {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
    boxShadow: '0 25px 60px rgba(78, 52, 46, 0.28)',
    border: '6px solid var(--color-ivory)',
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
  } : {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  return (
    <div 
      className="product-visualizer" 
      style={{ 
        width: size, 
        height: size, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        borderRadius: isStoryRoom ? 'none' : '0',
        overflow: isStoryRoom ? 'visible' : 'hidden'
      }}
    >
      <img 
        src={getImageUrl()} 
        alt={type} 
        style={imgStyle} 
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06) rotate(1.5deg)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
      />
    </div>
  );
};
