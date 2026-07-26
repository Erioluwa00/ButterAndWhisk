import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductVisualizer } from '../components/ProductVisualizer';
import { X, Search } from 'lucide-react';
import '../styles/pages/gallery.css';

export const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);

  const galleryItems = [
    { name: 'Le Grand Chocolat', category: 'Cakes', type: 'layered-cake', color: '#3d251e', desc: 'Decorated with blackberries and 24k gold flakes.' },
    { name: 'La Rose Royale', category: 'Cakes', type: 'wedding-cake', color: '#faf0eb', desc: 'Hand-sculpted white chocolate roses and raspberry layers.' },
    { name: 'Blush Velvet Rose', category: 'Sweets', type: 'cupcake', color: '#ffcdd2', desc: 'Rosewater buttercream cupcake with a molten core.' },
    { name: 'Gilded Pistachio Ring', category: 'Sweets', type: 'donut', color: '#aed581', desc: 'SICILIAN pistachio glaze dusted in real gold dust.' },
    { name: 'Smoked Sea Salt Lava', category: 'Sweets', type: 'cookie', color: '#5d4037', desc: 'Chewy brown-butter cookie oozing fudge fillings.' },
    { name: 'The Golden Lamination', category: 'Pastries', type: 'croissant', color: '#e0a96d', desc: 'Honeycomb flaky layers made with AOP butter.' },
    { name: 'Sourdough Ancestral', category: 'Breads', type: 'bread', color: '#8d6e63', desc: 'Wild fermentation deck loaf, heavily blistered.' },
    { name: 'Cardamom Knot Royale', category: 'Pastries', type: 'pastry', color: '#bcaaa4', desc: 'Swedish twisted bun coated in maple sugar wash.' },
    { name: 'Lemon Meringue Sun', category: 'Pastries', type: 'tart', color: '#ffe082', desc: 'Meyer lemon citrus curd topped with meringue peaks.' }
  ];

  const filteredItems = filter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="gallery-page container page-transition-wrapper">
      <Breadcrumb paths={[{ name: 'Gallery', page: 'gallery' }]} />

      <div className="gallery-title-wrap">
        <h1 style={{ fontSize: 'var(--fs-5xl)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Artisan Archives</h1>
        <p style={{ color: 'var(--text-secondary)' }}>A visual exhibition of our handcrafted pastry sculptures and stone-deck loaves.</p>
      </div>

      {/* Filter Tabs */}
      <div className="gallery-filters">
        {['All', 'Cakes', 'Pastries', 'Breads', 'Sweets'].map(tag => (
          <button
            key={tag}
            className={`gallery-filter-btn ${filter === tag ? 'active' : ''}`}
            onClick={() => setFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="gallery-grid">
        {filteredItems.map((item, idx) => (
          <div 
            key={idx} 
            className="gallery-card" 
            onClick={() => setLightboxItem(item)}
          >
            <ProductVisualizer type={item.type} size="100%" />
            <div className="gallery-card-content">
              <h3 className="gallery-card-title">{item.name}</h3>
              <span className="gallery-card-category">{item.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="lightbox-overlay" onClick={() => setLightboxItem(null)}>
          <button 
            className="lightbox-close" 
            onClick={() => setLightboxItem(null)}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <ProductVisualizer type={lightboxItem.type} color={lightboxItem.color} size={280} />
            <div className="lightbox-info">
              <h2 className="lightbox-title">{lightboxItem.name}</h2>
              <span className="lightbox-category">{lightboxItem.category}</span>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '12px', fontSize: 'var(--fs-sm)' }}>
                {lightboxItem.desc} Prepared daily by our bakers under strict artisanal standards.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
