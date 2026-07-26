import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { products } from '../data/products';
import { ProductVisualizer } from '../components/ProductVisualizer';
import { Breadcrumb } from '../components/Breadcrumb';
import '../styles/pages/gallery.css';

export const Categories = () => {
  const { setSelectedCategory, navigateTo } = useContext(AppContext);

  const categories = [
    { name: 'Birthday Cakes', icon: 'layered-cake', color: '#3d251e', desc: 'Decorated celebration sponge cakes for your milestones.' },
    { name: 'Wedding Cakes', icon: 'wedding-cake', color: '#faf0eb', desc: 'Bespoke multi-tiered masterpieces sculpted in sugar lace.' },
    { name: 'Cupcakes', icon: 'cupcake', color: '#ffcdd2', desc: 'Pink velvet and whipped buttercream treats.' },
    { name: 'Donuts', icon: 'donut', color: '#aed581', desc: 'Glazed brioche rings decorated in Sicilian pistachio glaze.' },
    { name: 'Cookies', icon: 'cookie', color: '#5d4037', desc: 'Chewy cookies stuffed with molten dark chocolate fudge.' },
    { name: 'Croissants', icon: 'croissant', color: '#e0a96d', desc: 'Classic French pastries laminated with 81 layers of AOP butter.' },
    { name: 'Bread', icon: 'bread', color: '#8d6e63', desc: 'Stone-deck hearth boules baked with wild starters.' },
    { name: 'Pastries', icon: 'pastry', color: '#bcaaa4', desc: 'Swedish twisted cardamom knots and maple buns.' },
    { name: 'Pies', icon: 'pie', color: '#d7ccc8', desc: 'Deep-dish seasonal apple pies under lattice pastry crusts.' },
    { name: 'Tarts', icon: 'tart', color: '#ffe082', desc: 'Meyer lemon shortcrust shells with torched meringue peaks.' },
    { name: 'Macarons', icon: 'macarons', color: '#e1bee7', desc: 'Box sets of hand-painted almond ganache shells.' },
    { name: 'Cheesecakes', icon: 'cheesecake', color: '#8d6e63', desc: 'Basque burnt amber cheesecakes with wobbly custard cores.' }
  ];

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    navigateTo('shop');
  };

  const getProductCount = (categoryName) => {
    return products.filter(p => p.category === categoryName).length;
  };

  return (
    <div className="gallery-page container page-transition-wrapper">
      <Breadcrumb paths={[{ name: 'Categories', page: 'categories' }]} />
      
      <div className="gallery-title-wrap">
        <h1 style={{ fontSize: 'var(--fs-5xl)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>The Baking Rooms</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Step into each room of our bakery, from signature wedding cakes to ancestral wild loaves.</p>
      </div>

      <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {categories.map((cat, index) => (
          <div 
            key={index} 
            className="gallery-card" 
            onClick={() => handleCategorySelect(cat.name)}
            style={{ height: '360px', flexDirection: 'column', padding: 0, justifyContent: 'flex-start' }}
          >
            <div style={{ width: '100%', height: '160px', overflow: 'hidden', position: 'relative', borderBottom: '1px solid var(--border-color)' }}>
              <ProductVisualizer type={cat.icon} size="100%" />
            </div>
            
            <div style={{ textAlign: 'center', padding: 'var(--space-md)', zIndex: 10 }} className="gallery-card-content-static">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-2xl)', marginBottom: 2 }}>
                {cat.name}
              </h3>
              <p style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-terracotta)', fontWeight: 'bold' }}>
                {getProductCount(cat.name)} pastries
              </p>
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.5, padding: '0 8px' }}>
                {cat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
