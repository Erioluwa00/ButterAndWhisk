import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { Heart } from 'lucide-react';
import '../styles/pages/misc.css';

export const Wishlist = () => {
  const { wishlist, navigateTo } = useContext(AppContext);

  const favoritedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="wishlist-page container page-transition-wrapper">
      <Breadcrumb paths={[{ name: 'Wishlist', page: 'wishlist' }]} />

      <div className="wishlist-title-wrap">
        <h1 style={{ fontSize: 'var(--fs-5xl)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Your Saved Pastries</h1>
        <p style={{ color: 'var(--text-secondary)' }}>A collection of your favorite bakes and custom desserts.</p>
      </div>

      {favoritedProducts.length > 0 ? (
        <div className="shop-grid">
          {favoritedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="cart-empty-box">
          <div className="success-icon-wrap" style={{ backgroundColor: 'rgba(201, 107, 74, 0.1)', color: 'var(--color-terracotta)' }}>
            <Heart size={36} fill="currentColor" />
          </div>
          <h3>Your wishlist is empty</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)', maxWidth: '350px' }}>
            Tap the heart icon on any pastry in our collection to save it here.
          </p>
          <button className="btn btn-primary" onClick={() => navigateTo('shop')} style={{ marginTop: 8 }}>
            Browse Pastries
          </button>
        </div>
      )}
    </div>
  );
};
