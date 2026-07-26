import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { ProductVisualizer } from './ProductVisualizer';
import { X, Heart, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import '../styles/components/quickview.css';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, wishlist, navigateTo } = useContext(AppContext);
  const [qty, setQty] = useState(1);

  // Reset quantity when active product changes
  useEffect(() => {
    setQty(1);
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isWishlisted = wishlist.includes(quickViewProduct.id);
  const isOutOfStock = quickViewProduct.availability === 'Out of Stock';

  const handleAddToCart = () => {
    addToCart(quickViewProduct, qty);
    setQuickViewProduct(null);
  };

  const handleViewDetails = () => {
    navigateTo('product-details', { productId: quickViewProduct.id });
    setQuickViewProduct(null);
  };

  return (
    <div className={`quickview-overlay open`} onClick={() => setQuickViewProduct(null)}>
      <div className="quickview-container" onClick={(e) => e.stopPropagation()}>
        <button 
          className="quickview-close" 
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="quickview-left">
          <span 
            className="badge badge-seasonal" 
            style={{ position: 'absolute', top: '16px', left: '16px' }}
          >
            {quickViewProduct.badge || quickViewProduct.category}
          </span>
          <ProductVisualizer 
            type={quickViewProduct.visualType} 
            size="100%" 
          />
        </div>

        <div className="quickview-right">
          <span 
            style={{ 
              fontSize: 'var(--fs-xs)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em', 
              color: 'var(--text-secondary)' 
            }}
          >
            {quickViewProduct.category}
          </span>
          <h2 className="quickview-title">{quickViewProduct.name}</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-terracotta)' }}>
              <Star size={16} fill="currentColor" />
              <span style={{ marginLeft: '4px', fontWeight: '700' }}>{quickViewProduct.rating.toFixed(1)}</span>
            </div>
            <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
              ({quickViewProduct.reviews?.length || 0} customer reviews)
            </span>
          </div>

          <div className="quickview-price">${quickViewProduct.price.toFixed(2)}</div>
          
          <p className="quickview-description">{quickViewProduct.description}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <span style={{ fontSize: 'var(--fs-sm)' }}>
              Status: <strong style={{ color: isOutOfStock ? 'var(--color-terracotta)' : 'var(--color-olive)' }}>
                {quickViewProduct.availability}
              </strong>
            </span>
            
            {!isOutOfStock && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                <div className="quickview-qty-selector">
                  <button 
                    className="quickview-qty-btn" 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >-</button>
                  <span className="quickview-qty-value">{qty}</span>
                  <button 
                    className="quickview-qty-btn" 
                    onClick={() => setQty(qty + 1)}
                  >+</button>
                </div>

                <button className="btn btn-primary" onClick={handleAddToCart}>
                  <ShoppingBag size={16} /> Add to Cart
                </button>
              </div>
            )}

            <div className="quickview-actions" style={{ marginTop: '16px' }}>
              <button 
                className="btn btn-secondary"
                onClick={() => toggleWishlist(quickViewProduct.id)}
                style={{ borderRadius: 'var(--radius-pill)', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Heart size={16} fill={isWishlisted ? 'var(--color-terracotta)' : 'none'} color={isWishlisted ? 'var(--color-terracotta)' : 'currentColor'} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={handleViewDetails}
                style={{ border: 'none', textDecoration: 'underline' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Full details <ArrowRight size={14} />
                </span>
              </button>
            </div>
          </div>

          <div className="quickview-meta" style={{ marginTop: '12px' }}>
            <div className="quickview-meta-item">
              Ingredients: <span style={{ fontWeight: '400', color: 'var(--text-secondary)', fontSize: 'var(--fs-xs)' }}>{quickViewProduct.ingredients}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
