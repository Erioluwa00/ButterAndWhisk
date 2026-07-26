import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { ArrowLeft, Check, CreditCard, Sparkles } from 'lucide-react';
import '../styles/pages/checkout.css';

export const Checkout = () => {
  const { cart, discountPercent, couponCode, navigateTo, clearCart } = useContext(AppContext);

  // Form States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState('standard');

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountVal = (subtotal * discountPercent) / 100;
  
  // Calculate delivery cost based on standard or premium choice
  const standardShippingThreshold = 75;
  const standardShippingCost = subtotal >= standardShippingThreshold ? 0 : 8.50;
  const shippingCost = shippingMethod === 'premium' ? 15.00 : standardShippingCost;

  const grandTotal = subtotal - discountVal + shippingCost;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !address || !city || !zip || !cardNum) return;

    // Success order flow
    clearCart();
    navigateTo('order-success');
  };

  return (
    <div className="checkout-page container page-transition-wrapper">
      <Breadcrumb paths={[{ name: 'Cart', page: 'cart' }, { name: 'Checkout', page: 'checkout' }]} />

      <div className="shop-title-wrap">
        <h1 style={{ fontSize: 'var(--fs-5xl)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Bespoke Checkout</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Provide your shipping and payment details below to finalize your booking.</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="checkout-grid">
        {/* Left Form Box */}
        <div className="checkout-form-box">
          <div>
            <h3 className="checkout-section-title">1. Shipping Details</h3>
            <div className="checkout-form-row">
              <div className="checkout-form-group">
                <label>First Name</label>
                <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} className="checkout-input" />
              </div>
              <div className="checkout-form-group">
                <label>Last Name</label>
                <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} className="checkout-input" />
              </div>
            </div>
            
            <div className="checkout-form-group" style={{ marginTop: 12 }}>
              <label>Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="checkout-input" />
            </div>

            <div className="checkout-form-group" style={{ marginTop: 12 }}>
              <label>Delivery Address</label>
              <input type="text" required value={address} onChange={e => setAddress(e.target.value)} className="checkout-input" />
            </div>

            <div className="checkout-form-row" style={{ marginTop: 12 }}>
              <div className="checkout-form-group">
                <label>City</label>
                <input type="text" required value={city} onChange={e => setCity(e.target.value)} className="checkout-input" />
              </div>
              <div className="checkout-form-group">
                <label>ZIP / Postal Code</label>
                <input type="text" required value={zip} onChange={e => setZip(e.target.value)} className="checkout-input" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="checkout-section-title" style={{ marginTop: 24 }}>2. Delivery Standards</h3>
            <div className="checkout-shipping-options">
              <div 
                className={`checkout-shipping-card ${shippingMethod === 'standard' ? 'active' : ''}`}
                onClick={() => setShippingMethod('standard')}
              >
                <div className="checkout-shipping-card-left">
                  <input 
                    type="radio" 
                    name="shipping" 
                    checked={shippingMethod === 'standard'} 
                    onChange={() => setShippingMethod('standard')}
                    aria-label="Standard Delivery"
                  />
                  <div>
                    <div className="checkout-shipping-card-title">Handmade Delivery</div>
                    <div className="checkout-shipping-card-desc">Delivered via local insulated courier. 1-2 days.</div>
                  </div>
                </div>
                <div className="checkout-shipping-card-price">
                  {standardShippingCost === 0 ? 'Free' : `$${standardShippingCost.toFixed(2)}`}
                </div>
              </div>

              <div 
                className={`checkout-shipping-card ${shippingMethod === 'premium' ? 'active' : ''}`}
                onClick={() => setShippingMethod('premium')}
              >
                <div className="checkout-shipping-card-left">
                  <input 
                    type="radio" 
                    name="shipping" 
                    checked={shippingMethod === 'premium'} 
                    onChange={() => setShippingMethod('premium')}
                    aria-label="Premium Delivery"
                  />
                  <div>
                    <div className="checkout-shipping-card-title">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Premium Gift Wrap + White Glove Courier <Sparkles size={12} color="var(--color-terracotta)" />
                      </span>
                    </div>
                    <div className="checkout-shipping-card-desc">Assembled inside our signature luxury box, handled with absolute care.</div>
                  </div>
                </div>
                <div className="checkout-shipping-card-price">$15.00</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="checkout-section-title" style={{ marginTop: 24 }}>3. Premium Payment</h3>
            <div className="checkout-form-group">
              <label>Credit Card Number</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  required 
                  placeholder="xxxx xxxx xxxx xxxx" 
                  value={cardNum} 
                  onChange={e => setCardNum(e.target.value)} 
                  className="checkout-input" 
                  style={{ width: '100%', paddingLeft: 40 }}
                />
                <CreditCard size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }} />
              </div>
            </div>

            <div className="checkout-form-row" style={{ marginTop: 12 }}>
              <div className="checkout-form-group">
                <label>Expiration Date</label>
                <input type="text" placeholder="MM/YY" required value={cardExp} onChange={e => setCardExp(e.target.value)} className="checkout-input" />
              </div>
              <div className="checkout-form-group">
                <label>CVV</label>
                <input type="text" placeholder="xxx" required value={cardCvv} onChange={e => setCardCvv(e.target.value)} className="checkout-input" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary Box */}
        <div className="cart-summary-box">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigateTo('cart')}
            style={{ alignSelf: 'flex-start', border: 'none', padding: 0 }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-xs)' }}>
              <ArrowLeft size={14} /> Back to basket
            </span>
          </button>

          <h3 className="cart-summary-title">Your Order</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 200, overflowY: 'auto' }}>
            {cart.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-sm)' }}>
                <span>{item.product.name} (x{item.quantity})</span>
                <span style={{ fontWeight: 600 }}>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }} />

          <div className="cart-summary-row">
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
            <span>Delivery</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>

          <div className="cart-summary-row total">
            <span>Grand Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 12 }}>
            Place Reservation
          </button>
        </div>
      </form>
    </div>
  );
};
