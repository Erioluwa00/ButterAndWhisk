import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { Star, MessageSquare } from 'lucide-react';
import '../styles/pages/misc.css';

export const Testimonials = () => {
  const [ratingFilter, setRatingFilter] = useState('All');

  const list = [
    { name: 'Nathalie R.', rating: 5, date: 'July 14, 2026', comment: 'The Basque Burnt Amber is a revelation. I have had burnt cheesecakes in San Sebastian, and Butter & Whisk matches them layer for layer. The wobble is hypnotic.' },
    { name: 'David L.', rating: 5, date: 'July 11, 2026', comment: 'The combination of nutty brown butter, rich chocolate, and smoked salt in their cookies is absolute genius. Always buy a half-dozen.' },
    { name: 'Eleanor & Julian', rating: 5, date: 'May 14, 2026', comment: 'Our guests still talk about our wedding cake. The white chocolate roses were beautiful and the raspberry filling was tangy and light.' },
    { name: 'Clara V.', rating: 4, date: 'July 15, 2026', comment: 'Decadent chocolate cake! Rich Belgian ganache and gold leaf make it feel like absolute royalty. A bit heavy, but delicious.' },
    { name: 'Marcus K.', rating: 5, date: 'June 28, 2026', comment: 'The stone deck sourdough crust is incredibly caramelized and crisp. Arthur culture has a distinct depth you cant find elsewhere.' }
  ];

  const filtered = ratingFilter === 'All' 
    ? list 
    : list.filter(r => r.rating === Number(ratingFilter));

  return (
    <div className="faq-page container page-transition-wrapper">
      <Breadcrumb paths={[{ name: 'Testimonials', page: 'testimonials' }]} />

      <div className="faq-title-wrap">
        <h1 style={{ fontSize: 'var(--fs-5xl)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Guest Chronicles</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Read through the stories, wedding reviews, and daily baking logs written by our visitors.</p>
      </div>

      <div className="gallery-filters" style={{ marginBottom: 'var(--space-xl)' }}>
        {['All', '5', '4'].map(r => (
          <button
            key={r}
            className={`gallery-filter-btn ${ratingFilter === r ? 'active' : ''}`}
            onClick={() => setRatingFilter(r)}
          >
            {r === 'All' ? 'All Reviews' : `${r} Star Reviews`}
          </button>
        ))}
      </div>

      <div className="details-reviews-list">
        {filtered.map((item, idx) => (
          <div key={idx} className="details-review-card" style={{ padding: 'var(--space-md)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div className="details-review-header">
              <span className="details-review-author">{item.name}</span>
              <span className="details-review-date">{item.date}</span>
            </div>
            <div style={{ display: 'flex', color: 'var(--color-terracotta)', gap: 2, marginBottom: 8 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill={i < item.rating ? 'currentColor' : 'none'} />
              ))}
            </div>
            <p className="details-review-comment" style={{ fontSize: 'var(--fs-md)' }}>"{item.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};
