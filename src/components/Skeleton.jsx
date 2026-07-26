import React from 'react';

export const Skeleton = ({ type = 'product', count = 1 }) => {
  const containerStyle = {
    display: 'grid',
    gap: 'var(--space-md)',
    width: '100%'
  };

  const itemStyle = {
    backgroundColor: 'var(--color-beige)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    position: 'relative',
    opacity: 0.6
  };

  const shimmerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)',
    animation: 'shimmer 1.5s infinite',
    transform: 'translateX(-100%)'
  };

  // Add the keyframe to document head if not present
  if (typeof document !== 'undefined' && !document.getElementById('skeleton-keyframes')) {
    const style = document.createElement('style');
    style.id = 'skeleton-keyframes';
    style.innerHTML = `
      @keyframes shimmer {
        100% { transform: translateX(100%); }
      }
    `;
    document.head.appendChild(style);
  }

  const renderProductSkeleton = (key) => (
    <div key={key} style={{ ...itemStyle, padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
      <div style={{ ...itemStyle, height: '220px', width: '100%' }}>
        <div style={shimmerStyle} />
      </div>
      <div style={{ ...itemStyle, height: '18px', width: '60%' }}>
        <div style={shimmerStyle} />
      </div>
      <div style={{ ...itemStyle, height: '14px', width: '40%' }}>
        <div style={shimmerStyle} />
      </div>
      <div style={{ ...itemStyle, height: '36px', width: '100%', marginTop: 'auto', borderRadius: 'var(--radius-pill)' }}>
        <div style={shimmerStyle} />
      </div>
    </div>
  );

  const renderBlogSkeleton = (key) => (
    <div key={key} style={{ ...itemStyle, padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
      <div style={{ ...itemStyle, height: '180px', width: '100%' }}>
        <div style={shimmerStyle} />
      </div>
      <div style={{ ...itemStyle, height: '12px', width: '30%' }}>
        <div style={shimmerStyle} />
      </div>
      <div style={{ ...itemStyle, height: '22px', width: '85%' }}>
        <div style={shimmerStyle} />
      </div>
      <div style={{ ...itemStyle, height: '14px', width: '95%' }}>
        <div style={shimmerStyle} />
      </div>
      <div style={{ ...itemStyle, height: '14px', width: '50%' }}>
        <div style={shimmerStyle} />
      </div>
    </div>
  );

  const renderDetailsSkeleton = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)', width: '100%' }}>
      <div style={{ ...itemStyle, height: '400px', width: '100%' }}>
        <div style={shimmerStyle} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        <div style={{ ...itemStyle, height: '14px', width: '20%' }}><div style={shimmerStyle} /></div>
        <div style={{ ...itemStyle, height: '36px', width: '70%' }}><div style={shimmerStyle} /></div>
        <div style={{ ...itemStyle, height: '18px', width: '40%' }}><div style={shimmerStyle} /></div>
        <div style={{ ...itemStyle, height: '80px', width: '100%' }}><div style={shimmerStyle} /></div>
        <div style={{ ...itemStyle, height: '44px', width: '50%', borderRadius: 'var(--radius-pill)' }}><div style={shimmerStyle} /></div>
      </div>
    </div>
  );

  const skeletons = [];
  for (let i = 0; i < count; i++) {
    if (type === 'product') {
      skeletons.push(renderProductSkeleton(i));
    } else if (type === 'blog') {
      skeletons.push(renderBlogSkeleton(i));
    }
  }

  if (type === 'details') {
    return renderDetailsSkeleton();
  }

  const gridTemplate = type === 'product' 
    ? 'repeat(auto-fill, minmax(260px, 1fr))' 
    : 'repeat(auto-fill, minmax(320px, 1fr))';

  return (
    <div style={{ ...containerStyle, gridTemplateColumns: gridTemplate }}>
      {skeletons}
    </div>
  );
};
