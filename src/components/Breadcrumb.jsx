import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ChevronRight } from 'lucide-react';

export const Breadcrumb = ({ paths }) => {
  const { navigateTo } = useContext(AppContext);

  const style = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-xs)',
    fontSize: 'var(--fs-xs)',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--text-secondary)',
    marginBottom: 'var(--space-lg)',
  };

  const linkStyle = {
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  };

  return (
    <nav aria-label="breadcrumb" style={style}>
      <span 
        style={linkStyle} 
        onClick={() => navigateTo('home')}
        onMouseEnter={(e) => e.target.style.color = 'var(--accent-color)'}
        onMouseLeave={(e) => e.target.style.color = 'inherit'}
      >
        Home
      </span>
      {paths.map((p, idx) => {
        const isLast = idx === paths.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight size={12} style={{ opacity: 0.6 }} />
            {isLast ? (
              <span style={{ color: 'var(--accent-color)', fontWeight: '600' }}>{p.name}</span>
            ) : (
              <span
                style={linkStyle}
                onClick={() => navigateTo(p.page, p.params || {})}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-color)'}
                onMouseLeave={(e) => e.target.style.color = 'inherit'}
              >
                {p.name}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
