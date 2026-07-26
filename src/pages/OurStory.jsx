import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import '../styles/pages/misc.css';

export const OurStory = () => {
  const milestones = [
    {
      year: '1976',
      title: 'The birth of Arthur',
      desc: 'Silas Thorne’s grandfather captures a wild yeast strain in a small mountain cabin, feeding it unbleached rye flour. This strain becomes our heritage starter, Arthur.'
    },
    {
      year: '1998',
      title: 'The first stone deck oven',
      desc: 'The Thorne family imports a massive basalt-deck baking oven from the volcanic regions of central Italy, laying the foundation for our signature blistering crusts.'
    },
    {
      year: '2012',
      title: 'Lamination breakthrough',
      desc: 'Chef Louis Laurent joins the kitchen, introducing classical French folding standards. He designs our double-lamination process which achieves 81 distinct layers.'
    },
    {
      year: '2020',
      title: 'Bespoke Sugar Sculptures',
      desc: 'Amara Vance joins the team, establishing our custom wedding cake rooms. We launch hand-painted edible gold leaf details, turning cakes into edible sculptures.'
    },
    {
      year: '2026',
      title: 'Butter & Whisk is born',
      desc: 'We unify our baking philosophies under a single luxury brand, offering storytelling culinary vaults and fresh morning bakes to our modern visitors.'
    }
  ];

  return (
    <div className="about-page container page-transition-wrapper">
      <Breadcrumb paths={[{ name: 'Our Story', page: 'our-story' }]} />

      <div className="about-hero">
        <h1 className="about-hero-title">The Legacy Timeline</h1>
        <p style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-secondary)', marginTop: 'var(--space-sm)' }}>
          A historical journey of wild yeast cultures, copper whisks, and three generations of dedicated baking artisans.
        </p>
      </div>

      <div className="timeline-section">
        <div className="timeline-container">
          {milestones.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
