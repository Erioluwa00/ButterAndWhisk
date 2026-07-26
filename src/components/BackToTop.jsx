import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const style = {
    position: 'fixed',
    bottom: '24px',
    left: '24px', // Standard design uses bottom right, but since toast notifications are top-right / bottom-right can be used. Let's use bottom right. Wait! Let's put it on the right side if there's no conflict. Let's put it on the bottom right: right: 24px.
    right: '24px',
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-cocoa)',
    color: 'var(--color-ivory)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-md)',
    cursor: 'pointer',
    border: '1px solid var(--color-cocoa)',
    zIndex: 999,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    pointerEvents: visible ? 'auto' : 'none',
    transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s, color 0.2s',
  };

  return (
    <button
      onClick={scrollToTop}
      style={style}
      aria-label="Back to top"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'var(--color-cocoa)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-cocoa)';
        e.currentTarget.style.color = 'var(--color-ivory)';
      }}
    >
      <ChevronUp size={20} />
    </button>
  );
};
