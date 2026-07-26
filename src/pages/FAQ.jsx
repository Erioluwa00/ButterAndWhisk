import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ChevronDown } from 'lucide-react';
import '../styles/pages/misc.css';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'Do you offer gluten-free baking recipes?',
      a: 'We bake primarily with traditional grains containing gluten. However, because our wild sourdough starter (Arthur) undergoes a 36-hour long fermentation, a significant portion of the gluten proteins are pre-digested by wild bacteria, making it much easier to digest for those with mild gluten sensitivities. We do not recommend our pastries for individuals with Celiac disease.'
    },
    {
      q: 'How far in advance should I book a wedding cake?',
      a: ' Becaue our creative designer hand-sculpts individual sugar gum roses and applies 24k gold leaf details, we limit custom wedding bookings to two per week. We recommend booking your consultation 3 to 6 months before your reception.'
    },
    {
      q: 'What is the best way to store fresh sourdough bread?',
      a: 'Never store your sourdough boule inside a plastic bag or refrigerator; this traps moisture and turns the caramelized blistered crust chewy and tough. Instead, keep the loaf cut-side down on a wooden breadboard or inside a paper bag at room temperature. It remains fresh for up to 5 days.'
    },
    {
      q: 'Do you ship pastries across the country?',
      a: 'To guarantee that croissants remain shatteringly crisp and cakes retain their buttercream structures, we limit delivery to standard local courier zones within a 25-mile radius of our London baking room.'
    }
  ];

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="faq-page container page-transition-wrapper">
      <Breadcrumb paths={[{ name: 'FAQ', page: 'faq' }]} />

      <div className="faq-title-wrap">
        <h1 style={{ fontSize: 'var(--fs-5xl)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Frequently Inquired</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Everything you need to know about our slow-baking methods, storage suggestions, and consultations.</p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
              <button 
                className="faq-header" 
                onClick={() => toggleFAQ(idx)}
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} className="faq-icon-arrow" />
              </button>
              {isOpen && (
                <div className="faq-content">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
