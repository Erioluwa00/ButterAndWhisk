import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import '../styles/pages/misc.css';

export const NotFound = () => {
  const { navigateTo } = useContext(AppContext);
  const [score, setScore] = useState(0);
  const [crumbs, setCrumbs] = useState([]);

  // Spawn crumbs periodically for the catcher game
  useEffect(() => {
    const interval = setInterval(() => {
      const newCrumb = {
        id: Math.random(),
        left: Math.random() * 85 + 5, // percentage
        size: Math.random() * 8 + 6, // pixels
        speed: Math.random() * 1.5 + 1.5 // seconds
      };
      setCrumbs(prev => [...prev, newCrumb]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const catchCrumb = (id) => {
    setScore(prev => prev + 1);
    setCrumbs(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="notfound-page container page-transition-wrapper">
      <div className="notfound-code">404</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-3xl)' }}>
        Spilled flour & broken crumbs
      </h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 450, margin: '0 auto' }}>
        The pastry page you are looking for has either been eaten or moved to another vault.
      </p>

      {/* Crumb Catcher Game */}
      <div className="notfound-game-area">
        <div className="notfound-game-score">
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Sparkles size={14} color="var(--color-terracotta)" /> Crumb Catcher Score: {score}
          </span>
        </div>
        
        <div className="notfound-game-board">
          {crumbs.map(crumb => (
            <div 
              key={crumb.id}
              className="notfound-crumb"
              style={{
                left: `${crumb.left}%`,
                width: crumb.size,
                height: crumb.size,
                animationDuration: `${crumb.speed}s`
              }}
              onClick={() => catchCrumb(crumb.id)}
            />
          ))}
          {crumbs.length === 0 && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', opacity: 0.6 }}>
              Waiting for falling crumbs...
            </div>
          )}
        </div>
        <p style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: 8, opacity: 0.8 }}>
          Micro-game: Tap the falling bread crumbs before they hit the deck floor to earn points!
        </p>
      </div>

      <button className="btn btn-primary" onClick={() => navigateTo('home')} style={{ marginTop: 'var(--space-md)' }}>
        Return to Vault <ArrowRight size={14} style={{ marginLeft: 6 }} />
      </button>
    </div>
  );
};
