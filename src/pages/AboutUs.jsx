import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductVisualizer } from '../components/ProductVisualizer';
import { Leaf, Droplet, Sun, Eye } from 'lucide-react';
import '../styles/pages/misc.css';

export const AboutUs = () => {
  const { navigateTo } = useContext(AppContext);

  return (
    <div className="about-page container page-transition-wrapper">
      <Breadcrumb paths={[{ name: 'About Us', page: 'about-us' }]} />

      <div className="about-hero">
        <h1 className="about-hero-title">Baking Integrity</h1>
        <p style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-secondary)', marginTop: 'var(--space-sm)' }}>
          At Butter & Whisk, we believe that bread is sacred and pastry is sculpture. 
          We dedicate our efforts to protecting ancestral baking heritage.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-text-column">
          <h3>The wheat and the stone</h3>
          <p>
            We refuse to bake with industrially bleached roller-milled flours. Bleaching strips wheat 
            germ and oils, creating starch profiles that digest poorly. Instead, we work directly 
            with local grain growers growing heritage varieties of wheat (e.g., Red Fife, Spelt, Einkorn).
          </p>
          <p>
            Our grains are stone-ground slowly on massive horizontal granite millstones. This process 
            keeps temperatures cool, preserving essential fatty acids, wild yeasts, and natural mineral 
            complexities that characterize our loaves.
          </p>
        </div>
        <div className="about-visual-column">
          <ProductVisualizer type="bread" color="#8d6e63" size={200} />
        </div>
      </div>

      <div className="about-grid" style={{ direction: 'rtl' }}>
        <div className="about-text-column" style={{ direction: 'ltr' }}>
          <h3>A hydration ritual</h3>
          <p>
            Our sourdough fermentation process takes exactly 36 hours. During this long proofing, 
            wild lactic acid bacteria digest simple sugars and break down gluten proteins, yielding 
            a caramelized blistered shell, a soft custard-like interior crumb, and a light sour note.
          </p>
          <p>
            We use only filtered natural spring water heated to precisely 21°C to hydrate our sourdough 
            cultures, ensuring maximum microbial health and activity.
          </p>
        </div>
        <div className="about-visual-column">
          <ProductVisualizer type="croissant" color="#e0a96d" size={200} />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
        <h3 className="timeline-title">Our Baking Pillars</h3>
        <div className="process-grid" style={{ direction: 'ltr' }}>
          <div className="process-card">
            <Leaf size={32} color="var(--color-olive)" style={{ marginBottom: 12 }} />
            <h3>100% Organic Grains</h3>
            <p style={{ fontSize: 'var(--fs-sm)' }}>Sourced from regenerative heirloom family farms.</p>
          </div>
          <div className="process-card">
            <Droplet size={32} color="var(--color-terracotta)" style={{ marginBottom: 12 }} />
            <h3>Pure Hydration</h3>
            <p style={{ fontSize: 'var(--fs-sm)' }}>Spring water filtered to eliminate chlorine and metals.</p>
          </div>
          <div className="process-card">
            <Sun size={32} color="var(--color-butter)" style={{ marginBottom: 12 }} />
            <h3>Zero Additives</h3>
            <p style={{ fontSize: 'var(--fs-sm)' }}>No chemical baking agents or powder conditioners.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
