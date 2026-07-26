import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ProductVisualizer } from '../components/ProductVisualizer';
import { Breadcrumb } from '../components/Breadcrumb';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import '../styles/pages/cart.css';

export const Cart = () => {
  const { 
    cart, 
    updateCartQty, 
    removeFromCart, 
    navigateTo, 
    discountPercent, 
    couponCode, 
    applyCoupon 
  } = useContext(AppContext);

  const [couponInput, setCouponInput] = useState('');

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  // Subtotal calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountVal = (subtotal * discountPercent) / 100;
  const shippingThreshold = 75;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 8.50;
  const grandTotal = subtotal - discountVal + shippingCost;

  // Free shipping percentage
  const shippingProgress = Math.min((subtotal / shippingThreshold) * 100, 100);

  return (
    <div className="cart-page container page-transition-wrapper">
      <Breadcrumb paths={[{ name: 'Shopping Cart', page: 'cart' }]} />

      <div className="shop-title-wrap">
        <h1 style={{ fontSize: 'var(--fs-5xl)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Your Whisking Basket</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Review your selected pastries and desserts before placing your order.</p>
      </div>

      {cart.length > 0 ? (
        <div className="cart-layout">
          {/* Cart Items Column */}
          <div className="cart-items-container">
            {cart.map((item, idx) => {
              const itemTotal = item.product.price * item.quantity;
              return (
                <div key={idx} className="cart-item-card">
                  <div className="cart-item-visual">
                    <ProductVisualizer type={item.product.visualType} color={item.product.color} size={60} />
                  </div>
                  
                  <div className="cart-item-details">
                    <span className="cart-item-category">{item.product.category}</span>
                    <h3 className="cart-item-name">{item.product.name}</h3>
                    <span className="cart-item-price">${item.product.price.toFixed(2)}</span>
                  </div>

                  <div className="details-qty-selector" style={{ margin: 0 }}>
                    <button className="details-qty-btn" onClick={() => updateCartQty(item.product.id, item.quantity - 1)}>-</button>
                    <span className="details-qty-value">{item.quantity}</span>
                    <button className="details-qty-btn" onClick={() => updateCartQty(item.product.id, item.quantity + 1)}>+</button>
                  </div>

                  <div style={{ fontWeight: '700', fontSize: 'var(--fs-md)', textAlign: 'right' }}>
                    ${itemTotal.toFixed(2)}
                  </div>

                  <button className="cart-item-remove" onClick={() => removeFromCart(item.product.id)} aria-label="Remove item">
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Checkout Summary Column */}
          <div className="cart-summary-box">
            <h3 className="cart-summary-title">Summary</h3>

            {/* Free Shipping Meter */}
            <div className="shipping-meter-wrap">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{subtotal >= shippingThreshold ? 'Free delivery unlocked!' : `Spend $${(shippingThreshold - subtotal).toFixed(2)} more for free delivery`}</span>
                <span>{Math.round(shippingProgress)}%</span>
              </div>
              <div className="shipping-meter-bar-bg">
                <div className="shipping-meter-bar-fill" style={{ width: `${shippingProgress}%` }} />
              </div>
            </div>

            <div className="cart-summary-row" style={{ marginTop: 12 }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {discountPercent > 0 && (
              <div className="cart-summary-row" style={{ color: 'var(--color-olive)', fontWeight: 600 }}>
                <span>Discount ({couponCode})</span>
                <span>-${discountVal.toFixed(2)}</span>
              </div>
            )}

            <div className="cart-summary-row">
              <span>Estimated Delivery</span>
              <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
            </div>

            <div className="cart-summary-row total">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            {/* Coupon Form */}
            <form className="coupon-form" onSubmit={handleCouponSubmit}>
              <input 
                type="text" 
                placeholder="Enter coupon (SWEET10)" 
                className="coupon-input"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button type="submit" className="coupon-btn">Apply</button>
            </form>

            <button className="btn btn-primary" onClick={() => navigateTo('checkout')} style={{ width: '100%', marginTop: 12 }}>
              Proceed to checkout <ArrowRight size={14} style={{ marginLeft: 6 }} />
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-empty-box">
          <div className="success-icon-wrap" style={{ backgroundColor: 'rgba(78, 52, 46, 0.08)', color: 'var(--color-cocoa)' }}>
            <ShoppingBag size={36} />
          </div>
          <h3>Your basket is empty</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)', maxWidth: '350px' }}>
            It looks like you haven’t added any baking sheets or cakes to your cart yet.
          </p>
          <button className="btn btn-primary" onClick={() => navigateTo('shop')} style={{ marginTop: 8 }}>
            Explore Menu
          </button>
        </div>
      )}
    </div>
  );
};
