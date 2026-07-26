import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ProductVisualizer } from './ProductVisualizer';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import '../styles/components/productcard.css';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist, setQuickViewProduct, navigateTo } = useContext(AppContext);
  const isWishlisted = wishlist.includes(product.id);
  const isOutOfStock = product.availability === 'Out of Stock';

  const getBadgeClass = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'new':
        return 'badge-new';
      case 'best seller':
        return 'badge-seller';
      case 'seasonal':
      case 'luxury':
      case 'signature':
      default:
        return 'badge-seasonal';
    }
  };

  const handleCardClick = () => {
    navigateTo('product-details', { productId: product.id });
  };

  return (
    <div className="product-card">
      {product.badge && (
        <span className={`product-card-badge badge ${getBadgeClass(product.badge)}`}>
          {product.badge}
        </span>
      )}
      
      <button 
        className={`product-card-wishlist ${isWishlisted ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        aria-label="Add to wishlist"
      >
        <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
      </button>

      <div className="product-card-image-wrap" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <ProductVisualizer type={product.visualType} size="100%" />
        
        <div className="product-card-actions-overlay">
          <button 
            className="product-card-btn-quickview"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={14} /> Quick View
            </span>
          </button>
        </div>
      </div>

      <div className="product-card-info">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-title" onClick={handleCardClick}>
          {product.name}
        </h3>
        
        <div className="product-card-rating">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Star size={14} fill="currentColor" />
            <span style={{ marginLeft: '4px', fontWeight: '600' }}>{product.rating.toFixed(1)}</span>
          </div>
          <span>({product.reviews?.length || 0} reviews)</span>
        </div>

        <div className="product-card-footer">
          <span className="product-card-price">${product.price.toFixed(2)}</span>
          <button 
            className={`product-card-btn-cart ${isOutOfStock ? 'out-of-stock' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (!isOutOfStock) addToCart(product, 1);
            }}
            disabled={isOutOfStock}
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
