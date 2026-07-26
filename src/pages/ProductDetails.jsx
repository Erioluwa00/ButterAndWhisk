import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { products } from '../data/products';
import { ProductVisualizer } from '../components/ProductVisualizer';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { Skeleton } from '../components/Skeleton';
import { Star, ShoppingBag, Heart, Check, Clock } from 'lucide-react';
import '../styles/pages/product-details.css';

export const ProductDetails = () => {
  const { 
    activeProductId, 
    addToCart, 
    toggleWishlist, 
    wishlist, 
    recentlyViewed, 
    navigateTo, 
    showToast 
  } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');
  const [loading, setLoading] = useState(true);

  // Form states for reviews
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [localReviews, setLocalReviews] = useState([]);

  useEffect(() => {
    if (!activeProductId) return;
    setLoading(true);
    const p = products.find(prod => prod.id === activeProductId);
    setProduct(p);
    setLocalReviews(p?.reviews || []);
    setQty(1);
    
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeProductId]);

  if (loading || !product) {
    return (
      <div className="container" style={{ padding: 'var(--space-3xl) var(--space-md)' }}>
        <Skeleton type="details" />
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const isOutOfStock = product.availability === 'Out of Stock';

  // Submitting review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    
    const newRev = {
      author: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      date: 'Just now'
    };

    setLocalReviews(prev => [newRev, ...prev]);
    showToast('Review submitted for approval!', 'success');
    setReviewName('');
    setReviewComment('');
  };

  // Recommendations: Related (Same category, excluding current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Recommendations: Recently viewed
  const recentlyViewedProducts = products
    .filter(p => recentlyViewed.includes(p.id) && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="details-page container page-transition-wrapper">
      <Breadcrumb 
        paths={[
          { name: 'Shop', page: 'shop' },
          { name: product.category, page: 'shop', params: { category: product.category } },
          { name: product.name, page: 'product-details', params: { productId: product.id } }
        ]} 
      />

      <div className="details-layout">
        {/* Visualizer Frame */}
        <div className="details-image-container">
          <ProductVisualizer type={product.visualType} size="100%" />
        </div>

        {/* Purchase Info */}
        <div className="details-info">
          <span className="details-category">{product.category}</span>
          <h1 className="details-title">{product.name}</h1>

          <div className="details-meta-row">
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-terracotta)' }}>
              <Star size={16} fill="currentColor" />
              <span style={{ marginLeft: '4px', fontWeight: '700', fontSize: 'var(--fs-md)' }}>
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span style={{ color: 'var(--text-secondary)' }}>
              ({localReviews.length} customer reviews)
            </span>
            <span className={`badge ${product.availability === 'In Stock' ? 'badge-seasonal' : 'badge-seller'}`}>
              {product.availability}
            </span>
          </div>

          <div className="details-price">${product.price.toFixed(2)}</div>
          
          <p className="details-description">{product.details}</p>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-md)' }}>
            <div className="details-purchase-box">
              {!isOutOfStock && (
                <>
                  <div className="details-qty-selector">
                    <button className="details-qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                    <span className="details-qty-value">{qty}</span>
                    <button className="details-qty-btn" onClick={() => setQty(qty + 1)}>+</button>
                  </div>

                  <button className="btn btn-primary" onClick={() => addToCart(product, qty)}>
                    <ShoppingBag size={16} style={{ marginRight: 6 }} /> Add to Cart
                  </button>
                </>
              )}

              <button 
                className="btn btn-secondary" 
                onClick={() => toggleWishlist(product.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Heart size={16} fill={isWishlisted ? 'var(--color-terracotta)' : 'none'} color={isWishlisted ? 'var(--color-terracotta)' : 'currentColor'} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
            </div>
          </div>

          {/* Cooking Standards Info */}
          <div style={{ display: 'flex', gap: '16px', fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Check size={14} color="var(--color-olive)" /> Stone deck stone-deck oven baked
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} color="var(--color-olive)" /> Freshly packaged immediately
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ margin: 'var(--space-2xl) 0' }}>
        <div className="details-tabs-nav">
          <button className={`details-tab-btn ${activeTab === 'desc' ? 'active' : ''}`} onClick={() => setActiveTab('desc')}>Ingredients</button>
          <button className={`details-tab-btn ${activeTab === 'standards' ? 'active' : ''}`} onClick={() => setActiveTab('standards')}>Baking standards</button>
          <button className={`details-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews ({localReviews.length})</button>
        </div>

        <div className="details-tab-content">
          {activeTab === 'desc' && (
            <div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Baking Ingredients</h4>
              <p style={{ marginTop: 8 }}>{product.ingredients}</p>
            </div>
          )}

          {activeTab === 'standards' && (
            <div>
              <p>We source only unbleached, high-extraction organic grains milled locally. Our cakes are decorated with fresh dairy buttercreams and contain no chemical stabilizing agents, hydrogenated fats, or artificial preservatives.</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-2xl)' }}>
              <div>
                <div className="details-reviews-list">
                  {localReviews.length > 0 ? (
                    localReviews.map((rev, index) => (
                      <div key={index} className="details-review-card">
                        <div className="details-review-header">
                          <span className="details-review-author">{rev.author}</span>
                          <span className="details-review-date">{rev.date}</span>
                        </div>
                        <div style={{ display: 'flex', color: 'var(--color-terracotta)', gap: 2, marginBottom: 6 }}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < rev.rating ? 'currentColor' : 'none'} />
                          ))}
                        </div>
                        <p className="details-review-comment">"{rev.comment}"</p>
                      </div>
                    ))
                  ) : (
                    <p style={{ fontStyle: 'italic' }}>No reviews have been written for this pastry yet.</p>
                  )}
                </div>
              </div>

              {/* Form */}
              <form className="details-review-form" onSubmit={handleReviewSubmit}>
                <h4>Add Your Review</h4>
                <div className="contact-form-group">
                  <label>Your Name</label>
                  <input 
                    type="text" 
                    className="details-review-form-input" 
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    required
                  />
                </div>
                <div className="contact-form-group">
                  <label>Rating</label>
                  <select 
                    className="details-review-form-input"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                  >
                    <option value="5">5 Stars - Perfection</option>
                    <option value="4">4 Stars - Excellent</option>
                    <option value="3">3 Stars - Average</option>
                    <option value="2">2 Stars - Disappointed</option>
                    <option value="1">1 Star - Poor</option>
                  </select>
                </div>
                <div className="contact-form-group">
                  <label>Your Thoughts</label>
                  <textarea 
                    className="details-review-form-input details-review-form-textarea"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Submit Review</button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      {relatedProducts.length > 0 && (
        <div className="details-extra-section">
          <h2 className="details-extra-title">Related Pastries</h2>
          <div className="shop-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {recentlyViewedProducts.length > 0 && (
        <div className="details-extra-section" style={{ borderTop: 'none', paddingTop: 0 }}>
          <h2 className="details-extra-title">Recently Viewed</h2>
          <div className="shop-grid">
            {recentlyViewedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
