import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Check, Heart, ShieldCheck, Flame, Gift, ArrowRight } from 'lucide-react';
import '../styles/pages/misc.css';

export const OrderSuccess = () => {
  const { navigateTo } = useContext(AppContext);
  const [bakingStep, setBakingStep] = useState(1);
  const [receiptNum] = useState(() => Math.floor(100000 + Math.random() * 900000));

  // Simulate baking steps updates
  useEffect(() => {
    const timer1 = setTimeout(() => setBakingStep(2), 5000);
    const timer2 = setTimeout(() => setBakingStep(3), 11000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="success-page container page-transition-wrapper">
      <div className="success-icon-wrap">
        <Check size={40} />
      </div>

      <h1 className="success-title">Order Confirmed</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 450, margin: '0 auto' }}>
        Thank you for choosing Butter & Whisk. Your reservation is registered under ticket 
        <strong> #{receiptNum}</strong>.
      </p>

      {/* Progress baking tracker */}
      <div className="success-card">
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-terracotta)', fontWeight: 'bold' }}>
          Live Baking Progress
        </h3>
        
        <div className="success-steps">
          <div className={`success-step-item ${bakingStep >= 1 ? 'active' : ''} ${bakingStep > 1 ? 'completed' : ''}`}>
            <div className="success-step-dot">
              {bakingStep > 1 ? <Check size={14} /> : '1'}
            </div>
            <span className="success-step-label">Mixing</span>
          </div>

          <div className={`success-step-item ${bakingStep >= 2 ? 'active' : ''} ${bakingStep > 2 ? 'completed' : ''}`}>
            <div className="success-step-dot">
              {bakingStep > 2 ? <Check size={14} /> : '2'}
            </div>
            <span className="success-step-label">Rising</span>
          </div>

          <div className={`success-step-item ${bakingStep >= 3 ? 'active' : ''}`}>
            <div className="success-step-dot">
              {bakingStep === 3 ? <Flame size={14} className="animate-float" /> : '3'}
            </div>
            <span className="success-step-label">In Oven</span>
          </div>
        </div>

        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-lg)' }}>
          {bakingStep === 1 && 'Our bakers are currently weighing flours and measuring sourdough starters.'}
          {bakingStep === 2 && 'The dough has entered its secondary fermentation stage for a perfect crumb.'}
          {bakingStep === 3 && 'Loaves are blistered on stone decks inside our volcanic ovens! Almost ready.'}
        </p>
      </div>

      {/* Standards details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
          <ShieldCheck size={18} color="var(--color-olive)" /> Fully contactless preparation and sanitization
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
          <Gift size={18} color="var(--color-olive)" /> Insulated courier packaging to keep pastries hot
        </div>
      </div>

      <button className="btn btn-primary" onClick={() => navigateTo('home')} style={{ marginTop: 'var(--space-md)' }}>
        Return to Home <ArrowRight size={14} style={{ marginLeft: 6 }} />
      </button>
    </div>
  );
};
