import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';
import '../styles/components/footer.css';

export const Footer = () => {
  const { navigateTo, showToast } = useContext(AppContext);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast(`Thank you! Check your inbox for code 'SWEET10'`, 'success');
    setEmail('');
  };

  const marqueeText = "Butter & Whisk • Pure Ingredients • Artisanal Baking • Baked Fresh Every Morning • Gold Medal Flour";

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-container">
          {/* Brand Col */}
          <div className="footer-brand-column">
            <h3>Butter & Whisk</h3>
            <p>
              A storytelling baking experience, crafting luxury wedding cakes, artisanal croissants, 
              and hearth sourdoughs for the modern epicurean.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="footer-column-title">The Bakery</h4>
            <ul className="footer-links-list">
              <li className="footer-link" onClick={() => navigateTo('home')}>Home</li>
              <li className="footer-link" onClick={() => navigateTo('shop')}>Baking Shop</li>
              <li className="footer-link" onClick={() => navigateTo('categories')}>Categories</li>
              <li className="footer-link" onClick={() => navigateTo('gallery')}>Visual Gallery</li>
              <li className="footer-link" onClick={() => navigateTo('our-story')}>Our Full Story</li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="footer-column-title">Customer Care</h4>
            <ul className="footer-links-list">
              <li className="footer-link" onClick={() => navigateTo('about-us')}>About Our Bakers</li>
              <li className="footer-link" onClick={() => navigateTo('contact')}>Write to Us</li>
              <li className="footer-link" onClick={() => navigateTo('404')}>Crumb Game (404)</li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="footer-column-title">Our Journal</h4>
            <p style={{ color: 'rgba(250, 247, 242, 0.6)', fontSize: 'var(--fs-xs)', marginBottom: '12px' }}>
              Subscribe to unlock secret baking notes and a 10% discount on your first order.
            </p>
            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
              <div className="footer-newsletter-input-wrap">
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="footer-newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="footer-newsletter-submit" aria-label="Subscribe">
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>

            <div style={{ marginTop: '24px' }}>
              <div className="footer-contact-item">108 Wheatflour Way, Suite B, London</div>
              <div className="footer-contact-item">bakers@butterandwhisk.com</div>
            </div>
          </div>
        </div>

        {/* Horizontal Marquee */}
        <div className="footer-marquee">
          <div className="footer-marquee-track">
            <span className="footer-marquee-text">{marqueeText} <span className="footer-marquee-dot"></span></span>
            <span className="footer-marquee-text">{marqueeText} <span className="footer-marquee-dot"></span></span>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Butter & Whisk. All rights reserved. Crafted for luxury.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('contact')}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('contact')}>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
